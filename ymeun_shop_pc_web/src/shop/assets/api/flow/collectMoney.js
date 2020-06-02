import fetch from '@/shop/assets/api'

/**
 * 收银
 * @param params
 */
export function receiptTodayList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/receiptTodayList`,
        params,
    })
}
