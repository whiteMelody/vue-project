
const getters = {
    //登录用户
    currentUser: (state) => {
        if(state.user.currentUser.nickname) return state.user.currentUser
        if(window.plus) return JSON.parse(plus.storage.getItem('CURRENT_USER'))
        return JSON.parse(localStorage.getItem('CURRENT_USER'))
    },
    //map
    map: (state) =>{
        if(state.map.local) return state.map
        if(window.plus) return JSON.parse(plus.storage.getItem('xzMap'))
        return JSON.parse(localStorage.getItem('xzMap'))
    }
}
export default getters
