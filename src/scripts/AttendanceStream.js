import backgroundUrl from '../assets/avatar.jpg'

export default {
  name: 'attendance-stream',
  components: { },
  data() {
    return {
      code: this.$route.query.code,
      group: this.$route.query.group,
      session: this.$route.query.session,
      venue: "",
      course: "",
      day: "",
      startTime: "",
      endTime: "",
      studentList: [],

      avatarUrl: backgroundUrl,
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
    // Retrieve Lab Group Details
    this.$http.get(this.$apiUrl + '/groups?name=' + this.group)
      .then((result) => {
        this.course = result.data.name
        this.venue = result.data.venue
        this.day = result.data.day
        this.startTime = result.data.start_time
        this.endTime = result.data.end_time
        this.studentList = result.data.students
      })


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