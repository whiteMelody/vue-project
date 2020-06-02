
import fetch from '@/assets/api';

//获取顾客
export function getConsumeList(params) {
    return fetch({
        method: 'post',
        url: `/customers/customer/list`,
        params,
    })
}