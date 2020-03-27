const Mock = require('mockjs')
let loginData = function () {
  let item = {
    'code': 200,
    'data': {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjE1LCJleHAiOjE1ODUzMDM0MDUyNjd9.ANB_5GTIeU9aVBbNl5Ewl-ch6Baj5cI_vEIslyVDFmU",
      userInfo: {
        name: "王大锤",
        phone: 17700000000
      }
    },
    'msg': 'success'
  }
  return item
}
Mock.mock('/api/login', 'post', loginData)