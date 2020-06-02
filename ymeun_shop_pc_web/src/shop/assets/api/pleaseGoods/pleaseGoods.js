import fetch from '@/shop/assets/api'

/**
 * 请货添加
 * @param params
 */
export function shortageAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/shortage/shortageAdd`,
        params,
    })
}

/**
 * 请货详情
 * @param params
 */
export function getShortageDetails(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/shortage/getShortageDetails`,
        params,
    })
}

/**
 * 请货列表
 * @param params
 */
export function getShortageList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/shortage/getShortageList`,
        params,
    })
}

/**
 * 请货发货
 * @param params
 */
export function setShortageDelivery(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/shortage/setShortageDelivery`,
        params,
    })
}

