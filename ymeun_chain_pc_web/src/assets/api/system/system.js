import fetch from '@/assets/api'

/**
 * 获取权限列表
 * @param params
 */
export function getEditJurisdiction(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/getEditJurisdiction`,
        params,
    })
}

/**
 * 设置权限列表
 * @param params
 */
export function editJurisdiction(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/editJurisdiction`,
        params,
    })
}

/**
 * 新增账号-基本信息
 * @param params
 */
export function postAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/postAdd`,
        params,
    })
}

/**
 * 新增账号权限
 * @param params
 */
export function addJurisdiction(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/addJurisdiction`,
        params,
    })
}


