import fetch from '@/chain/assets/api'

/**
 * 回访列表
 * @param params
 */
export function reviewList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/review/reviewList`,
        params,
    })
}

/**
 * 分配回访
 * @param params
 */
export function reviewAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/api/review/reviewAdd`,
        params,
    })
}

/**
 * 填写回访展示
 * @param params
 */
export function reviewCompleteExhibition(params) {
    return fetch({
        method: 'post',
        url: `/post/api/review/reviewCompleteExhibition`,
        params,
    })
}

/**
 * 填写回访
 * @param params
 */
export function reviewComplete(params) {
    return fetch({
        method: 'post',
        url: `/post/api/review/reviewComplete`,
        params,
    })
}

/**
 * 查看回访
 * @param params
 */
export function reviewSee(params) {
    return fetch({
        method: 'post',
        url: `/post/api/review/reviewSee`,
        params,
    })
}

/**
 * 获取填写回访的项目
 * @param params
 */
export function getStoreItem(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getStoreItem`,
        params,
    })
}

