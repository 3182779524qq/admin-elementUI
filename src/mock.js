const Mock = require('mockjs')
let loginData = function () {
  let data = {
    'code': 20000,
    'data': {
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjE1LCJleHAiOjE1ODUzMDM0MDUyNjd9.ANB_5GTIeU9aVBbNl5Ewl-ch6Baj5cI_vEIslyVDFmU",
      userInfo: {
        name: "王大锤",
        phone: 17700000000
      }
    },
    'msg': 'success'
  }
  return data
}
let tableData = function () {
  let data = {
    'code': 20000,
    'data': {
      total:2,
      list:[
        {
          id: 1,
          name: '张三',
          age: 18,
          phone: 17779030000,
          sex: 1,
          address: '东门小区101号',
          remarks:'这是一个男的'
        },{
          id: 2,
          name: '李思',
          age: 18,
          phone: 17779035200,
          sex: 2,
          address: '东门小区102号',
          remarks:'这是一个女的'
        },{
          id: 3,
          name: '某某',
          age: 18,
          phone: 17779038452,
          sex: 3,
          address: '东门小区103号',
          remarks:'这可能是一个人妖'
        }
      ]
    },
    'msg': 'success'
  }
  return data
}
Mock.mock('/api/table', 'post', tableData)
Mock.mock('/api/login', 'post', loginData)