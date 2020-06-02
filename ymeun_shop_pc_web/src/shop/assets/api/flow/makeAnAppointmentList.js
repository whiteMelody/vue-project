import fetch from '@/shop/assets/api'

/**
 * demo  预约列表----分诊列表
 * @param params
 */
export function appointmentList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentList`,
        params,
    })
}

/**
 * demo  取消预约
 * @param params
 */
export function appointmentCancel(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentCancel`,
        params,
    })
}


/**
 * demo  获取预约信息
 * @param params
 */
export function appointmentGetInformation(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentGetInformation`,
        params,
    })
}

/**
 * demo  获取美容师占用时间条
 * @param params
 */
export function appointmentOccupy(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentOccupy`,
        params,
    })
}

/**
 * demo  修改预约
 * @param params
 */
export function appointmentPostEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentPostEdit`,
        params,
    })
}


/**
 * demo  客户列表
 * @param params
 */
export function customerList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/list`,
        params,
    })
}

/**
 * demo  新增预约
 * @param params
 */
export function appointmentPostAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentPostAdd`,
        params,
    })
}

/**
 * demo  跨店搜索/客户搜索
 * @param params
 */
export function getListByKeyword(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getListByKeyword`,
        params,
    })
}

/**
 * demo  客户信息
 * @param params
 */
export function getInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/info`,
        params,
    })
}

/**
 * demo  改排预约
 * @param params
 */
export function rearrangement(params) {
    return fetch({
        method: 'post',
        url: `/post/process/rearrangement`,
        params,
    })
}

/**
 * demo  分诊详情确认到店
 * @param params
 */
export function triage(params) {
    return fetch({
        method: 'post',
        url: `/post/process/triage`,
        params,
    })
}

/**
 * demo  现场分诊
 * @param params
 */
export function triageScene(params) {
    return fetch({
        method: 'post',
        url: `/post/process/triageScene`,
        params,
    })
}


/**
 * demo  奖品列表
 * @param params
 */
export function getListByCustomer(params) {
    return fetch({
        method: 'post',
        url: `/post/promotion/partake/getListByCustomerId`,
        params,
    })
}


