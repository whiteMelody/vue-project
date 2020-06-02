import fetch from '@/chain/assets/api'

/**
 * 请货制单
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


