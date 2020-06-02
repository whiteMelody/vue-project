import fetch from '@/assets/api'

/**
 * 顾客列表
 * @param params
 */
export function customerList(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/list`,
        params,
    })
}

/**
 * 填写主动回访
 * @param params
 */
export function dailyReview(params) {
    return fetch({
        method: 'post',
        url: `/task/dailyReview`,
        params,
    })
}



