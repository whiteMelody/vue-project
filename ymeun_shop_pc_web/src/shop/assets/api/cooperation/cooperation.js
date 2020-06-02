import fetch from '@/shop/assets/api'

/**
 * 合作企业列表
 * @param params
 */
export function businessList(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/businessList`,
        params,
    })
}

/**
 * 开单（合作企业）
 * @param params
 */
export function ordersAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/ordersAdd`,
        params,
    })
}

/**
 * 合作企业订单列表
 * @param params
 */
export function businessOrdersList(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/businessOrdersList`,
        params,
    })
}

/**
 * 合作企业订单列表
 * @param params
 */
export function ordersList(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/ordersList`,
        params,
    })
}

/**
 * 合作企业订单列表
 * @param params
 */
export function ordersTypeList(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/ordersTypeList`,
        params,
    })
}



/**
 * 合作企业订单列表
 * @param params
 */
export function ordersTypeAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/ordersTypeAdd`,
        params,
    })
}


/**
 * demo  合作企业列表
 * @param params
 
export function businessList(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/businessList`,
        params,
    })
}
*/
/**
 * demo  合作企业新增
 * @param params
 */
export function businessAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/businessAdd`,
        params,
    })
}


/**
 * demo  合作企业修改
 * @param params
 */
export function businessEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/businessEdit`,
        params,
    })
}