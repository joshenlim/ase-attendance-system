export default {
  name: 'attendance-stream',
  components: { },
  data() {
    return {
      code: this.$route.query.code,
      group: this.$route.query.group
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
    }
  },
  mounted() {
    this.initCamera(400, 500)
    .then(video => {
      console.log('Camera was initialized', video);
    });

    this.$electron.ipcRenderer.on('message-from-worker', (event, data) => {
      console.log("Message from worker received:", data)

      if(typeof data.command === 'undefined') {
        console.error('IPC message is missing command string');
        return;
      }

      if (data.command === 'face-detect') {
        // faceapi.draw.drawDetections(overlay, data.payload.detection)
      }
    });

  }
}