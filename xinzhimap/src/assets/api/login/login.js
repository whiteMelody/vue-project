import fetch from '@/assets/api'

/**
 * 获取登录的二维码
 * @param params
 */
export function getwxloginqr(params) {
    return fetch({
        method: 'get',
        url: `/api/user/getwxloginqr`,
        params,
    })
}

/**
 * 查询用户是否已经登录
 * @param params
 */
export function getuserbylstoken(params) {
    return fetch({
        method: 'post',
        url: `/api/user/getuserbylstoken`,
        params,
    })
}

/**
 * 获取验证码
 * @param params
 */
export function getValidCode(params) {
    return fetch({
        method: 'get',
        url: `/api/user/getValidCode`,
        params,
    })
}

/**
 * 注册或登录
 * @param params
 */
export function regOrLoginByPhone(params) {
    return fetch({
        method: 'post',
        url: `/api/user/regOrLoginByPhone`,
        params,
    })
}

/**
 * 微信第三方登录
 * @param params
 */
export function oweixin(params) {
    return fetch({
        method: 'get',
        url: `/api/user/oweixin`,
        params,
    })
}

