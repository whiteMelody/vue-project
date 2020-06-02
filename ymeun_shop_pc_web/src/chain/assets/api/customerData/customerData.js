import fetch from '@/chain/assets/api'
/**
 * demo  员工列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/getList`,
        params,
    })
}

/**
 * demo 门店列表
 * @param params
 */
export function getStore(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getStore`,
        params,
    })
}

