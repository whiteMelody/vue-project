import fetch from '@/assets/api'

/**
 * 任务列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/task/task/getList`,
        params,
    })
}

/**
 * 完成任务
 * @param params
 */
export function confirm(params) {
    return fetch({
        method: 'post',
        url: `/post/task/task/confirm`,
        params,
    })
}
