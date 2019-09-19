export default {
  name: 'home',
  prop: {},
  components: {},
  data() {
    return {
      loggingIn: false
    }
  },
  methods: {
    login: async function() {
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      this.loggingIn = !this.loggingIn
      await sleep(1500)
      this.$router.push('lab-select') 
    }
  }
}