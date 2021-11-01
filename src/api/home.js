import request from '@/utils/request'

export function getBanner() {
    return request({
        url: '/banner/json',
        method: 'get'
    })
}

export function fetchArticles(query = 0) {
    return request({
        url: `/article/list/${query}/json`,
        method: 'get'
    })
}

export function fetchTopArticles() {
    return request({
        url: '/article/top/json',
        method: 'get'
    })
}