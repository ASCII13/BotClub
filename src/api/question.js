import request from '@/utils/request'

export function fetchQuestions(query = 1) {
    return request({
        url: `/wenda/list/${query}/json `,
        method: 'get'
    })
}