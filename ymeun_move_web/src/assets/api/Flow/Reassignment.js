import fetch from '@/assets/api';

//获取预约信息
export function getAppointment(params) {
    return fetch({
        method: 'post',
        url: `/process/getAppointment`,
        params
    })
}

//获取门店-某种角色下的员工
export function getStoreMembers(params) {
    return fetch({
        method: 'post',
        url: `/store/getStoreMembers`,
        params
    })
}

//改排
export function postRearrangement(params) {
    return fetch({
        method: 'post',
        url: `/process/postRearrangement`,
        params
    })
}

