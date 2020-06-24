import axios from 'axios'
import config from './config'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'
import qs from 'qs'

const service = axios.create(config)

// request拦截器
service.interceptors.request.use(config => {
  // 将token放入请求头信息
  if (getToken()) {
    config.headers['Authorization'] = getToken()
  }
  return config
}, error => {
  Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  // 获取返回信息
  const res = response.data
  return res
}, error => {
  console.log('err' + error)
  Message({
    message: error.message,
    type: 'error',
    duration: 3 * 1000
  })
  return Promise.reject(error)
})

export default service