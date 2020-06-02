import fetch from '@/assets/api'

/**
 * 列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/getList`,
        params,
    })
}

/**
 * 选择时间段
 * @param params
 */
export function getTime(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/getTime`,
        params,
    })
}


/**
 * 选择时间段
 * @param params
 */
export function getSave(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/save`,
        params,
    })
}