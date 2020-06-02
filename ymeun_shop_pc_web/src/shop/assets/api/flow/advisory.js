import fetch from '@/shop/assets/api'

/**
 * 今日咨询列表
 * @param params
 */
export function getConsultationTodayList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consultation/getConsultationTodayList`,
        params,
    })
}

/**
 * 确认接诊
 * @param params
 */
export function timeLine(params) {
    return fetch({
        method: 'post',
        url: `/post/process/timeLine`,
        params,
    })
}

/**
 * 填写咨询 展示数据
 * @param params
 */
export function getConsultationExhibitionAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consultation/getConsultationExhibitionAdd`,
        params,
    })
}

export function getConsultationExhibitionEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consultation/getConsultationExhibitionEdit`,
        params,
    })
}

/**
 * 客户历史咨询
 * @param params
 */
export function getHistoryZixunByCustomerId(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consultation/getHistoryZixunByCustomerId`,
        params,
    })
}

/**
 * 添加/填写 咨询
 * @param params
 */
export function postConsultationAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consultation/postConsultationAdd`,
        params,
    })
}

/**
 * 修改咨询
 * @param params
 */
export function postConsultationEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consultation/postConsultationEdit`,
        params,
    })
}

