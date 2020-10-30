import request from '@/utils/request'

export function getFavoriteList(query = 0) {
    return request({
        url: `/lg/collect/list/${query}/json`,
        method: 'get'
    })
}

export function uncollect(id, originId) {
    let data = {
        originId: originId || -1
    }
    return request({
        url: `/lg/uncollect/${id}/json`,
        method: 'post',
        data
    })
}