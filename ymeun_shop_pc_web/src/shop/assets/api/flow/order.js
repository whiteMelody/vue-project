import fetch from '@/shop/assets/api'

/**
 * 开单展示数据
 * @param params
 */
export function getAddOrders(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/getAddOrders`,
        params,
    })
}

/**
 * 修改订单展示数据
 * @param params
 */
export function getOrdersEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/getOrdersEdit`,
        params,
    })
}

/**
 * 提交订单
 * @param params
 * @constructor
 */
export function PostAddOrders(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/PostAddOrders`,
        params,
    })
}

/**
 * 收银收款
 * @param params
 */
export function checkOrdersStatus(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/checkOrdersStatus`,
        params,
    })
}

/**
 * 查看订单
 * @param params
 */
export function printOrders(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/printOrders`,
        params,
    })
}

/**
 * 还款
 * @param params
 */
export function postArrearsRepayment(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/arrears/postArrearsRepayment`,
        params,
    })
}

/**
 * 修改订单
 * @param params
 */
export function postOrdersEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/postOrdersEdit`,
        params,
    })
}


/**
 * 付款方式列表
 * @param params
 */
export function ordersMethodList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/ordersMethod/ordersMethodList`,
        params,
    })
}


/**
 * 新增付款方式
 * @param params
 */
export function ordersMethodAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/process/ordersMethod/ordersMethodAdd`,
        params,
    })
}


/**
 * 删除付款方式
 * @param params
 */
export function ordersMethodClose(params) {
    return fetch({
        method: 'post',
        url: `/post/process/ordersMethod/ordersMethodClose`,
        params,
    })
}


