import request from '@/utils/request'

export function fetchUnreadMsgCount() {
    return request({
        url: '/message/lg/count_unread/json',
        method: 'get'
    })
}

export function fetchReadMsgs(query = 1) {
    return request({
        url: `/message/lg/readed_list/${query}/json`,
        method: 'get'
    })
}

export function fetchUnreadMsgs(query = 1) {
    return request({
        url: `/message/lg/unread_list/${query}/json`,
        method: 'get'
    })
}