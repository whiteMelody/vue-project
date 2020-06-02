
import fetch from '@/assets/api'

/**
 * 咨询列表
 * @param params
 */
export function getHistoryZixunList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consultation/getHistoryZixunList`,
        params,
    })
}

/**
 * 补录咨询列表
 * @param params
 */
export function getZixunSupplementList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consultation/getZixunSupplementList`,
        params,
    })
}

