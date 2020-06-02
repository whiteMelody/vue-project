import fetch from '@/shop/assets/api'
/**
 * demo  数据分析-总得分
 * @param params
 */
export function getAchievementsDashboard(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/members/getAchievementsDashboard`,
        params,
    })
}
/**
 * demo  数据分析-得分图表
 * @param params
 */
export function getAchievementsRank(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/members/getAchievementsRank`,
        params,
    })
}
/**
 * demo  数据分析详情
 * @param params
 */
export function getAchievementsDetailed(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/members/getAchievementsDetailed`,
        params,
    })
}

