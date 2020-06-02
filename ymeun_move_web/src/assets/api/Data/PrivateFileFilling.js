import fetch from '@/assets/api';

export function getList(params) {
    return fetch({
        method: 'post',
        url: `/task/TaskGetCustomerNotCompleteXFiles`,
        params
    })
}
export function addLabel(params) {
    return fetch({
        method: 'post',
        url: `/task/TaskAjaxPostAddLabelContent`,
        params
    })
}
export function taskAddLabel(params) {
    return fetch({
        method: 'post',
        url: `/task/TaskAddLabel`,
        params
    })
}