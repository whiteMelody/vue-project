import fetch from '@/assets/api'

/**
 * 获取登录的二维码
 * @param params
 */
export function search_abroad(params) {
    return fetch({
        method: 'get',
        url: `/api/map/search_abroad`,
        params,
    })
}
// 公交
export function transit_direction(params){
    return fetch({
        method: 'get',
        url: '/api/map/transit_direction',
        params,
    })
}
// 骑行
export function riding_direction(params){
    return fetch({
        method: 'get',
        url: '/api/map/riding_direction',
        params,
    })
}
// 驾车
export function driving_direction(params){
    return fetch({
        method: 'get',
        url: '/api/map/driving_direction',
        params,
    })
}
// 步行
export function walking_direction(params){
    return fetch({
        method: 'get',
        url: '/api/map/walking_direction',
        params,
    })
}

