import request from '@/utils/request'

export function getCategories() {
    return request({
        url: '/project/tree/json',
        method: 'get'
    })
}

export function getProjects(query = 1, params) {
    return request({
        url: `/project/list/${query}/json`,
        method: 'get',
        params
    })
}