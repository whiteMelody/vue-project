import fetch from '@/shop/assets/api'

/**
 * 搜索商品
 * @param params
 */
export function getListBySearch(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/good/getListBySearch`,
        params,
    })
}

/**
 * 商品编辑
 * @param params
 */
export function save(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/good/save`,
        params,
    })
}

/**
 * 商品详情
 * @param params
 */
export function getInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/good/getInfo`,
        params,
    })
}

/**
 * 商品列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/good/getList`,
        params,
    })
}

/**
 * 商品规格列表
 * @param params
 */
export function getSpecifications(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/good/getSpecifications`,
        params,
    })
}

/**
 * 商品单位列表
 * @param params
 */
export function getUnit(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/good/getUnit`,
        params,
    })
}

/**
 * 商品类别列表
 * @param params
 */
export function getCatalogue(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/good/getCatalogue`,
        params,
    })
}

/**
 * 供应商列表
 * @param params
 */
export function businessList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/business/businessList`,
        params,
    })
}

/**
 * 新增供应商
 * @param params
 */
export function businessAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/business/businessAdd`,
        params,
    })
}

/**
 * 修改供应商
 * @param params
 */
export function businessEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/business/businessEdit`,
        params,
    })
}

/**
 * 获取供应商
 * @param params
 */
export function businessGetInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/business/businessGetInfo`,
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
 * 调拨出库
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


