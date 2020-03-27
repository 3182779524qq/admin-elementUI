import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios/index.js'//  请求响应拦截
import urls from './axios/url.js'//  请求url地址

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$url = urls
require('./mock.js')

// 路由拦截，
// router.beforeEach((to, from, next) => {
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
