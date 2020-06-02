import fetch from '@/assets/api'

/**
 * 分诊列表（预约列表）
 * @param params
 */
export function appointmentList(params) {
    return fetch({
        method: 'post',
        url: `/process/appointmentList`,
        params,
    })
}

/**
 * 确认到诊
 * @param params
 */
export function getTimeline(params) {
    return fetch({
        method: 'post',
        url: `/process/getTimeline`,
        params,
    })
}
