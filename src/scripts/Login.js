import { sleep } from '../utils/misc'

export default {
  name: 'home',
  data() {
    return {
      loggingIn: false,
      showCard: false,
    }
  },
  methods: {
    login: async function() {
      this.loggingIn = !this.loggingIn
      await sleep(1500)
      this.showCard = false
      await sleep(200)
      this.$router.push('lab-select') 
    }
  },
  async mounted() {
    await sleep(200)
    this.showCard = true
  }
}