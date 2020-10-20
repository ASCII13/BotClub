import request from '@/utils/request'

export function getSquareData(query = 0) {
    return request({
        url: `/user_article/list/${query}/json`,
        method: 'get'
    })
}