import fetch from '@/assets/api'

/**
 * 任务列表
 * @param params
 */
export function getTaskList(params) {
    return fetch({
        method: 'post',
        url: `/task/getTaskList`,
        params,
    })
}

/**
 * 回访列表
 * @param params
 */
export function getReviewList(params) {
    return fetch({
        method: 'post',
        url: `/task/getReviewList`,
        params,
    })
}

/**
 * 完成回访
 * @param params
 */
export function postEditReview(params) {
    return fetch({
        method: 'post',
        url: `/task/postEditReview`,
        params,
    })
}

/**
 * 历史回访
 * @param params
 */
export function customerReviewHistory(params) {
    return fetch({
        method: 'post',
        url: `/task/customerReviewHistory`,
        params,
    })
}

/**
 * 获取顾客充值金额
 * @param params
 * @constructor
 */
export function GetCustomerRechargeByCustomerId(params) {
    return fetch({
        method: 'post',
        url: `/process/orders/GetCustomerRechargeByCustomerId`,
        params,
    })
}

/**
 * 设置任务状态为已完成
 * @param params
 */
export function expireAppointment(params) {
    return fetch({
        method: 'post',
        url: `/task/expireAppointment`,
        params,
    })
}


