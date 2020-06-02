import fetch from '@/assets/api'

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
 * 项目消耗
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
 *
 * @param params
 */
export function getConsumeAchievement(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/members/getConsumeAchievement`,
        params,
    })
}





