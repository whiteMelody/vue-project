import fetch from '@/shop/assets/api'

/**
 * 活动列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/promotion/flexible/getList`,
        params,
    })
}

/**
 * 活动信息
 * @param params
 */
export function getInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/promotion/flexible/getDetailed`,
        params,
    })
}

/**
 * 活动新建/修改
 * @param params
 */
export function save(params) {
    return fetch({
        method: 'post',
        url: `/post/promotion/flexible/save`,
        params,
    })
}

/**
 * 活动开始/结束
 * @param params
 */
export function changeStatus(params) {
    return fetch({
        method: 'post',
        url: `/post/promotion/flexible/changeStatus`,
        params,
    })
}

/**
 * 老客数据
 * @param params
 */
export function getOldClientList(params) {
    return fetch({
        method: 'post',
        url: `/post/promotion/share/getOldClientList`,
        params,
    })
}

/**
 * 新客数据
 * @param params
 */
export function getNewClientList(params) {
    return fetch({
        method: 'post',
        url: `/post/promotion/share/getNewClientList`,
        params,
    })
}

/**
 * 获取活动PV和UV
 * @param params
 */
export function browsePvAndUv(params) {
    return fetch({
        method: 'post',
        url: `/post/browse/browsePvAndUv`,
        params,
    })
}




