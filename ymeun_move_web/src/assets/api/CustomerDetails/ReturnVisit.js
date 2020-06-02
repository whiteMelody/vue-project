import fetch from '@/assets/api'

/**
 * 顾客信息详情
 * @param params
 */
export function postReturnVisit(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/getReviewList`,
        params,
    })
}
