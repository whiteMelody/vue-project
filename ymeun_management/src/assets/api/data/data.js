import fetch from '@/assets/api'

/**
 * 企业数据合计与图形
 * @param params
 */
export function enterpriseTotal(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/enterpriseTotal`,
        params,
    })
}

/**
 * 模块分析
 * @param params
 */
export function getCustomized(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/program/getCustomized`,
        params,
    })
}

