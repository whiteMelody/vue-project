import fetch from '@/assets/api'

/**
 * 顾客信息详情
 * @param params
 */
export function postConsume(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/getDepleteList`,
        params,
    })
}
