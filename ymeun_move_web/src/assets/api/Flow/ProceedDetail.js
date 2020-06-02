import fetch from '@/assets/api';

//收银展示数据
export function getSeeOrdersByOrdersId(params) {
    return fetch({
        method: 'post',
        url: `/process/orders/SeeOrdersByOrdersId`,
        params
    })
}
