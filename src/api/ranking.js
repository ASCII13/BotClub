import request from '@/utils/request'

export function fetchRankingList(query = 1) {
    return request({
        url: `/coin/rank/${query}/json`,
        method: 'get'
    })
}

export function fetchSelfInfo() {
    return request({
        url: '/lg/coin/userinfo/json',
        method: 'get'
    })
}

export function fetchSelfPointsInfo(query = 1) {
    return request({
        url: `/lg/coin/list/${query}/json`,
        method: 'get'
    })
}