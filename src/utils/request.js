import qs from 'qs'
import axios from 'axios'

import { Message } from 'element-ui'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    withCredentials: true, // send cookies when cross-domain requests
})

instance.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            config.data = qs.stringify(config.data);
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.errorCode !== 0) {
            Message({
                message: res.errorMsg || '接口异常，请稍后再试',
                type: 'error'
            })
            return Promise.reject(new Error(res.errorMsg || '接口异常，请稍后再试'))
        } else {
            return res;
        }
    },
    error => {
        Message({
            message: error.message,
            type: 'error',
        })
        return Promise.reject(error)
    }
)

export default instance