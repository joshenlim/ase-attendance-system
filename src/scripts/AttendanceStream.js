import backgroundUrl from '../assets/empty.png'

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
      detectionCount: 0,
      avatarUrl: backgroundUrl,
      showNotif: false,
      notification: {
        status: "",
        message: ""
      },
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
    },
    updateStudentList: function() {
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
    },
    closeNotification: function() {
      setTimeout(() => {
        if (this.showNotif) {
          this.showNotif = false
          this.detected = ""
          this.avatarUrl = require('../assets/empty.png')
        }
      }, 3000)
    }
  },
  mounted() {
    this.updateStudentList()
    this.initCamera(400, 500)
    .then(() => {
      console.log('Camera was initialized');
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

          if (this.detected.matric == studentMatric && this.detectionCount == 1) {
            this.avatarUrl = require(`../assets/students/${studentMatric}.jpg`)
            this.$http.post(this.$apiUrl + '/students/updateAttendance', {
              matric: studentMatric,
              group: this.group,
              session: this.session,
              status: 1
            })
              .then((res) => {
                if (res.data.message === "statusNoChange") {
                  if (!this.showNotif) {
                    this.detectionCount = 1
                    this.showNotif = true;
                    this.notification = {
                      status: "warning",
                      message: "Student Already Registered!"
                    }
                    this.closeNotification()
                  }
                } else {
                  this.updateStudentList()
                  this.detectionCount = 1
                  this.showNotif = true;
                  this.notification = {
                    status: "success",
                    message: "Successfully Registered!"
                  }
                  this.closeNotification()
                }
              })
          } else {
            this.avatarUrl = require(`../assets/students/${studentMatric}.jpg`)
            this.$http.get(this.$apiUrl + `/students?matric=${studentMatric}&group=${this.group}`)
            .then((result) => {
              this.detected = result.data
              this.detectionCount = 1
            })
          }
        } else {
          this.detected = data.payload.identity
          this.avatarUrl = require('../assets/empty.png')

          this.showNotif = true;
          this.notification = {
            status: "warning",
            message: "Unknown Student"
          }
          this.closeNotification()
        }
      }
    });
  }
}