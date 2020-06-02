import fetch from '@/assets/api';

//获取预约信息
export function getAppointment(params) {
    return fetch({
        method: 'post',
        url: `/process/getAppointment`,
        params
    })
}

//确认到店
export function getTriage(params) {
    return fetch({
        method: 'post',
        url: `/process/triage`,
        params
    })
}