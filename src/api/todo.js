import request from '@/utils/request'

export function add(data) {
    return request({
        url: '/lg/todo/add/json',
        method: 'post',
        data
    })
}

export function update(id, data) {
    return request({
        url: `/lg/todo/update/${id}/json`,
        method: 'post',
        data
    })
}

export function remove(id) {
    return request({
        url: `/lg/todo/delete/${id}/json`,
        method: 'post'
    })
}

export function modifyStatus(id, data) {
    return request({
        url: `/lg/todo/done/${id}/json`,
        method: 'post',
        data
    })
}

export function getList(query = 1, data) {
    return request({
        url: `/lg/todo/v2/list/${query}/json`,
        method: 'post',
        data
    })
}