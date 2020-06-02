
import fetch from '@/assets/api';
//获取门店-项目
export function getStoreItem(params) {
    return fetch({
        method: 'post',
        url: `/store/getStoreItem`,
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

//获取预约信息
export function getAppointment(params) {
    return fetch({
        method: 'post',
        url: `/process/getAppointment`,
        params
    })
}

//提交新增预约
export function addAppointment(params) {
    return fetch({
        method: 'post',
        url: `/process/addAppointment`,
        params
    })
}
//提交修改预约
export function editAppointment(params) {
    return fetch({
        method: 'post',
        url: `/process/editAppointment`,
        params
    })
}