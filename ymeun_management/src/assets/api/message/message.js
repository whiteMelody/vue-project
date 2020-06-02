import fetch from '@/assets/api'

/**
 * 发布消息
 * @param params
 */
export function ReleaseMessage(params) {
    return fetch({
        method: 'post',
        url: `/post/message/save`,
        params,
    })
}


/**
 * 消息列表
 * @param params
 */
export function MessageList(params) {
    return fetch({
        method: 'post',
        url: `/post/message/getList`,
        params,
    })
}


/**
 * 发布人
 * @param params
 */
export function Publisher(params) {
    return fetch({
        method: 'post',
        url: `/post/authority/getUserList`,
        params,
    })
}


/**
 * 删除消息
 * @param params
 */
export function DeleteMessage(params) {
    return fetch({
        method: 'post',
        url: `/post/message/delete`,
        params,
    })
}