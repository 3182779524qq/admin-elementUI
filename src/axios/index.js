import axios from 'axios';
import router from '@/router/index';
import  { Message } from "element-ui"
let service = axios.create({
  timeout: 30000
});

service.interceptors.request.use(
  config => {
    let accessToken = sessionStorage.getItem('accessToken')
    if (accessToken) {
      config.headers['ERP-Token'] = accessToken
    } else {
      if (router.history.current.name!='login') {
        router.push({
          path: '/'
        });
        return Promise.reject();
      }
    }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

service.interceptors.response.use(
  response => {
    if (response.data.code == '20000') {
      return response.data;
    } else{
      let errHtml = document.getElementsByClassName('el-message')
      if(response.data.code == '30000') {
        if (errHtml&&errHtml.length==0) {
          let isToken = sessionStorage.getItem('accessToken')
          if (isToken) {
            sessionStorage.removeItem('accessToken')
          }
          Message.error('暂未登录，请先登录')
          router.push({
            path: '/'
          });
        }
        return response.data;
      } else if (response.data.code == '40000') {
        if (errHtml&&errHtml.length==0) {
          Message.error('暂无权限，请联系管理员')
        }
      } else {
        if (response.data.msg&&errHtml&&errHtml.length==0) {
          Message.error(response.data.msg)
        }
        return response.data;
      }
    }
  },
  error => {
    console.log(error.data);
    Message.error('网络繁忙，请稍后重试')
    return Promise.reject();
  }
);

export default service;