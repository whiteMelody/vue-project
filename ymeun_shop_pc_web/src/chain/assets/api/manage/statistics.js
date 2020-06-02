import fetch from '@/chain/assets/api'

/**
 * 获取销售项目
 * @param params
 */
export function getSale(params) {
    return fetch({
        method: 'post',
        url: `/post/api/items/getSale`,
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
 * 员工销售业绩
 * @param params
 */
export function memberPerformance(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/memberPerformance`,
        params,
    })
}

/**
 * 美容师销售业绩
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
 * 划扣业绩
 * @param params
 */
export function getConsumeAchievement(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/technicianConsumeAchievement`,
        params,
    })
}


/**
 * 额外收入操作
 * @param params
 */
export function getCashierDetails(params) {
    return fetch({
        method: 'post',
        url: `/post/api/cashier/getCashierDetails`,
        params,
    })
}


/**
 * 门店数据
 * @param params
 */
export function storePerformance(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/achievement/storePerformance`,
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


/**
 * 开发人员(selete)
 * @param params
 */
export function getMembersList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/members/getMembersList`,
        params,
    })
}