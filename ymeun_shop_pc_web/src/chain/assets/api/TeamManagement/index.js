import fetch from '@/chain/assets/api'
/**
 * demo  人事管理-员工数据
 * @param params
 */
export function getAnalysis(params) {
    return fetch({
        method: 'post',
        url: `/post/api/store/getAnalysis`,
        params,
    })
}


/**
 * demo  人事管理-员工数据合计
 * @param params
 */
export function getMembersNumber(params) {
    return fetch({
        method: 'post',
        url: `/post/api/members/getMembersNumber`,
        params,
    })
}


/**
 * demo  人事调动-门店选择
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
 * demo  人事调动-列表
 * @param params
 */
export function getMembersList(params) {
    return fetch({
        method: 'post',
        url: `/post/api/members/getMembersList`,
        params,
    })
}


/**
 * demo  人事调动-岗位交接员工获取
 * @param params
 */
export function transferInterface(params) {
    return fetch({
        method: 'post',
        url: `/post/api/members/transferInterface`,
        params,
    })
}


/**
 * demo  人事调动-提交
 * @param params
 */
export function transfer(params) {
    return fetch({
        method: 'post',
        url: `/post/api/members/transfer`,
        params,
    })
}

/**
 * demo  岗位别名-获取
 * @param params
 */
export function getInfo(params) {
    return fetch({
        method: 'post',
        url: `/post/store/alias/getInfo`,
        params,
    })
}

/**
 * demo  岗位别名-修改
 * @param params
 */
export function postEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/store/alias/postEdit`,
        params,
    })
}