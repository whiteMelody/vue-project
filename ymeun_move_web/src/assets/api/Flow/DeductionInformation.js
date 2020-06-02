
import fetch from '@/assets/api';

//获取门店-某种角色下的员工
export function getStoreMembers(params) {
    return fetch({
        method: 'post',
        url: `/store/getStoreMembers`,
        params
    })
}


//获取划扣信息
export function getOrderAvailableItemList(params) {
    return fetch({
        method: 'post',
        url: `/process/consume/getOrderAvailableItemList`,
        params
    })
}

//确认划扣
export function setSave(params) {
    return fetch({
        method: 'post',
        url: `/process/consume/save`,
        params
    })
}