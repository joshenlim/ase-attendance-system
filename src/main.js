import Vue from 'vue'
import App from './App.vue'
import router from './router'

import VueElectron from 'vue-electron';
Vue.use(VueElectron);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
