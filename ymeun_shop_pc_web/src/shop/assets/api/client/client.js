import fetch from '@/shop/assets/api'
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
 * 删除客户
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
 * 跨店客户
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
 * 客户个人欠款列表
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
 * 客户信息-基本资料
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
 * 客户信息-咨询
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
 * 客户信息-咨询
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
 * 客户信息-消费
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
 * 客户信息-划扣明细
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
 * 客户信息-划扣信息
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
 * 客户信息-回访
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
 * 新增客户
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
 * 修改客户
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
 * 客户分析
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


/**
 * 顾客等级设置
 * @param params
 */
export function saveSetting(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/setting/save`,
        params,
    })
}


/**
 * 顾客等级列表
 * @param params
 */
export function settingList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/setting/getList`,
        params,
    })
}


/**
 *  介绍人列表
 * @param params
 */
export function introducerSee(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/introducerSee`,
        params,
    })
}


/**
 *  充值收支明细
 * @param params
 */
export function prepaidListByCustomer(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/prepaid/prepaidListByCustomer`,
        params,
    })
}

