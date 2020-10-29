import request from '@/utils/request'

export function getOfficialAccounts() {
    return request({
        url: '/wxarticle/chapters/json',
        method: 'get'
    })
}

export function getWechatArticles(query = 1, id) {
    return request({
        url: `/wxarticle/list/${id}/${query}/json`,
        method: 'get'
    })
}