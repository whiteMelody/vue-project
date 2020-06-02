
import fetch from '@/shop/assets/api';


/**
 * 铺垫列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/task/taskForeshadowingList`,
        params,
    })
}


/**
 * 铺垫列表
 * @param params
 */
export function taskModify(params) {
    return fetch({
        method: 'post',
        url: `/post/task/taskForeshadowingCheck`,
        params,
    })
}