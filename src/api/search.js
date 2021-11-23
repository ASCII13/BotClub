import request from '@/utils/request'

export function search(key, query = 0) {
    let data = {
        k: key
    }
    return request({
        url: `/article/query/${query}/json`,
        method: 'post',
        data
    })
}

export function fetchHotWords() {
    return request({
        url: '/hotkey/json',
        method: 'get'
    })
}