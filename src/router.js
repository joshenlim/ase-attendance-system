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
      component: () => import(/* webpackChunkName: "lab-select" */ './views/LabGroupSelection.vue')
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: () => import(/* webpackChunkName: "attendance" */ './views/AttendanceStream.vue')
    },
    {
      path: '/attendance-track',
      name: 'attendance-track',
      component: () => import(/* webpackChunkName: "attendance-track" */ './views/AttendanceTrack.vue')
    }
  ]
})
