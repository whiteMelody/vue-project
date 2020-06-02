
import fetch from '@/assets/api'

/**
 * 充值列表
 * @param params
 */
export function prepaidList(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/prepaid/prepaidList`,
        params,
    })
}

/**
 * 欠款列表
 * @param params
 */
export function getArrearsList(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/arrears/getArrearsList`,
        params,
    })
}

