import fetch from '@/shop/assets/api'

/**
 * 获取菜单
 * @param params
 */
export function getList(params) {
    return fetch({
        method: 'post',
        url: `/post/store/schedule/getList`,
        params,
    })
}


export function save(params) {
    return fetch({
        method: 'post',
        url: `/post/store/schedule/save`,
        params,
    })
}

