import request from '@/utils/request'

export function getUnreadMsgCount() {
    return request({
        url: '/message/lg/count_unread/json',
        method: 'get'
    })
}

export function getReadMsgList(query = 1) {
    return request({
        url: `/message/lg/readed_list/${query}/json`,
        method: 'get'
    })
}

export function getUnreadMsgList(query = 1) {
    return request({
        url: `/message/lg/unread_list/${query}/json`,
        method: 'get'
    })
}