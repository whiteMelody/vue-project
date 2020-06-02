
import fetch from '@/shop/assets/api'

/**
 * 划扣列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/getList`,
        params,
    })
}

/**
 * 划扣详情
 * @param params
 */
export function getAvailableItemList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/getAvailableItemList`,
        params,
    })
}

/**
 * 划扣-详细列表
 * @param params
 */
export function getDetailed(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/getDetailed`,
        params,
    })
}

/**
 * 划扣退回
 * @param params
 */
export function giveBack(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/giveBack`,
        params,
    })
}



