import fetch from '@/chain/assets/api'

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

/**
 * demo  任务中心数据
 * @param params
 */
export function getMissionCenter(params) {
    return fetch({
        method: 'post',
        url: `/post/task/taskCore`,
        params,
    })
}

/**
 * demo  员工详情
 * @param params
 */
export function getEmployeeEetails(params) {
    return fetch({
        method: 'post',
        url: `/post/task/getMembersDetails`,
        params,
    })
}


/**
 * 完成任务
 * @param params
 */
export function taskFinishNoDeal(params) {
    return fetch({
        method: 'post',
        url: `/post/api/task/taskFinishNoDeal`,
        params,
    })
}

/**
 * demo  门店列表
 * @param params
 */
export function getStore(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getStore`,
        params,
    })
}

/**
 * demo  开发者列表
 * @param params
 */
export function membersListByChain(params) {
    return fetch({
        method: 'post',
        url: `/post/api/members/membersListByChain`,
        params,
    })
}

/**
 * demo  门店数据-任务管理
 * @param params
 */
export function taskMembersList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/task/taskMembersList`,
        params,
    })
}
