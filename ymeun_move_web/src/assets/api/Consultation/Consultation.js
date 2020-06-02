import fetch from '@/assets/api'

/**
 * 咨询列表
 * @param params
 */
export function getTodayConsultationList(params) {
    return fetch({
        method: 'post',
        url: `/process/consultation/getTodayConsultationList`,
        params,
    })
}

/**
 * 确认接诊
 * @param params
 */
export function getTimeline(params) {
    return fetch({
        method: 'post',
        url: `/process/getTimeline`,
        params,
    })
}



