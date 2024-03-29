import { sleep } from '../utils/misc'

export default {
  name: 'lab-group-selection',
  prop: {},
  components: {},
  data() {
    return {
      showCard: false,
      courseCodeSearch: "",
      courseFilterResults: [],
      selectedCourse: {},
      selectedCourseGroup: "",
      selectedCourseSession: "",
      showSearch: true, 
      showGroupList: false,
      showSessionList: false,
      launching: false
    }
  },
  methods: {
    toggleSearch: function() {
      this.showSearch = true
      this.searchCourseCode()
    },
    toggleGroupList: function() {
      this.showGroupList = !this.showGroupList
    },
    toggleSessionList: function() {
      this.showSessionList = !this.showSessionList
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
      } else {
        this.selectedCourseGroup = "No Lab Groups found"
      }

      if (course.sessions.length > 0) {
        this.selectedCourseSession = course.sessions[0]
      } else {
        this.selectedCourseSession = "No Lab Sessions found"
      }
    },
    selectGroup: function(group) {
      this.selectedCourseGroup = group
      this.showGroupList = false
    },
    selectSession: function(session) {
      this.selectedCourseSession = session
      this.showSessionList = false
    },
    launchAttendance: async function() {
      this.launching = !this.launching
      await sleep(1500)
      this.showCard = false
      await sleep(500)
      this.$store.commit('updateAttendance', true)
      this.$router.push(`attendance?code=${this.selectedCourse.code}&group=${this.selectedCourseGroup}&session=${this.selectedCourseSession}`) 
    },
    logout: async function() {
      this.$store.commit('updateAuthentication', false)
      this.showCard = false
      await sleep(200)
      this.$router.push('/') 
    }
  },
  async mounted() {
    this.$store.commit('updateAuthentication', true)
    await sleep(200)
    this.showCard = true
  }
}