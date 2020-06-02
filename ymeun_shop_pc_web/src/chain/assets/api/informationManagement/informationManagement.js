import fetch from '@/chain/assets/api'



/**
 * 消息列表
 * @param params
 */
export function messageInbox(params) {
    return fetch({
        method: 'post',
        url: `/post/api/message/inbox`,
        params,
    })
}



/**
 * 删除消息
 * @param params
 */
export function messageRemove(params) {
    return fetch({
        method: 'post',
        url: `/post/api/message/remove`,
        params,
    })
}



/**
 * 获取门店
 * @param params
 */
export function getOrderRankingListByStore(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getOrderRankingListByStore`,
        params,
    })
}



/**
 * 获取接受门店
 * @param params
 */
export function getStore(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getStore`,
        params,
    })
}



/**
 * 发布消息
 * @param params
 */
export function messageAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/api/message/add`,
        params,
    })
}