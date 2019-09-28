import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import VueElectron from 'vue-electron';

Vue.use(Vuex);
Vue.use(VueElectron);
Vue.prototype.$http = axios;
Vue.prototype.$apiUrl = 'http://localhost:3000/api'
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    authenticated: false,
    attendanceTaking: false,
  },
  getters: {
    authenticated: state => state.authenticated,
    attendanceTaking: state => state.attendanceTaking,
  },
  mutations: {
    updateAuthentication(state, value) {
      state.authenticated = value
    },
    updateAttendance(state, value) {
      state.attendanceTaking = value
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
