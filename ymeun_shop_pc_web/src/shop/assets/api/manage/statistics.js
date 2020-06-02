import fetch from '@/shop/assets/api'

/**
 * 添加项目
 * @param params
 */
export function getSale(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/items/getSale`,
        params,
    })
}

/**
 * 项目划扣
 * @param params
 */
export function getConsume(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/items/getConsume`,
        params,
    })
}

/**
 * 渠道统计
 * @param params
 */
export function getStatistics(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/channel/getStatistics`,
        params,
    })
}

/**
 * 顾问销售业绩
 * @param params
 */
export function adviserPerformance(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/members/adviserPerformance`,
        params,
    })
}

/**
 * 美容师铺垫业绩
 * @param params
 */
export function technicianPerformance(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/members/technicianPerformance`,
        params,
    })
}

/**
 * 划扣业绩
 * @param params
 */
export function getConsumeAchievement(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/members/getConsumeAchievement`,
        params,
    })
}


/**
 * 门店数据
 * @param params
 */
export function getShopData(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/achievement/getStoreAchievementRate`,
        params,
    })
}


/**
 * 目标环比
 * @param params
 */
export function getTargetComparison(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/achievement/getStoreTarget`,
        params,
    })
}


/** 
 * 顾问
 * @param params
 */
export function getAdviserPayment(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/achievement/getAdviserPayment`,
        params,
    })
}


/**
 * 美容师
 * @param params
 */
export function getTechnicianPayment(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/achievement/getTechnicianPayment`,
        params,
    })
}


/**
 * 额外收入操作
 * @param params
 */
export function getAdditionalIncome(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/achievement/addStoreAdditionalIncome`,
        params,
    })
}


/**
 * 治疗间报表
 * @param params
 */
export function therapeuticRoomDetailsAnalysis(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/roomDetails/therapeuticRoomDetailsAnalysis`,
        params,
    })
}

/**
 * 新客统计报表
 * @param params
 */
export function getConsumption(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/store/getConsumption`,
        params,
    })
}

/**
 * 介绍人报表
 * @param params
 */
export function introducerAnalysis(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/introducerAnalysis`,
        params,
    })
}



/**
 * 开发人员
 * @param params
 */
export function getDevelopment(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/development/developmentAchievement`,
        params,
    })
}

