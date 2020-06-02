import fetch from '@/assets/api'

/**
 * 首页 获取分析数据
 * @param params
 */
export function getManagement(params) {
    return fetch({
        method: 'post',
        url: `/analysis/getManagement`,
        params,
    })
}

/**
 * 首页 任务统计
 * @param params
 */
export function taskStatistics(params) {
    return fetch({
        method: 'post',
        url: `/task/taskStatistics`,
        params,
    })
}

/**
 * 首页 生日提醒
 * @param params
 */
export function getBirthdayReminders(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/getBirthdayReminders`,
        params,
    })
}

export function logout(params) {
    return fetch({
        method: 'post',
        url: `/logout`,
        params,
    })
}

