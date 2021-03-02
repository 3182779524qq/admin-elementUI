import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import axios from './axios/index.js'//  请求响应拦截
import urls from './axios/url.js'//  请求url地址

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 总线程通讯
const bus = new Vue();
Vue.prototype.$bus = bus;

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
  render: h => h(App)
}).$mount('#app')
