
import fetch from '@/chain/assets/api'

/**
 * 可退单列表
 * @param params
 */
export function getAllowRefundList(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/refund/getAllowRefundList`,
        params,
    })
}

/**
 * 可审核列表
 * @param params
 */
export function getRefundAuditList(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/refund/getRefundAuditList`,
        params,
    })
}

/**
 * 已退单列表
 * @param params
 */
export function getRefundList(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/refund/getRefundList`,
        params,
    })
}

/**
 * 退单操作详情
 * @param params
 */
export function getRefundAccount(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/refund/getRefundAccount`,
        params,
    })
}

/**
 * 退单操作提交
 * @param params
 */
export function refundAuditAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/refund/refundAuditAdd`,
        params,
    })
}

/**
 * 退单详情-查看
 * @param params
 */
export function getRefundSee(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/refund/getRefundSee`,
        params,
    })
}

/**
 * 退单详情-查看
 * @param params
 */
export function RefundToExamineAdopt(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/refund/RefundToExamineAdopt`,
        params,
    })
}

/**
 * 退单详情-查看
 * @param params
 */
export function RefundToExamineNotAdopt(params) {
    return fetch({
        method: 'post',
        url: `/post/finance/refund/RefundToExamineNotAdopt`,
        params,
    })
}



