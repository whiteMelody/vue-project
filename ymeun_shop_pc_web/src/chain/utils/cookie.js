import Cookies from 'js-cookie'

export const Token = 'token'
export const UserInfo = 'userInfo'
export const UserData = 'userData'
export const Permission = 'permission'


export function getCookie (cookieKey) {
    return Cookies.get(cookieKey)
}

export function setCookie (cookieKey, info) {
    return Cookies.set(cookieKey, info)
}

export function removeCookie (cookieKey) {
    return Cookies.remove(cookieKey)
}
