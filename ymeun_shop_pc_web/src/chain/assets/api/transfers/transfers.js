import fetch from '@/chain/assets/api'

/**
 * 调拨添加
 * @param params
 */
export function allocationAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/allocation/allocationAdd`,
        params,
    })
}

/**
 * 调拨详情
 * @param params
 */
export function getAllocationDetails(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/allocation/getAllocationDetails`,
        params,
    })
}

/**
 * 调拨列表
 * @param params
 */
export function getAllocationList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/allocation/getAllocationList`,
        params,
    })
}

/**
 * 企业下的所有门店
 * @param params
 */
export function getEnterpriseStore(params) {
    return fetch({
        method: 'post',
        url: `/post/store/store/getEnterpriseStore`,
        params,
    })
}

