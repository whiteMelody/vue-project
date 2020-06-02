import fetch from '@/chain/assets/api'
/**
 * 新增账号
 * @param params
 */
export function membersPostAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/members/membersPostAdd`,
        params,
    })
}

/**
 * 员工详情
 * @param params
 */
export function getInfoByMemberId(params) {
    return fetch({
        method: 'post',
        url: `/post/members/getInfoByMemberId`,
        params,
    })
}

/**
 * 修改员工资料
 * @param params
 */
export function membersPostEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/members/membersPostEdit`,
        params,
    })
}

/**
 * 员工停用/调动
 * @param params
 */
export function membersDiscontinueOrTransfer(params) {
    return fetch({
        method: 'post',
        url: `/post/members/membersDiscontinueOrTransfer`,
        params,
    })
}

/**
 * 顾问折扣设置
 * @param params
 */
export function membersDiscountByOne(params) {
    return fetch({
        method: 'post',
        url: `/post/members/membersDiscountByOne`,
        params,
    })
}

/**
 * 获取岗位别名
 * @param params
 */
export function getAliasInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/store/alias/getInfo`,
        params,
    })
}

/**
 * 修改岗位名称
 * @param params
 */
export function postAliasEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/store/alias/postEdit`,
        params,
    })
}

/**
 * 设置顾问折扣权限
 * @param params
 */
export function membersDiscountByAll(params) {
    return fetch({
        method: 'post',
        url: `/post/members/membersDiscountByAll`,
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
 * 门店目标检测
 * @param params
 */
export function getHas(params) {
    return fetch({
        method: 'post',
        url: `/post/store/target/has`,
        params,
    })
}

/**
 * 新增账号
 * @param params
 */
export function getUserName(params) {
    return fetch({
        method: 'post',
        url: `/post/members/getUserName`,
        params,
    })
}





