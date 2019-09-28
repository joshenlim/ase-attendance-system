export default {
  name: 'attendance-track',
  prop: {},
  components: {},
  data() {
    return {
      courseCodeSearch: "",
      selectedCourseGroup: "",
      studentList: [],
      attendanceStatus: ["Null", "Present", "Absent", "MC", "LOA"]
    }
  },
  methods: {

  },
  mounted() {
    this.$store.commit('updateAuthentication', true)
    this.$http.get(this.$apiUrl + '/groups?name=TS1')
      .then((result) => {
        this.studentList = result.data.students
      })
  }
}