import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/lab-select',
      name: 'lab-select',
      component: () => import(/* webpackChunkName: "about" */ './views/LabGroupSelection.vue')
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: () => import(/* webpackChunkName: "play" */ './views/AttendanceStream.vue')
    }
  ]
})
