
import fetch from '@/shop/assets/api'

/**
 * 收银列表
 * @param params
 */
export function getReceiptHistoryList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/getReceiptHistoryList`,
        params,
    })
}

/**
 * 收银列表
 * @param params
 */
export function getReceiptDetailed(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/orders/getReceiptDetailed`,
        params,
    })
}