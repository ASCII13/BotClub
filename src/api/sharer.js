import request from '@/utils/request'

export function getData(userId, query = 1) {
    return request({
        url: `/user/${userId}/share_articles/${query}/json`,
        method: 'get'
    })
}

