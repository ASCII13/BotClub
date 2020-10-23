import request from '@/utils/request'

export function getSiteList() {
    return request({
        url: '/navi/json',
        method: 'get'
    })
}