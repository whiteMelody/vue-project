import fetch from '@/assets/api'

/**
 * 获取门店渠道
 * @param params
 */
export function getStoreChannel(params) {
    return fetch({
        method: 'post',
        url: `/post/store/channel/getList`,
        params,
    })
}


/**
 * 获取门店的项目
 * @param params
 */
export function getStoreItem(params) {
    return fetch({
        method: 'post',
        url: `/post/store/getStoreItem/getItem`,
        params,
    })
}


/**
 * 获取登录的用户
 * @param params
 */
export function getUserInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/api/getUserInfo`,
        params,
    })
}

/**
 * 修改密码
 * @param params
 */
export function editPassword(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/editPassword`,
        params,
    })
}

/**
 * 登出
 * @param params
 */
export function logout(params) {
    return fetch({
        method: 'post',
        url: `/post/logout`,
        params,
    })
}


/**
 * 根据id获取地区
 * @param params
 */
export function getRegionsList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/regions/getList`,
        params,
    })
}

/**
 * 预约列表
 * @param params
 */
export function appointmentList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentList`,
        params,
    })
}

//经营报表权限
export function getProgramList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/getProgramList`,
        params,
    })
}

//获取员工
export function getStoreMembers(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getStoreMembers`,
        params,
    })
}

/**
 * 检测版本号
 */
export function checkVersion(params) {
    return fetch({
        method: 'post',
        url: `/post/checkVersion`,
        params,
    })
}

/**
 * 合作企业报表
 * @param params
 */
export function businessOrdersList(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/businessOrdersList`,
        params,
    })
}

/**
 * 合作企业订单列表
 * @param params
 */
export function ordersList(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/ordersList`,
        params,
    })
}

/**
 * 合作企业订单列表
 * @param params
 */
export function businessList(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/businessList`,
        params,
    })
}

/**
 * 预约排期表
 * @param params
 */
export function appointmentScheduling(params) {
    return fetch({
        method: 'post',
        url: `/post/api/appointment/appointmentScheduling`,
        params,
    })
}

/**
 * 预约排期表-预约列表
 * @param params
 */
export function getAppointmentList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/appointment/appointmentList`,
        params,
    })
}


/**
 * 开发人员
 * @param params
 */
export function membersListByChain(params) {
    return fetch({
        method: 'post',
        url: `/post/api/members/membersListByChain`,
        params,
    })
}

