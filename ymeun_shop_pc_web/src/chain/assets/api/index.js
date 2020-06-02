import axios from 'axios'
import { Message } from 'element-ui'
const mockUrl = ''
const url = mockUrl
const service = axios.create({
  baseURL: url,  // 开发环境跨域配置的地址
  timeout: 30000, // 请求超时时间
  withCredentials: true, //表示跨域请求时是否需要使用凭证，默认为false
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    // let message = error.response.data.msg
    let message = error.response.data.msg || error.response.data.error
    let msg = message.indexOf(':') > 0 ? message.split(':')[1] : message
    Message({
      message: `后端报错!!!:${msg}`,
      showClose: true,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

// request拦截器
service.interceptors.request.use(
  config => {
    // 请求头统一配置
      if (localStorage.getItem('getToken')) {
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          config.headers['Accept'] = 'application/json'
          config.headers['Authorization'] = 'Bearer ' + localStorage.getItem("getToken");

        //开发
        // let params = {
        //     t: new Date().getTime()
        // };

        // if(config.params){
        //     params = config.params
        //     params.t = new Date().getTime()
        // }

        // config.params = params;
      }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

export default service
