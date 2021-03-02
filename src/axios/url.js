//    此文件为所有的接口URL地址
// export let baseUrl = 'http://xx.xxx.xx.x' //正式环境
// export let baseUrl = 'http://xx.xxx.xx.x' //测试环境
export let baseUrl = process.env.VUE_APP_BASE_URL //自动获取请求地址
// let publicUrl = baseUrl + '/api'
let publicUrl = '/api' //mock
let urls = {
  //    登录模块
  login: publicUrl + '/login', // 登录

  table: publicUrl + '/table', // 表格

}
export default urls
