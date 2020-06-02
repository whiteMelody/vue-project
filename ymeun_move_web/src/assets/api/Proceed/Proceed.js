import fetch from '@/assets/api'

/**
 * 收银列表
 * @param params
 */
export function receiptTodayList(params) {
    return fetch({
        method: 'post',
        url: `/process/orders/receiptTodayList`,
        params,
    })
}

/**
 * 收银收款
 * @param params
 */
export function addReceivables(params) {
    return fetch({
        method: 'post',
        url: `/process/receipt/addReceivables`,
        params,
    })
}




