import fetch from '@/shop/assets/api'

/**
 * demo  分诊列表
 * @param params
 */
export function appointmentList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentList`,
        params,
    })
}
