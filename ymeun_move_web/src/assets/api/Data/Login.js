import fetch from '@/assets/api';

export function login(params) {
    return fetch({
        method: 'post',
        url: `/login`,
        params
    })
}

/**
 * 获取当前登录用户
 * @param params
 */
export function getUserInfo(params) {
    return fetch({
        method: 'post',
        url: `/api/getUserInfo`,
        params
    })
}


