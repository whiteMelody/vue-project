const common = {
    state: {
        permissionList: [],
    },
    mutations: {

      SET_PERMISSIONLIST (state, permissionList) {
          localStorage.setItem('PERMISSIONLIST', JSON.stringify(permissionList))
          state.permissionList = permissionList
      },

    }
  }
  
  export default common