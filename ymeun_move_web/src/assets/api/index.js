import Vue from "vue";
import axios from 'axios'

import {
    Toast
} from 'vant';
Vue.use(Toast);

// const mockUrl = 'http://222.182.202.11:5712'     //测试
const mockUrl = 'http://120.79.85.76:8890'          //线上
// const mockUrl = ''
let url = mockUrl

//判断当前路径
if(window.location.hostname == "m.ymeun.com"){
    url = 'http://120.79.85.76:8890'
}else{
    url = 'http://222.182.202.11:5712'
}

const service = axios.create({
  baseURL: url,  // 开发环境跨域配置的地址
  timeout: 30000, // 请求超时时间
  withCredentials: false, //表示跨域请求时是否需要使用凭证，默认为false
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 请求头统一配置
    
      if (localStorage.getItem('webToken')) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('webToken')
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.headers['Accept'] = 'application/json'
      }

    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {

      // try {
          if(error.response){
              switch (error.response.status) {
                  case 404:
                      Toast({
                          message: '网络请求不存在',
                          duration: 1500,
                          forbidClick: true
                      });
                      break;
                  case 401:
                      Toast({
                          message: '登录失效,请重新登录',
                          duration: 1500,
                          forbidClick: true,
                          onClose:function () {
                              localStorage.removeItem("webToken");
                              window.location.href = 'login.html'
                          }
                      });
                      break;
                  case 419:
                      Toast({
                          message: '登录失效,请重新登录',
                          duration: 1500,
                          forbidClick: true,
                          onClose:function () {
                              localStorage.removeItem("webToken");
                              window.location.href = 'login.html'
                          }
                      });
                      break;
                  default:
                      return Promise.reject(error);
                      break;
              }
          }else{
              // Toast({
              //               //     message: '系统错误',
              //               //     duration: 1500,
              //               //     forbidClick: true,
              //               //     onClose:function () {
              //               //         localStorage.removeItem("webToken");
              //               //         window.location.href = 'login.html'
              //               //     }
              //               // });

              console.log(error)

          }
      // }catch (e) {
      //     localStorage.removeItem("webToken");
      //     window.location.href = 'login.html'
      // }

      return Promise.reject(error)
  }
)

export default service
