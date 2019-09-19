<template>
  <div class="card">
    <p class="header">Lab Attendance Registration</p>
    <div class="field-input">
      <p>USERNAME</p>
      <input type="text" />
    </div>
    <div class="field-input">
      <p>PASSWORD</p>
      <input type="password" />
    </div>
    <div class="button button-primary" v-on:click="login" v-bind:class="{ showSpinner: loggingIn }">
      <span v-if="!loggingIn">Login</span>
      <span v-else class="loader"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginCard',
  props: {},
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
      await sleep(1000)
      this.$router.push('lab-select') 
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/card';
@import '@/styles/fields';
@import '@/styles/button';

.card {
  text-align: left;
  width: 350px;
  margin: 0 auto;
  border-radius: 0px;
  box-shadow: 0px 2px 20px rgba(0,0,0,0.15);
}

.button {
  margin: 0 auto;
  margin-top: 25px;
  width: 100px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  padding: 9px;
  border: 1px solid transparent;
}

.loader {
  border: 3px solid #F3F3F3;
  border-top: 3px solid #2B70F6;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.showSpinner {
  width: 25px;
  height: 25px;
  background-color: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.2);
}
</style>
