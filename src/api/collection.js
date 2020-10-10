import request from '@/utils/request'

export function collectArticle(id) {
    return request({
        url: `/lg/collect/${id}/json`,
        method: 'post'
    })
}

export function uncollectArticle(id) {
    return request({
        url: `/lg/uncollect_originId/${id}/json`,
        method: 'post'
    })
}

