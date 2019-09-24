export default {
  name: 'lab-group-selection',
  prop: {},
  components: {},
  data() {
    return {
      courseCodeSearch: "",
      courseFilterResults: [],
      selectedCourse: {},
      selectedCourseIndex: "",
      showSearch: true, 
      showIndexList: false,
      launching: false
    }
  },
  methods: {
    toggleSearch: function() {
      this.showSearch = true
      this.searchCourseCode()
    },
    toggleIndexList: function() {
      this.showIndexList = true
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
      this.selectedCourseIndex = course.index[0]
      this.showSearch = false
    },
    selectIndex: function(index) {
      this.selectedCourseIndex = index
      this.showIndexList = false
    },
    launchAttendance: async function() {
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      this.launching = !this.launching
      await sleep(1500)
      console.log('yo')
      // this.$router.push('lab-select') 
    }
  }
}