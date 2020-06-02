import fetch from '@/chain/assets/api'
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
 * 跨店客户
 * @param params
 */
export function getListByKeyword(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/customer/getListByKeyword`,
        params,
    })
}

/**
 * 获取客户资料
 * @param params
 */
export function getEditCustomer(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/getEditCustomer`,
        params,
    })
}

/**
 * 修改客户资料
 * @param params
 */
export function postEditCustomer(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/postEditCustomer`,
        params,
    })
}

/**
 * 客户分析
 * @param params
 */
export function getConsumptionList(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/customer/getConsumptionList`,
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
 * 顾客基本信息
 * @param params
 */
export function informationOrder(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/informationOrder`,
        params,
    })
}

/**
 * 连锁沉淀客户分配
 * @param params
 */
export function reviewAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/api/review/reviewAdd`,
        params,
    })
}

/**
 * 连锁沉淀客户列表
 * @param params
 */
export function customerAnalysisList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/customerAnalysisList`,
        params,
    })
}

/**
 * 连锁沉淀客户报表
 * @param params
 */
export function settlingCustomerAnalysis(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/settlingCustomer/settlingCustomerAnalysis`,
        params,
    })
}


