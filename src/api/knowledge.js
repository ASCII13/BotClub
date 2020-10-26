import request from '@/utils/request'

export function getKnowledgeData() {
    return request({
        url: '/tree/json',
        method: 'get'
    })
}

export function getKnowledgeArticles(query = 0, params) {
    return request({
        url: `/article/list/${query}/json`,
        method: 'get',
        params
    })
}