export default {
  name: 'lab-group-selection',
  prop: {},
  components: {},
  data() {
    return {
      courseCodeSearch: "",
      courseFilterResults: [],
      selectedCourse: {},
      selectedCourseGroup: "",
      showSearch: true, 
      showGroupList: false,
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
    },
    selectGroup: function(group) {
      this.selectedCourseGroup = group
      this.showGroupList = false
    },
    launchAttendance: async function() {
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      this.launching = !this.launching
      await sleep(1500)
      this.$router.push(`attendance?code=${this.selectedCourse.code}&group=${this.selectedCourseGroup}`) 
    }
  }
}