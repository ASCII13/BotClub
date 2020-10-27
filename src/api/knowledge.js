import request from '@/utils/request'

export function getKnowledgeSystemData() {
    return request({
        url: '/tree/json',
        method: 'get'
    })
}

export function getArticles(query = 0, params) {
    return request({
        url: `/article/list/${query}/json`,
        method: 'get',
        params
    })
}