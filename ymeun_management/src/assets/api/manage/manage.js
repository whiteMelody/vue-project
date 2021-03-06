import fetch from '@/assets/api'

/**
 * 添加项目
 * @param params
 */
export function addItems(params) {
    return fetch({
        method: 'post',
        url: `/post/store/items/add`,
        params,
    })
}

/**
 * 启用/停用 项目
 * @param params
 */
export function changeStatus(params) {
    return fetch({
        method: 'post',
        url: `/post/store/items/changeStatus`,
        params,
    })
}

/**
 * 新增&修改渠道
 * @param params
 */
export function addChannel(params) {
    return fetch({
        method: 'post',
        url: `/post/store/channel/add`,
        params,
    })
}

/**
 * 员工列表
 * @param params
 */
export function membersList(params) {
    return fetch({
        method: 'post',
        url: `/post/members/membersList`,
        params,
    })
}

/**
 * 启用/禁用 渠道
 * @param params
 */
export function changeChannelStatus(params) {
    return fetch({
        method: 'post',
        url: `/post/store/channel/changeStatus`,
        params,
    })
}



