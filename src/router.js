import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lab-select',
      name: 'lab-select',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/LabGroupSelection.vue')
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: () => import(/* webpackChunkName: "play" */ './views/AttendanceStream.vue')
    }
  ]
})
