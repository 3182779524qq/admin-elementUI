// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

import Vue from 'vue'
// 通过Vue.observable创建一个可响应的对象
export const store = Vue.observable({
  collapsed:false, // 左侧菜单是否折叠
  topTabList:sessionStorage.getItem('topTabList')?JSON.parse(sessionStorage.getItem('topTabList')):[] // 头部tablist
})

// 定义 mutations, 修改属性
export const mutations = {
  setCollapsed() {
    store.collapsed = !store.collapsed
  },
  setTopTabList(list) {
    store.topTabList = list
    sessionStorage.setItem('topTabList',JSON.stringify(list))
  }
}