import fetch from '@/chain/assets/api'



/**
 * logout 登出
 * @param params
 */
export function logout(params) {
    return fetch({
        method: 'post',
        url: `/post/logout`,
        params,
    })
}


/**
 * login 登录
 * @param params
 */
export function login(params) {
    return fetch({
        method: 'post',
        url: `/post/login`,
        params,
    })
}
