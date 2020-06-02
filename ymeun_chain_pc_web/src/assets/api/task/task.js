import fetch from '@/assets/api'

/**
 * 任务列表
 * @param params
 */
export function taskListChain(params) {
    return fetch({
        method: 'post',
        url: `/post/api/task/taskListChain`,
        params,
    })
}

/**
 * 任务列表-通知
 * @param params
 */
export function finishTask(params) {
    return fetch({
        method: 'post',
        url: `/post/api/task/finishTask`,
        params,
    })
}