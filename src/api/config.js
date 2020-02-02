import axios from 'axios'

export const BASE_URL = 'http://175.24.131.201:3400'

// 默认超时设置
axios.defaults.timeout = 10000

// http request 拦截器
axios.interceptors.response.use(
  response => {
    // 一些统一code的返回处理
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
