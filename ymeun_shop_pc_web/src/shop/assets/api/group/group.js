import fetch from '@/shop/assets/api'

/**
 * 获取组列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/group/getList`,
        params,
    })
}

/**
 * 编辑组
 * @param params
 */
export function saveGroup(params) {
    return fetch({
        method: 'post',
        url: `/post/store/group/save`,
        params,
    })
}

/**
 * 删除组
 * @param params
 */
export function deleteGroup(params) {
    return fetch({
        method: 'post',
        url: `/post/store/group/delete`,
        params,
    })
}


