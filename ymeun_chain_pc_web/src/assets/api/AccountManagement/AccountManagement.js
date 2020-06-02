import fetch from '@/assets/api'

/**
 * 账号列表
 * @param params
 */
export function getAccountList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/account/getList`,
        params,
    })
}
