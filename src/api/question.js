import request from '@/utils/request'

export function getQuestions(query = 1) {
    return request({
        url: `/wenda/list/${query}/json `,
        method: 'get'
    })
}