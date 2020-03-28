import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../components/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'home',
    component: layout,
    redirect: '/table',
    children: [{
      path: '/table',
      name: 'table',
      component: () => import(/* webpackChunkName: "login" */'../views/table.vue')
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
