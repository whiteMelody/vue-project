import fetch from '@/chain/assets/api'

/**
 * 获取菜单
 * @param params
 */
export function menus(params) {
    return fetch({
        method: 'post',
        url: `/post/authority/menus`,
        params,
    })
}

/**
 * 修改其他角色 获取菜单
 * @param params
 */
export function getJurisdictionSetting(params) {
    return fetch({
        method: 'post',
        url: `/post/authority/getJurisdictionSetting`,
        params,
    })
}

/**
 * 提交角色权限
 * @param params
 */
export function postJurisdictionSetting(params) {
    return fetch({
        method: 'post',
        url: `/post/authority/postJurisdictionSetting`,
        params,
    })
}

/**
 * 获取左侧菜单
 * @param params
 */
export function getIndexBar(params) {
    return fetch({
        method: 'post',
        url: `/post/api/getIndexBar`,
        params,
    })
}
