
import fetch from '@/shop/assets/api'

/**
 * 客户列表
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
 * 划扣列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/getList`,
        params,
    })
}

/**
 * 划扣-操作
 * @param params
 */
export function getAvailableItemList(params) {
    return fetch({
        method: 'post',
        url: `/post/process/orders/getAvailableItemList`,
        params,
    })
}

/**
 * 治疗间列表
 * @param params
 */
export function getTherapeuticRoomAllList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/getTherapeuticRoomAllList`,
        params,
    })
}

/**
 * 划扣发起
 * @param params
 */
export function postSave(params) {
    return fetch({
        method: 'post',
        url: `/post/process/consume/save`,
        params,
    })
}

/**
 * 治疗间预约信息
 * @param params
 */
export function AppCureRoom(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomGetReserveByCustomerId`,
        params,
    })
}



/**
 * 治疗间取消预约
 * @param params
 */
export function closeApp(params) {
    return fetch({
        method: 'post',
        url: `/post/store/treatmentRoom/therapeuticRoomCancelReserveById`,
        params,
    })
}
