import request from '@/utils/request'

export function globalSearch(query = 0, key) {
    let data = {
        k: key
    }
    return request({
        url: `/article/query/${query}/json`,
        method: 'post',
        data
    })
}