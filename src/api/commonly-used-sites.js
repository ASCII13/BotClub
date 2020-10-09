import request from '@/utils/request'

export function getCommonlyUsedSites() {
    return request({
        url: '/friend/json',
        method: 'get',
    })
}