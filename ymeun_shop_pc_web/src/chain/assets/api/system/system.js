import fetch from '@/chain/assets/api'

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

/**
 * 账号列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/getList`,
        params,
    })
}

/**
 * 停用启用
 * @param params
 */
export function setStatus(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/setStatus`,
        params,
    })
}

/**
 * 获取修改资料
 * @param params
 */
export function getEditData(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/getEditData`,
        params,
    })
}

/**
 * 修改资料-提交
 * @param params
 */
export function editData(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/editData`,
        params,
    })
}

/**
 * 修改密码
 * @param params
 */
export function editPassword(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/editPassword`,
        params,
    })
}

/**
 * 获取账号
 * @param params
 */
export function getUserName(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/getUserName`,
        params,
    })
}

/**
 * 获取权限
 * @param params
 */
export function getIndexBar(params) {
    return fetch({
        method: 'post',
        url: `/post/api/getIndexBar`,
        params,
    })
}