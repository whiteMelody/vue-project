import fetch from '@/assets/api'
/**
 * demo  合作企业列表
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

/**
 * 合作企业报表
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

