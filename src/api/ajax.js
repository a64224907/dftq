import axios from 'axios'
import {message} from 'antd'
const BASE_URL = ''
export default function ajax ( url,data,type='GET') {
  return new Promise((resolve,reject) => {
    let Promise
    if(type === 'GET') {
      Promise =  axios.get( BASE_URL+url,{ params:data})
    } else {
      Promise =  axios.post(BASE_URL+url,data)
    }Promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      message.error('错误：',err.message)
    })
  })
}