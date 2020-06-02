import fetch from '@/assets/api'
/**
 * 登陆
 * @param params
 */
export function login(params) {
    return fetch({
        method: 'post',
        url: `/post/login`,
        params,
    })
}


/**
 * 用户信息
 * @param params
 */
export function getUserInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/getUserInfo`,
        params,
    })
}