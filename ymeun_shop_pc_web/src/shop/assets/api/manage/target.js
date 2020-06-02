import fetch from '@/shop/assets/api'

/**
 * 门店目标检测
 * @param params
 */
export function hasTarget(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/has`,
        params,
    })
}

/**
 * 门店目标列表
 * @param params
 */
export function getUserList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/getUserList`,
        params,
    })
}

/**
 * 门店目标保存
 * @param params
 */
export function targetSave(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/save`,
        params,
    })
}

/**
 * 查看目标详情
 * @param params
 */
export function getDetailed(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/getDetailed`,
        params,
    })
}
