const user = {
    state: {
      currentUser: {},
    },
    mutations: {
      SET_CURRENT_USER (state, currentUser) {
        localStorage.setItem('CURRENT_USER', JSON.stringify(currentUser))
        state.currentUser = currentUser
      },

    }
  }
  
  export default user