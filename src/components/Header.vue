<template>
  <div class="header" id="nav">
    <img class="logo" alt="App Logo" src="../assets/logo.png">
    <div v-if="authenticated" class="nav-links">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/attendance">Attendance</router-link> |
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    authenticated: {
      default: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    height: 45px;
  }
}
</style>
