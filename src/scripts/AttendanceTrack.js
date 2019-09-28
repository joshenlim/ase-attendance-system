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
      attendanceStatus: ["Null", "Present", "Absent", "MC", "LOA"],
      showSearch: true,
      showGroupList: false,
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
          console.log(this.studentList)
        })
    }
  },
  mounted() {
    this.$store.commit('updateAuthentication', true)
  }
}