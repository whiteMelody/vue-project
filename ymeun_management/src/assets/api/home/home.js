import fetch from '@/assets/api'

/**
 * 企业列表
 * @param params
 */
export function enterpriseList(params) {
    return fetch({
        method: 'post',
        url: `/post/enterprise/enterpriseList`,
        params,
    })
}

/**
 * 新增企业
 * @param params
 */
export function enterpriseAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/enterprise/enterpriseAdd`,
        params,
    })
}

/**
 * 修改企业
 * @param params
 */
export function enterpriseEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/enterprise/enterpriseEdit`,
        params,
    })
}

/**
 * 搜索企业
 * @param params
 */
export function enterpriseSearch(params) {
    return fetch({
        method: 'post',
        url: `/post/enterprise/enterpriseSearch`,
        params,
    })
}

/**
 * 门店列表
 * @param params
 */
export function storeList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/storeList`,
        params,
    })
}

/**
 * 新增门店
 * @param params
 */
export function storeAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/store/storeAdd`,
        params,
    })
}

/**
 * 修改门店
 * @param params
 */
export function storeEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/store/storeEdit`,
        params,
    })
}

/**
 * 新增账号
 * @param params
 */
export function memberAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/member/memberAdd`,
        params,
    })
}

/**
 * 员工账号名称获取
 * @param params
 */
export function getUserName(params) {
    return fetch({
        method: 'post',
        url: `/post/member/getUserName`,
        params,
    })
}

/**
 * 项目列表
 * @param params
 */
export function itemList(params) {
    return fetch({
        method: 'post',
        url: `/post/item/itemList`,
        params,
    })
}

/**
 * 项目导入
 * @param params
 */
export function itemExcelImport(params) {
    return fetch({
        method: 'post',
        url: `/post/item/itemExcelImport`,
        params,
    })
}

/**
 * 新增项目
 * @param params
 */
export function itemAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/item/itemAdd`,
        params,
    })
}

/**
 * 渠道新增/修改
 * @param params
 */
export function channelAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/channel/channelAdd`,
        params,
    })
}

/**
 * 渠道列表
 * @param params
 */
export function channelList(params) {
    return fetch({
        method: 'post',
        url: `/post/channel/channelList`,
        params,
    })
}

/**
 * 渠道导入
 * @param params
 */
export function channelExcelImport(params) {
    return fetch({
        method: 'post',
        url: `/post/channel/channelExcelImport`,
        params,
    })
}

/**
 * 未购买版块
 * @param params
 */
export function getPurchasable(params) {
    return fetch({
        method: 'post',
        url: `/post/program/functionality/getPurchasable`,
        params,
    })
}

/**
 * 版块开通
 * @param params
 */
export function opened(params) {
    return fetch({
        method: 'post',
        url: `/post/program/functionality/opened`,
        params,
    })
}

/**
 * 模块取消
 * @param params
 */
export function cannel(params) {
    return fetch({
        method: 'post',
        url: `/post/program/functionality/cannel`,
        params,
    })
}

/**
 * 已购买模块
 * @param params
 */
export function getAvailable(params) {
    return fetch({
        method: 'post',
        url: `/post/program/functionality/getAvailable`,
        params,
    })
}

/**
 * 登出
 * @param params
 */
export function logout(params) {
    return fetch({
        method: 'post',
        url: `/post/logout`,
        params,
    })
}

export function save(params) {
    return fetch({
        method: 'post',
        url: `/post/authority/password/save`,
        params,
    })
}

/**
 * 项目标签
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `post/item/itemsClassify/getList`,
        params,
    })
}

/**
 * 开启/停止合作
 * @param params
 */
export function changeFashion(params) {
    return fetch({
        method: 'post',
        url: `post/enterprise/enterprise/changeFashion`,
        params,
    })
}

