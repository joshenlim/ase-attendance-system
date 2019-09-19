<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view/>
    </div>
    <p class="watermark">Powered by the FI-AR System</p>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    Header
  }
}
</script>

<style lang="scss">
@import '@/styles/_type';

body {
  margin: 0;
  height: 100vh;
  width: 100vw;
  background-image: url('assets/background.png');
  background-position: 0% 105%;
  background-size: contain;
  background-repeat: no-repeat;
  color: #333333;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 210px);
}

.watermark {
  font-size: 0.8em;
  font-weight: 300;
  color: rgba(0,0,0,0.8);
  position: absolute;
  width: 200px;
  bottom: 20px;
  left: calc(50% - 100px);
}

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
