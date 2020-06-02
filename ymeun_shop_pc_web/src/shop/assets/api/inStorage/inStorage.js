import fetch from '@/shop/assets/api'

/**
 * 入库列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/warehouse/getList`,
        params,
    })
}

/**
 * 入库收货
 * @param params
 */
export function delivery(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/warehouse/delivery`,
        params,
    })
}


/**
 * 入库/编辑入库
 * @param params
 */
export function save(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/warehouse/save`,
        params,
    })
}

/**
 * 入库详情
 * @param params
 */
export function getInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/warehouse/getInfo`,
        params,
    })
}

/**
 * 调拨退货入库
 * @param params
 */
export function allocationTaskChange(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/allocation/allocationTaskChange`,
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


