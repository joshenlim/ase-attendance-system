import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import VueElectron from 'vue-electron';

Vue.use(VueElectron);
Vue.prototype.$http = axios;
Vue.prototype.$apiUrl = 'http://localhost:3000/api'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
