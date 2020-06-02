import fetch from '@/shop/assets/api'
/**
 * demo  任务列表
 * @param params
 */
export function getTaskList(params) {
    return fetch({
        method: 'post',
        url: `/post/task/taskList`,
        params,
    })
}


/**
 * demo  回访列表
 * @param params
 */
export function getReturnVisit(params) {
    return fetch({
        method: 'post',
        url: `/post/task/reviewList`,
        params,
    })
}


/**
 * demo  客户信息
 * @param params
 */
export function getCustomerInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/info`,
        params,
    })
}


/**
 * demo  客户回访历史
 * @param params
 */
export function getCustomerHistory(params) {
    return fetch({
        method: 'post',
        url: `/post/task/reviewHistoryByCustomer`,
        params,
    })
}



/**
 * demo  填写回访内容
 * @param params
 */
export function getReturnVisitContent(params) {
    return fetch({
        method: 'post',
        url: `/post/task/reviewPostEdit`,
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
 * demo  右上角红点 历史和今日任务
 * @param params
 */
export function getTodayTask(params) {
    return fetch({
        method: 'post',
        url: `/post/task/todayAndDailyCount`,
        params,
    })
}



/**
 * demo  未成交上门原因
 * @param params
 */
export function getReasonsForNonTransaction(params) {
    return fetch({
        method: 'post',
        url: `/post/task/taskFinishNoDeal`,
        params,
    })
}



/**
 * demo  预约过期任务确认通知
 * @param params
 */
export function getmakeAnAppointment(params) {
    return fetch({
        method: 'post',
        url: `/post/task/taskExpireAppointment`,
        params,
    })
}



/**
 * demo  完善个人资料
 * @param params
 */
export function gePerfectInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/change`,
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
        url: `/post/task/taskFinishNoDeal`,
        params,
    })
}

