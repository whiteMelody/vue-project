import fetch from '@/shop/assets/api'

/**
 * 出库列表
 * @param params
 */
export function outboundList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/outbound/outboundList`,
        params,
    })
}

/**
 * 新增出库
 * @param params
 */
export function outboundAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/outbound/outboundAdd`,
        params,
    })
}

/**
 * 出库审核
 * @param params
 */
export function outboundExamine(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/outbound/outboundExamine`,
        params,
    })
}

/**
 * 出库详情
 * @param params
 */
export function outboundGetInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/outbound/outboundGetInfo`,
        params,
    })
}

