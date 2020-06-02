import fetch from '@/assets/api'

/**
 * 顾客信息详情
 * @param params
 */
export function postXPrivate(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/CustomerSeeXFiles`,
        params,
    })
}
