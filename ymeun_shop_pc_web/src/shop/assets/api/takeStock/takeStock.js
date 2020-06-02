import fetch from '@/shop/assets/api'

/**
 * 盘点列表
 * @param params
 */
export function getInventoryList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/inventory/getInventoryList`,
        params,
    })
}

/**
 * 开启盘点-添加
 * @param params
 */
export function inventoryAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/inventory/inventoryAdd`,
        params,
    })
}

/**
 * 开启盘点-列表
 * @param params
 */
export function getInventoryDetails(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/inventory/getInventoryDetails`,
        params,
    })
}

/**
 * 开启盘点-检测是否完成
 * @param params
 */
export function checkIsCompleteInventory(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/inventory/checkIsCompleteInventory`,
        params,
    })
}

/**
 * 关闭盘点
 * @param params
 */
export function inventoryClose(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/inventory/inventoryClose`,
        params,
    })
}

/**
 * 开启盘点
 * @param params
 */
export function inventoryOpen(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/inventory/inventoryOpen`,
        params,
    })
}


