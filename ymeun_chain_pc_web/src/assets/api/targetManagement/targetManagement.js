import fetch from '@/assets/api'


/**
 * 全部门店
 * @param params
 */
export function getStoreList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/members/getStoreList`,
        params,
    })
}

/**
 * 门店目标列表
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
 * 门店目标时间段
 * @param params
 */
export function getTime(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/getTime`,
        params,
    })
}

/**
 * 门店设定目标保存
 * @param params
 */
export function save(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/save`,
        params,
    })
}

