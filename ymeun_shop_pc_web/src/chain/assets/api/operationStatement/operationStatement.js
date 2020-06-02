import fetch from '@/chain/assets/api'

/**
 * 不计入业绩转化表
 * @param params
 */
export function achievementConversion(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/customer/achievementConversion`,
        params,
    })
}

/**
 * 营销中心报表-员工
 * @param params
 */
export function getMember(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/market/getMember`,
        params,
    })
}

/**
 * 营销中心报表-客户
 * @param params
 */
export function getCustomer(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/market/getCustomer`,
        params,
    })
}

/**
 * 新客报表
 * @param params
 */
export function getConsumption(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/store/getConsumption`,
        params,
    })
}

