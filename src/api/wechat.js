import request from '@/utils/request'

export function fetchOfficialAccounts() {
    return request({
        url: '/wxarticle/chapters/json',
        method: 'get'
    })
}

export function fetchWechatArticles(query = 1, id) {
    return request({
        url: `/wxarticle/list/${id}/${query}/json`,
        method: 'get'
    })
}