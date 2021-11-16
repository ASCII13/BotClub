import request from '@/utils/request'

export function fetchCategories() {
    return request({
        url: '/project/tree/json',
        method: 'get'
    })
}

export function fetchProjects(query = 1, params) {
    return request({
        url: `/project/list/${query}/json`,
        method: 'get',
        params
    })
}