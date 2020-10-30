import request from '@/utils/request'

export function getRankingList(query = 1) {
    return request({
        url: `/coin/rank/${query}/json`,
        method: 'get'
    })
}

export function getSelfRankingInfo() {
    return request({
        url: '/lg/coin/userinfo/json',
        method: 'get'
    })
}

export function getSelfPointsInfo(query = 1) {
    return request({
        url: `/lg/coin/list/${query}/json`,
        method: 'get'
    })
}