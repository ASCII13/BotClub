import request from '@/utils/request'

export function fetchSquareData(query = 0) {
    return request({
        url: `/user_article/list/${query}/json`,
        method: 'get'
    })
}