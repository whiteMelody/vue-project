import fetch from '@/assets/api'


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


