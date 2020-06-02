import fetch from '@/shop/assets/api'

/**
 * 项目列表
 * @param params
 */
export function itemsList(params) {
    return fetch({
        method: 'post',
        url: `post/store/items/itemsList`,
        params,
    })
}


/**
 * 项目新增/修改
 * @param params
 */
export function itemsAdd(params) {
    return fetch({
        method: 'post',
        url: `post/store/items/add`,
        params,
    })
}


/**
 * 项目启用/禁用
 * @param params
 */
export function itemsChangeStatus(params) {
    return fetch({
        method: 'post',
        url: `post/store/items/itemsChangeStatus`,
        params,
    })
}

/**
 * 项目启用/禁用
 * @param params
 */
export function getListItems(params) {
    return fetch({
        method: 'post',
        url: `post/store/items/getListItems`,
        params,
    })
}

/**
 * 设置不计入业绩（金额）
 * @param params
 */
export function saveValume(params) {
    return fetch({
        method: 'post',
        url: `post/store/items/saveValume`,
        params,
    })
}


/**
 * 设置不计入业绩（单条）
 * @param params
 */
export function changeItemsValume(params) {
    return fetch({
        method: 'post',
        url: `post/store/items/changeItemsValume`,
        params,
    })
}


/**
 * 项目标签
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `post/store/itemsClassify/getList`,
        params,
    })
}
