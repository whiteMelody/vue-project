import fetch from '@/assets/api'
/**
 * demo  获取门店-某种角色下的员工
 * @param params
 */
export function customerList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/list`,
        params,
    })
}

/**
 * 跨店客户
 * @param params
 */
export function getListByKeyword(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getListByKeyword`,
        params,
    })
}

/**
 * 获取客户资料
 * @param params
 */
export function getEditCustomer(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/getEditCustomer`,
        params,
    })
}

/**
 * 修改客户资料
 * @param params
 */
export function postEditCustomer(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/postEditCustomer`,
        params,
    })
}

