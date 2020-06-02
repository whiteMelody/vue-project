import fetch from '@/assets/api'
/**
 * demo  获取门店-某种角色下的员工
 * @param params
 */
export function customerList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/list`,
        params,
    })
}


/**
 * 添加主动回访
 * @param params
 */
export function ReturnVisitData(params) {
    return fetch({
        method: 'post',
        url: `/post/task/reviewDaily`,
        params,
    })
}



/**
 * 删除顾客
 * @param params
 */
export function DeteleCustomer(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/remove`,
        params,
    })
}

/**
 * 跨店顾客
 * @param params
 */
export function getListByKeyword(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getListByKeyword`,
        params,
    })
}

/**
 * 分诊列表
 * @param params
 */
export function appointmentList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentList`,
        params,
    })
}

/**
 * 余额充值
 * @param params
 */
export function prepaidPostAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/prepaid/prepaidPostAdd`,
        params,
    })
}

/**
 * 充值退款
 * @param params
 */
export function prepaidExtraction(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/prepaid/prepaidExtraction`,
        params,
    })
}

/**
 * 顾客个人欠款列表
 * @param params
 */
export function getArrearsList(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/arrears/getArrearsList`,
        params,
    })
}

/**
 * 顾客信息-基本资料
 * @param params
 */
export function getUserInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/info`,
        params,
    })
}


/**
 * 顾客信息-咨询
 * @param params
 */
export function getConsultationList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getConsultationList`,
        params,
    })
}

/**
 * 顾客信息-咨询
 * @param params
 */
export function getArrivalVisit(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getArrivalVisit`,
        params,
    })
}

/**
 * 顾客信息-消费
 * @param params
 */
export function getConsumptionList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getConsumptionList`,
        params,
    })
}

/**
 * 顾客信息-消耗明细
 * @param params
 */
export function getDepleteDetailed(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getDepleteDetailed`,
        params,
    })
}

/**
 * 顾客信息-消耗信息
 * @param params
 */
export function getDepleteList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getDepleteList`,
        params,
    })
}

/**
 * 顾客信息-回访
 * @param params
 */
export function getReviewList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getReviewList`,
        params,
    })
}

/**
 * 新增顾客
 * @param params
 */
export function addUser(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/add`,
        params,
    })
}

/**
 * 修改顾客
 * @param params
 */
export function changeUser(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/change`,
        params,
    })
}



/**
 * 顾客分析
 * @param params
 */
export function customerAnalysisList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customerAnalysisList`,
        params,
    })
}

/**
 * 用户余额
 * @param params
 */
export function prepaidByCustomer(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/prepaid/prepaidByCustomer`,
        params,
    })
}

