import fetch from '@/chain/assets/api'

/**
 * 采购订单编辑
 * @param params
 */
export function save(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/order/save`,
        params,
    })
}

/**
 * 采购订单生成（根据id）
 * @param params
 */
export function saveByPurchaseId(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/order/saveByPurchaseId`,
        params,
    })
}

/**
 * 采购订单审核
 * @param params
 */
export function examine(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/order/examine`,
        params,
    })
}

/**
 * 采购订单详情
 * @param params
 */
export function getInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/order/getInfo`,
        params,
    })
}

/**
 * 采购订单列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/order/getList`,
        params,
    })
}

/**
 * 采购订单入库列表
 * @param params
 */
export function getWarehouseList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/order/getWarehouseList`,
        params,
    })
}

/**
 * 采购计划列表
 * @param params
 */
export function purchaseList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/purchase/purchaseList`,
        params,
    })
}

/**
 * 采购计划新增
 * @param params
 */
export function purchaseAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/purchase/purchaseAdd`,
        params,
    })
}

/**
 * 采购计划详情
 * @param params
 */
export function purchaseGetInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/purchase/purchaseGetInfo`,
        params,
    })
}


