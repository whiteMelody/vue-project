import fetch from '@/assets/api'

/**
 * 划扣列表
 * @param params
 */
export function getConsumeList(params) {
    return fetch({
        method: 'post',
        url: `/process/consume/getList`,
        params,
    })
}

/**
 * 获取划扣信息详情
 * @param params
 */
export function consumeInfo(params) {
    return fetch({
        method: 'post',
        url: `/process/consume/info`,
        params,
    })
}


