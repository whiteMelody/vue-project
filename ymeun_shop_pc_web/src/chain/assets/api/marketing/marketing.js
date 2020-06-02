import fetch from '@/chain/assets/api'
/**
 * 营销中心列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/getList`,
        params,
    })
}

/**
 * 营销中心取消预约
 * @param params
 */
export function appointmentCancel(params) {
    return fetch({
        method: 'post',
        url: `/post/api/appointment/appointmentCancel`,
        params,
    })
}

/**
 * 营销中心新增预约
 * @param params
 */
export function appointmentPostAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/api/appointment/appointmentPostAdd`,
        params,
    })
}

/**
 * 营销中心新增顾客
 * @param params
 */
export function addUser(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/customer/add`,
        params,
    })
}