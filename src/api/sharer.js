import request from '@/utils/request'

export function fetchData(userId, query = 1) {
    return request({
        url: `/user/${userId}/share_articles/${query}/json`,
        method: 'get'
    })
}

export function fetchSelfShareData(query = 1) {
    return request({
        url: `/user/lg/private_articles/${query}/json`,
        method: 'get'
    })
}

export function delSelfShareData(id) {
    return request({
        url: `/lg/user_article/delete/${id}/json`,
        method: 'post'
    })
}
