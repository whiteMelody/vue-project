import fetch from '@/assets/api'

/**
 * 渠道列表
 * @param params
 */
export function channelList(params) {
    return fetch({
        method: 'post',
        url: `post/api/channel/channelList`,
        params,
    })
}


/**
 * 渠道新增/修改
 * @param params
 */
export function channelAdd(params) {
    return fetch({
        method: 'post',
        url: `post/api/channel/channelAdd`,
        params,
    })
}


/**
 * 渠道启用/禁用
 * @param params
 */
export function channelChangeStatus(params) {
    return fetch({
        method: 'post',
        url: `post/api/channel/channelChangeStatus`,
        params,
    })
}

/**
 * 渠道单级
 * @param params
 */
export function getListChannel(params) {
    return fetch({
        method: 'post',
        url: `post/api/channel/getListChannel`,
        params,
    })
}


