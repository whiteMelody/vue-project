import fetch from '@/assets/api'
/**
 * 消息列表
 * @param params
 */
export function getMessage(params) {
    return fetch({
        method: 'post',
        url: `/post/api/message/getList`,
        params,
    })
}


/**
 * 设置消息为已读
 * @param params
 */
export function getMessageRead(params) {
    return fetch({
        method: 'post',
        url: `/post/api/message/read`,
        params,
    })
}


/**
 * 未读消息数量
 * @param params
 */
export function getUnreadMessage(params) {
    return fetch({
        method: 'post',
        url: `/post/api/message/unread`,
        params,
    })
}