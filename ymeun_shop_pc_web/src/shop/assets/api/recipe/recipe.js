import fetch from '@/shop/assets/api'

/**
 * 配方列表
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/formula/getList`,
        params,
    })
}

/**
 * 配方展示获取未填写项目
 * @param params
 */
export function getFormulaAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/formula/getFormulaAdd`,
        params,
    })
}

/**
 * 添加配方
 * @param params
 */
export function formulaAdd(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/formula/formulaAdd`,
        params,
    })
}

/**
 * 配方修改展示
 * @param params
 */
export function getFormulaEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/formula/getFormulaEdit`,
        params,
    })
}

/**
 * 修改配方
 * @param params
 */
export function formulaEdit(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/formula/formulaEdit`,
        params,
    })
}

/**
 * 获取项目的配方
 * @param params
 */
export function getFormulaGetByItemsId(params) {
    return fetch({
        method: 'post',
        url: `/post/supply/formula/getFormulaGetByItemsId`,
        params,
    })
}

