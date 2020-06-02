import fetch from '@/shop/assets/api'

/**
 * demo  客户列表
 * @param params
 */
export function customerList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/getList`,
        params,
    })
}

/**
 * 获取门店下的某个角色list
 * @param params
 */
export function getStoreMembers(params) {
    return fetch({
        method: 'post',
        url: `/post/store/getStoreMembers`,
        params
    })
}

/**
 * 划扣列表
 * @param params
 */
export function getConsumeList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/getList`,
        params
    })
}


