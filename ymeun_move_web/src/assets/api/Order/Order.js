import fetch from '@/assets/api'

/**
 * 开单
 * @param params
 */
export function addOrders(params) {
    return fetch({
        method: 'post',
        url: `/process/orders/addOrders`,
        params,
    })
}

/**
 * 开单展示数据
 * @param params
 */
export function getModifyOrders(params) {
    return fetch({
        method: 'post',
        url: `/process/orders/getModifyOrders`,
        params,
    })
}

/**
 * 修改订单
 * @param params
 */
export function postModifyOrders(params) {
    return fetch({
        method: 'post',
        url: `/process/orders/postModifyOrders`,
        params,
    })
}

