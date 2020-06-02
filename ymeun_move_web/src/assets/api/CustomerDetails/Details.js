import fetch from '@/assets/api'

/**
 * 顾客信息详情
 * @param params
 */
export function postDetails(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/info`,
        params,
    })
}


/**
 * 获取开发人员和顾问
 * @param params
 */
export function postAdviser(params) {
    return fetch({
        method: 'post',
        url: `/store/getStoreMembers`,
        params,
    })
}
