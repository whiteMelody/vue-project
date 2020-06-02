import fetch from '@/assets/api'

/**
 * 咨询详情列表
 * @param params
 */
export function getConsultationDetails(params) {
    return fetch({
        method: 'post',
        url: `/process/consultation/getConsultation`,
        params,
    })
}

/**
 * 获取地区
 * @param params
 */
export function getRegionData(params) {
    return fetch({
        method: 'post',
        url: `/store/regions/getLocation`,
        params,
    })
}


/**
 * 新增咨询
 * @param params
 */
export function getConsultationData(params) {
    return fetch({
        method: 'post',
        url: `/process/consultation/add`,
        params,
    })
}


/**
 * 完善资料
 * @param params
 */
export function getPerfect(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/change`,
        params,
    })
}
