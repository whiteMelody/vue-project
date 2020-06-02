import fetch from '@/chain/assets/api'
/**
 * demo  顾客基本信息
 * @param params
 */
export function information(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/information`,
        params,
    })
}
/**
 * demo  顾客充值信息
 * @param params
 */
export function informationPrepaid(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/informationPrepaid`,
        params,
    })
}
/**
 * demo  顾客到诊信息
 * @param params
 */
export function informationAppointment(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/informationAppointment`,
        params,
    })
}
/**
 * demo  顾客消费信息
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
 * demo  员工数据列表
 * @param params
 */
export function informationOrderList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/informationOrderList`,
        params,
    })
}

/**
 * demo  员工数据列表
 * @param params
 */
export function informationConsultationList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/informationConsultationList`,
        params,
    })
}


/**
 * demo  客户到诊信息列表
 * @param params
 */
export function getArrivalVisit(params) {
    return fetch({
        method: 'post',
        url: `/postcustomers/customer/getArrivalVisit`,
        params,
    })
}

/**
 * demo  划扣明细
 * @param params
 */
export function informationConsumeDetailedList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/informationConsumeDetailedList`,
        params,
    })
}

/**
 * demo  划扣信息
 * @param params
 */
export function informationConsumeList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/informationConsumeList`,
        params,
    })
}


/**
 * demo  划扣明细-标题
 * @param params
 */
export function informationConsume(params) {
    return fetch({
        method: 'post',
        url: `/post/api/customers/informationConsume`,
        params,
    })
}