import fetch from '@/assets/api'

/**
 * 获取登录的二维码
 * @param params
 */
export function saveTag(params) {
    return fetch({
        method: 'get',
        url: `/api/tools/saveTag`,
        params,
    })
}

/**
 * 查询用户是否已经登录
 * @param params
 */
export function delTag(params) {
    return fetch({
        method: 'post',
        url: `/api/tools/delTag`,
        params,
    })
}

/**
 * 获取验证码
 * @param params
 */
export function listAllTags(params) {
    return fetch({
        method: 'get',
        url: `api/tools/listAllTags`,
        params,
    })
}

