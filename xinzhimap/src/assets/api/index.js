import axios from 'axios'
import { Message } from 'element-ui'

//线上地址
const mockUrl = 'http://a.xinzhi.space'
// const mockUrl = ''
const url = mockUrl


const service = axios.create({
  baseURL: url,  // 开发环境跨域配置的地址
  timeout: 30000, // 请求超时时间
  withCredentials: true, //表示跨域请求时是否需要使用凭证，默认为false
})

// request拦截器
service.interceptors.request.use(
  config => {
      if (localStorage.getItem('webToken')) {

            // console.log(localStorage.getItem('webToken'), 'localStorage.getItem(\'webToken\')')
            // console.log(window.localStorage.getItem('webToken'), 'window.localStorage.getItem(\'webToken\')')

            config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('webToken')
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
            config.headers['Accept'] = 'application/json'

            //开发
            // let params = {
            //     t: new Date().getTime()
            // };
            
            // if(config.params){
            //     params = config.params
            //     params.t = new Date().getTime();
            // }
            // config.params = params;
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
    // let message = error.response.data.msg

      console.log(error)

      return

      if(error.response){
          switch (error.response.status) {
              case 404:
                  Message({
                      message: `网络请求不存在`,
                      showClose: true,
                      type: 'error',
                      duration: 1500
                  })
                  break;
              default:
                  return Promise.reject(error);
                  break;
          }
      }else{
          localStorage.removeItem("webToken");
          window.location.href = "/#/Login";
      }

    return Promise.reject(error)
  }
)

export default service
