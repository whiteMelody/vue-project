import fetch from '@/chain/assets/api'


/**
 * login 日志列表
 * @param params
 */
export function logList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/log/logList`,
        params,
    })
}