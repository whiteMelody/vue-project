import fetch from '@/chain/assets/api'

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
 * 供应商详情
 * @param params
 */
export function businessGetInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/business/businessGetInfo`,
        params,
    })
}


