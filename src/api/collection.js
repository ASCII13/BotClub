import request from '@/utils/request'

export function star(id) {
    return request({
        url: `/lg/collect/${id}/json`,
        method: 'post'
    })
}

export function unstar(id) {
    return request({
        url: `/lg/uncollect_originId/${id}/json`,
        method: 'post'
    })
}

