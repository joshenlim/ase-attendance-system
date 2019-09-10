// import SimpleTimer from '@/components/SimpleTimer.vue';
// import Utils from '../lib/Utils';

export default {
  name: 'attendance-stream',
  components: { },
  data() {
    return {
      /*
        0: countdown
        1: running
        2: paused
        3: gameover
      */
      title: 'Lab Attendance Registration',
      gameState: 0,

      showFinished: false,
      showLaugh: false,

      currentRound: 0,
      maxStrikes: 3,
      finalTime: '00:00.00'
    }
  },
  methods: {
    initCamera: async function(width, height) {
      let cam = this.$refs.cam;
      cam.width = width;
      cam.height = height;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: width,
          height: height
        }
      });

      cam.srcObject = stream;

      return new Promise((resolve) => {
        cam.onloadedmetadata = () => {
          resolve(cam);
        };
      });
    },

    launchRecognizer: function() {
      // set game state
      this.gameState = 0; // countdown

      // reset layers
      this.showLaugh = false;
      this.showFinished = false;

      // reset round counter
      this.currentRound = 0;

      // reset stopwatch
      // this.$refs['stopwatch'].stop();
      // this.$refs['stopwatch'].currentTime = 0;
    },

    startRound: function() {

      this.currentRound++;
      console.log('Starting new round', this.currentRound);

      // running!
      this.gameState = 1;

      // reset game
      this.showLaugh = false;

      // start the funny video
      let startTime = Math.floor(Math.random() * 400);
      this.$refs['vid'].currentTime = startTime;
      this.$refs['vid'].play();

      // start the timer
      this.$refs['stopwatch'].start();
    },

    onLaugh: function() {

      if(this.gameState != 1) {
        return;
      }

      // pause game
      this.gameState = 2;

      // pause timer
      this.$refs['stopwatch'].stop();

      // stop video
      this.$refs['vid'].pause();

      // play explosion sound
      this.$sounds['explosion'].play();

      // show laugh
      this.showLaugh = true;

      // continue after 4 seconds
      setTimeout(() => {

        // check game status
        if(this.currentRound == this.maxStrikes) {

          // game over
          this.gameState = 3;
          this.finalTime = 0;
          this.showLaugh = false;
          this.showFinished = true;

        } else {

          // next round
          this.startRound();
        }

      }, 4000);
    },

    onAngry: function() {

      if(this.gameState != 3) {
        return;
      }

      // start new game
      this.launchRecognizer();
    },
  },

  mounted() {
    this.initCamera(400, 500)
    .then(video => {
      console.log('Camera was initialized', video);
      this.launchRecognizer();
    });

    // listen to messages
    this.$electron.ipcRenderer.on('message-from-worker', (event, data) => {
      console.log("Message from worker received:", data)

      if(typeof data.command === 'undefined') {
        console.error('IPC message is missing command string');
        return;
      }

      if(data.command == 'expression') {
        if(data.payload.type == 'happy') {
          this.onLaugh();
          return;
        }

        if(data.payload.type == 'angry') {
          this.onAngry();
          return;
        }
      }

    });

  }
}