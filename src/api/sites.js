import request from '@/utils/request'

export function getSiteList() {
    request({
        url: '/navi/json',
        method: 'get'
    })
}