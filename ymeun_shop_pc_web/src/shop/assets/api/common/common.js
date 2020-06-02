import fetch from '@/shop/assets/api'
/**
 * demo  获取门店-某种角色下的员工
 * @param params
 */
export function getStoreMembers(params) {
    return fetch({
        method: 'post',
        url: `/post/store/getStoreMembers`,
        params,
    })
}

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
 * 获取治疗间
 * @param params
 */
export function getTreatmentRoomList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/getTherapeuticRoomAllList`,
        params,
    })
}

/**
 * 治疗间 停用
 * @param params
 */
export function therapeuticRoomDel(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomDel`,
        params,
    })
}

/**
 * 治疗间 启用
 * @param params
 */
export function therapeuticRoomEnable(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomEnable`,
        params,
    })
}

/**
 * 添加治疗间
 * @param params
 */
export function therapeuticRoomAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomAdd`,
        params,
    })
}

/**
 * 修改治疗间
 * @param params
 */
export function therapeuticRoomEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomEdit`,
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
 * 获取项目列表
 * @param params
 */
export function getProject(params) {
    return fetch({
        method: 'post',
        url: `/post/store/items/getList`,
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
export function membersPostEditPassWord(params) {
    return fetch({
        method: 'post',
        url: `/post/members/membersPostEditPassWord`,
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
 * 预约排期表
 * @param params
 */
export function appointmentScheduling(params) {
    return fetch({
        method: 'post',
        url: `/post/process/appointmentScheduling`,
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

/**
 * 收银-消费单
 * @param params
 */
export function PrintConsumption(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/printOrders`,
        params,
    })
}

/**
 * 退单管理-退款单
 * @param params
 */
export function ReturnOfReceipt(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/refund/getRefundPrint`,
        params,
    })
}

/**
 * 划扣-消费明细单
 * @param params
 */
export function ScratchOrder(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/getPrintInfo`,
        params,
    })
}

/**
 * 还款单
 * @param params
 */
export function PaymentSlip(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/arrears/getArrearsPrintRepayment`,
        params,
    })
}

/**
 * 充值单
 * @param params
 */
export function RechargeSlip(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/prepaid/prepaidPrinting`,
        params,
    })
}

/**
 * 合作企业
 * @param params
 */
export function CooperationSlip(params) {
    return fetch({
        method: 'post',
        url: `/post/partner/ordersInfo`,
        params,
    })
}

export function getProgramList(params) {
    return fetch({
        method: 'post',
        url: `/post/getProgramList`,
        params,
    })
}

/**
 * 停止使用治疗间And开始使用治疗间
 * @param params
 */
export function OpenCloseTreatment(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomCheckStatus`,
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
 * 要货门店
 */
export function getEnterpriseStore(params) {
    return fetch({
        method: 'post',
        url: `/post/store/store/getEnterpriseStore`,
        params,
    })
}

/**
 * 客户生日提醒
 * @param params
 */
export function getBirthdayReminders(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getBirthdayReminders`,
        params,
    })
}

/**
 * 连锁-开发人员
 * @param params
 */
export function membersList(params) {
    return fetch({
        method: 'post',
        url: `/post/members/membersList`,
        params,
    })
}

/**
 * 连锁-开发人员
 * @param params
 */
export function membersListByChain(params) {
    return fetch({
        method: 'post',
        url: `/post/members/membersListByChain`,
        params,
    })
}

/**
 * 测试权限
 * @param params
 */
export function testMenu(params) {
    return fetch({
        method: 'post',
        url: `/post/testMenu`,
        params,
    })
}


/**
 * 获取岗位别名
 * @param params
 */
export function getAliasInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/store/alias/getInfo`,
        params,
    })
}