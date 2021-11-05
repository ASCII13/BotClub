import request from '@/utils/request'

export function fetchKnowledgeData() {
    return request({
        url: '/tree/json',
        method: 'get'
    })
}

export function fetchArticles(query = 0, params) {
    return request({
        url: `/article/list/${query}/json`,
        method: 'get',
        params
    })
}