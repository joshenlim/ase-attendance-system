import backgroundUrl from '../assets/avatar.jpg'

export default {
  name: 'attendance-stream',
  components: { },
  data() {
    return {
      code: this.$route.query.code,
      group: this.$route.query.group,
      session: this.$route.query.session.slice(-1),
      venue: "",
      course: "",
      day: "",
      startTime: "",
      endTime: "",
      studentList: [],

      detectionReady: false,
      detected: "",
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
    },
    selectLabGroup: function() {
      this.$store.commit('updateAttendance', false)
      this.$router.push('/lab-select')
    }
  },
  mounted() {
    this.$http.get(this.$apiUrl + '/groups?name=' + this.group)
      .then((result) => {
        this.course = result.data.name
        this.venue = result.data.venue
        this.day = result.data.day
        this.startTime = result.data.start_time
        this.endTime = result.data.end_time
        this.studentList = result.data.students.map(student => {
          return {
            ...student,
            attendance: student.attendance[`session_${this.session}`]
          }
        })
      })


    this.initCamera(400, 500)
    .then(video => {
      console.log('Camera was initialized', video);
    });

    this.$electron.ipcRenderer.on('message-from-worker', (event, data) => {
      if(typeof data.command === 'undefined') {
        console.error('IPC message is missing command string');
        return;
      }
      if (data.command === 'status') {
        if (data.payload.status === 'ready') this.detectionReady = true
      }
      if (data.command === 'face-detect') {
        if (!this.detectionReady) this.detectionReady = true
        if (data.payload.identity !== 'unknown') {
          const studentMatric = data.payload.identity
          this.$http.get(this.$apiUrl + `/students?matric=${studentMatric}&group=${this.group}`)
            .then((result) => {
              this.detected = result.data
            })
          this.avatarUrl = require(`../assets/students/${studentMatric}.jpg`)
        } else {
          this.detected = data.payload.identity
          this.avatarUrl = require('../assets/avatar.jpg')
        }
      }
    });

    // Write a fuction, if this.detected is not null, wait for 5 seconds before defaulting to
    // empty state again

  }
}