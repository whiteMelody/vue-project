import fetch from '@/assets/api';
//取消预约
export function setCancelAppointment(params) {
    return fetch({
        method: 'post',
        url: `/process/cancelAppointment`,
        params
    })
}