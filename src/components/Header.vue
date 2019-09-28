<template>
  <div class="header" id="nav">
    <img class="logo" alt="App Logo" src="../assets/logo.png">
    <div v-if="authenticated" class="nav-links">
      <router-link v-if="attendanceTaking" class="icon-link" to="/login">
        <img src="../assets/face-icon.svg" />
      </router-link>
      <router-link class="icon-link" to="/attendance-track">
        <img src="../assets/table-icon.svg" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  computed: mapState(['authenticated', 'attendanceTaking'])
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
  .nav-links {
    display: flex;
    align-items: center;
    .icon-link {
      margin-left: 20px;
      opacity: 0.3;
      cursor: pointer;
      transition: opacity 0.2s ease;
      img {
        width: 30px;
      }
      &:hover {
        opacity: 1.0;
      }
    }
  }
}
</style>
