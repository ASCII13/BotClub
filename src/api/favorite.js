import request from '@/utils/request'

export function fetchFavorites(query = 0) {
    return request({
        url: `/lg/collect/list/${query}/json`,
        method: 'get'
    })
}

export function unstar(id, originId) {
    let data = {
        originId: originId || -1
    }
    return request({
        url: `/lg/uncollect/${id}/json`,
        method: 'post',
        data
    })
}