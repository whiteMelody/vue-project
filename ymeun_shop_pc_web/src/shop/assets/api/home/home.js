import fetch from '@/shop/assets/api'

/**
 * 首页目标查看
 * @param params
 */
export function getTargetList(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/members/target`,
        params,
    })
}


/**
 * 美容师今日任务列表
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
 * 美容师今日回访列表
 * @param params
 */
export function getReturnVisitList(params) {
    return fetch({
        method: 'post',
        url: `/post/task/reviewList`,
        params,
    })
}



/**
 * 消费金额
 * @param params
 */
export function getStoreConsumption(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/store/getStoreConsumption`,
        params,
    })
}

/**
 * 划扣金额
 * @param params
 */
export function getStoreDeduction(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/store/getStoreDeduction`,
        params,
    })
}



/**
 * 到店人头
 * @param params
 */
export function getStoreClient(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/store/getStoreClient`,
        params,
    })
}


/**
 * 美容师今日预约列表
 * @param params
 */
export function getAppointmentList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentList`,
        params,
    })
}

/**
 * 顾问业绩排名
 * @param params
 */
export function getUserPerformanceByAdviser(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/store/getUserPerformanceByAdviser`,
        params,
    })
}

/**
 * 美容师业绩排名
 * @param params
 */
export function getUserPerformanceByTechnician(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/store/getUserPerformanceByTechnician`,
        params,
    })
}

/**
 * 首页时间段
 * @param params
 */
export function getTime(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/getTime`,
        params,
    })
}

/**
 * 总消耗业绩明细
 * @param params
 */
export function consumeSurplus(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/customer/consumeSurplus`,
        params,
    })
}


/**
 * 总消耗业绩明细
 * @param params
 */
export function MonthlyDataDel(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/monthlyDetails/analysisMonthlyDetailsList`,
        params,
    })
}