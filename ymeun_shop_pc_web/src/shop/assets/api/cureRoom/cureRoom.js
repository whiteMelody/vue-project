import fetch from '@/shop/assets/api'

/**
 * 治疗间列表
 * @param params
 */
export function CureRoomeList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/getTherapeuticRoomAllList`,
        params,
    })
}



/**
 * 治疗间增加使用时间
 * @param params
 */
export function CureRoomeTime(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomAddTime`,
        params,
    })
}


/**
 * 预约治疗间
 * @param params
 */
export function CureRoomeAddReserve(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomAddReserve`,
        params,
    })
}


/**
 * 治疗间预约历史记录
 * @param params
 */
export function CureRoomRecord(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomGetAddReserve`,
        params,
    })
}


/**
 * 治疗间预约列表
 * @param params
 */
export function appointmentList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomReserveList`,
        params,
    })
}


/**
 * 治疗间预约列表-取消预约
 * @param params
 */
export function closeApp(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomCancelReserveById`,
        params,
    })
}


/**
 * 治疗间预约-划扣项目
 * @param params
 */
export function DeductionLIst(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/getAvailableItemList`,
        params,
    })
}


/**
 * 治疗间预约-修改展示
 * @param params
 */
export function CureRoomModify(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomGetReserveById`,
        params,
    })
}


/**
 * 治疗间预约-修改
 * @param params
 */
export function CureRoomModifyData(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomEditReserve`,
        params,
    })
}


/**
 * 治疗间详情
 * @param params
 */
export function CureRoomDetails(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomDetailsAddOrders`,
        params,
    })
}


/**
 * 客户信息
 * @param params
 */
export function CustomerData(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/info`,
        params,
    })
}


/**
 * 治疗间服务内容
 * @param params
 */
export function serviceList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomServiceList`,
        params,
    })
}


/**
 * 治疗间服务-呼叫
 * @param params
 */
export function CureRoomCall(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomAddService`,
        params,
    })
}


/**
 * 治疗间服务-再次呼叫
 * @param params
 */
export function CureRoomCallAgain(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomAgainCallService`,
        params,
    })
}


/**
 * 治疗间服务-呼叫列表
 * @param params
 */
export function CureRoomCallList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomServiceRecordList`,
        params,
    })
}


/**
 * 治疗间服务-完成呼叫服务
 * @param params
 */
export function completeCall(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomCompleteService`,
        params,
    })
}


/**
 * 治疗间服务-已划扣项目
 * @param params
 */
export function DeductionProject(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/getDetailed`,
        params,
    })
}


/**
 * 治疗间服务-可划扣项目
 * @param params
 */
export function RemainingItems(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/getAvailableItemList`,
        params,
    })
}


/**
 * 治疗间服务-发起划扣
 * @param params
 */
export function LaunchSave(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/save`,
        params,
    })
}


/**
 * 治疗间服务-退回划扣
 * @param params
 */
export function backItems(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/giveBack`,
        params,
    })
}