import { sleep } from '../utils/misc'

export default {
  name: 'attendance-track',
  prop: {},
  components: {},
  data() {
    return {
      courseCodeSearch: "",
      courseFilterResults: [],
      selectedCourse: {},
      selectedCourseGroup: "",
      studentList: null,
      attendanceStatus: ["-", "Present", "Absent", "MC", "LOA"],
      showSearch: true,
      showGroupList: false,
      showSessionList: false,

      showModal: false,
      selectedSession: "",
      emailSubject: "",
      emailRecipients: [],
      emailMessage: "",
      sendStatus: null,

      editAttendance: false,
      activeEdit: {},
      notification: {
        status: '',
        message: ''
      },
      showNotif: false,

      activeThumbnailPopup: ""
    }
  },
  methods: {
    getThumbnail: function(matric) {
      try {
        return require(`../assets/students/${matric}.jpg`)
      } catch {
        return require(`../assets/empty.png`)
      }
    },
    showThumbnailPopup: function(matric) {
      this.activeThumbnailPopup = matric
    },
    closeThumbnailPopup: function() {
      this.activeThumbnailPopup = ""
    },
    toggleSearch: function() {
      this.showSearch = true
      this.searchCourseCode()
    },
    toggleGroupList: function() {
      this.showGroupList = !this.showGroupList
    },
    searchCourseCode: function() {
      this.$http.get(this.$apiUrl + '/courses?search=' + this.courseCodeSearch)
        .then((result) => {
          this.courseFilterResults = result.data
        })
    },
    selectCourse: function(course) {
      this.selectedCourse = { ...course }
      this.courseCodeSearch = course.code
      this.showSearch = false
      
      if (course.groups.length > 0) {
        this.selectedCourseGroup = course.groups[0]
        this.selectedSession = course.sessions[0] + " Absentees"
        this.updateLabGroupTrack()
      } else {
        this.selectedCourseGroup = "No Lab Groups found"
      }
    },
    selectGroup: function(group) {
      this.selectedCourseGroup = group
      this.showGroupList = false
      this.updateLabGroupTrack()
    },
    updateLabGroupTrack: function() {
      this.$http.get(this.$apiUrl + `/groups?name=${this.selectedCourseGroup}`)
        .then((result) => {
          this.studentList = result.data.students
          const selectedSessionID = this.selectedSession.split(' ')[1]
          this.emailRecipients = this.studentList.filter(student => {
            if (student.attendance[`session_${selectedSessionID}`] == 2) return student
          })

          this.emailSubject = `Absent for ${this.selectedCourse.code} ${this.selectedCourseGroup} Lab Session ${selectedSessionID} on ${result.data.day} ${result.data.start_time} ${result.data.venue}`
          this.emailMessage = `It is noted that you were absent for the ${this.selectedCourse.code}, group ${this.selectedCourseGroup}, lab ${selectedSessionID} on ${result.data.day} ${result.data.start_time} at ${result.data.venue}` + 
            '\n\n' + `You are required to provide 1 of the following:`+
            '\n\n' + '- Medical Certificate (MC)' +
            '\n' + '- Supporting document such as leave approval or appointment letter' + 
            '\n' + '- Approval from lab supervisor via email (cc above)' +
            '\n\n\n' + 'Thank you.' +
            '\n\n' + 'This is a system generated email. Please do not reply. For any enquiries, please refer to lab executives.'
        })
    },
    toggleEmailPopup: function() {
      if (this.selectedCourseGroup) {
        this.showModal = !this.showModal
      }
    },
    toggleSessionList: function() {
      this.showSessionList = !this.showSessionList
    },
    selectSession: function(session) {
      this.selectedSession = session + " Absentees"
      this.showSessionList = false

      const selectedSessionID = this.selectedSession.split(' ')[1]
      this.emailRecipients = this.studentList.filter(student => {
        if (student.attendance[`session_${selectedSessionID}`] == 2) return student
      })
    },
    sendEmailNotif: function() {
      if (this.emailRecipients.length > 0) {
        this.sendStatus = 'sending';

        this.$http.post(this.$apiUrl + '/pushNotif/emailAlert', {
          recipients: this.emailRecipients.map(student => student.email),
          subject: this.emailSubject,
          messageHTML: this.emailMessage
            .replace(/(?:\r\n|\r|\n)/g, '<br>')
            .split('<br>').map(para => {
              if (para.length > 0 ) return '<p>' + para + '</p>'
              else return '<br>'
            })
            .join('')
        })
          .then(async(res) => {
            if (res.data.message == "success") {
              this.sendStatus = 'success'
              await sleep(1000)
              this.sendStatus = null
              this.toggleEmailPopup()
            } else {
              console.log(res)
            }
          })
      }
    },
    toggleEditAttendance: function() {
      if (this.selectedCourseGroup) {
        this.editAttendance = !this.editAttendance
      }
    },
    selectStudentAtt: function(student, session) {
      if (this.activeEdit.student == student.matric && this.activeEdit.session == session) {
        this.activeEdit = {}
      } else {
        this.activeEdit = {
          student: student.matric,
          session: session
        }
      }
    },
    updateStudentAtt: function(student, session, status) {
      const sessionId = parseInt(session.split('_')[1])
      this.$http.post(this.$apiUrl + '/students/updateAttendance', {
        matric: student.matric,
        group: this.selectedCourseGroup,
        session: sessionId,
        status: this.attendanceStatus.indexOf(status)
      })
        .then((res) => {
          if (res.data.message === "statusNoChange") {
            this.activeEdit = {}
            this.showNotif = true;
            this.notification = {
              status: 'warning',
              message: `No change to ${student.name}'s attendance for ${this.selectedCourseGroup} lab ${sessionId}`
            }
            this.closeNotification();
          } else {
            this.updateLabGroupTrack()
            this.activeEdit = {}
            this.showNotif = true;
            this.notification = {
              status: 'success',
              message: `Successfully updated ${student.name}'s attendance for ${this.selectedCourseGroup} lab ${sessionId}`
            }
            this.closeNotification();
          }
        })
    },
    closeNotification: function() {
      setTimeout(() => {
        if (this.showNotif) {
          this.showNotif = false
        }
      }, 3000)
    }
  },
  mounted() {
    this.$store.commit('updateAuthentication', true)
  }
}