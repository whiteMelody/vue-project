import fetch from '@/shop/assets/api'

/**
 * login
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
 * logout
 * @param params
 */
export function logout(params) {
    return fetch({
        method: 'post',
        url: `/post/logout`,
        params,
    })
}


