import fetch from '@/assets/api';

//获取门店-某种角色下的员工
export function getStoreMembers(params) {
    return fetch({
        method: 'post',
        url: `/store/getStoreMembers`,
        params
    })
}
//获取门店-项目
export function getStoreItem(params) {
    return fetch({
        method: 'post',
        url: `/store/getStoreItem`,
        params
    })
}
//获取门店-渠道
export function getStoreChannel(params) {
    return fetch({
        method: 'post',
        url: `/store/getStoreChannel`,
        params
    })
}
//新增顾客
export function addCustomer(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/add`,
        params
    })
}
//客户信息
export function getUserData(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/info`,
        params
    })
}