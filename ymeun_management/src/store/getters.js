import { formatArrayToMap, formatArrayToStringMap } from "@/utils/format"

const getters = {
    //登录用户
    currentUser: state => state.user.currentUser.name ? state.user.currentUser : JSON.parse(localStorage.getItem('CURRENT_USER')),
}
export default getters
