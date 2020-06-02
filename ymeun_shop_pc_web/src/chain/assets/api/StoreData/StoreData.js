import fetch from '@/chain/assets/api'

/**
 * 门店业绩排名
 * @param params
 */
export function getOrderRankingListByStore(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getOrderRankingListByStore`,
        params,
    })
}

/**
 * 门诊业绩排名
 * @param params
 */
export function getAppointmentRankingListByStore(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getAppointmentRankingListByStore`,
        params,
    })
}

/**
 * 消费业绩排名
 * @param params
 */
export function getConsumeRankingListByStore(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getConsumeRankingListByStore`,
        params,
    })
}

/**
 * 门店总数据
 * @param params
 */
export function enterpriseOverview(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/enterpriseOverview`,
        params,
    })
}

/**
 * 门店总数据
 * @param params
 */
export function managementData(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/managementData`,
        params,
    })
}


/**
 * 门店销售业绩
 * @param params
 */
export function getOrdersData(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/store/getOrders`,
        params,
    })
}


/**
 * 门店划扣业绩
 * @param params
 */
export function getConsumeData(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/store/getConsume`,
        params,
    })
}


/**
 * 开关门店
 * @param params
 */
export function storeOpenOrClose(params) {
    return fetch({
        method: 'post',
        url: `/post/store/storeOpenOrClose`,
        params,
    })
}