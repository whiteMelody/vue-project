import fetch from '@/assets/api'


/**
 * 门店信息
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
 * 首页时间段
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
 * 首页目标查看
 * @param params
 */
export function getTargetList(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/members/target`,
        params,
    })
}


/**
 * 总消耗业绩明细
 * @param params
 */
export function consumeSurplus(params) {
    return fetch({
        method: 'post',
        url: `/post/analysis/customer/consumeSurplus`,
        params,
    })

}
