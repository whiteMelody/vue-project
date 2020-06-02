import fetch from '@/assets/api'

/**
 * 获取私密档案列表
 * @param params
 */
export function getXFilesList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getXFilesList`,
        params,
    })
}

/**
 * 查看私密档案
 * @param params
 */
export function getSeeXFiles(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getSeeXFiles`,
        params,
    })
}

/**
 * 私密档案 未完成列表
 * @param params
 */
export function getCustomerNotCompleteXFilesList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getCustomerNotCompleteXFilesList`,
        params,
    })
}

/**
 * 私密档案 已完成列表
 * @param params
 */
export function getCustomerCompleteXFilesList(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/getCustomerCompleteXFilesList`,
        params,
    })
}

/**
 * 提交私密档案
 * @param params
 */
export function postCustomerAddXFiles(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/postCustomerAddXFiles`,
        params,
    })
}

/**
 * 私密档案 添加选项
 * @param params
 */
export function postAddLabelContent(params) {
    return fetch({
        method: 'post',
        url: `/post/customers/customer/postAddLabelContent`,
        params,
    })
}

