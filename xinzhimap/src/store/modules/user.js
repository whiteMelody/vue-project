const user = {
    state: {
      currentUser: {},
    },
    mutations: {
      SET_CURRENT_USER (state, currentUser) {
        localStorage.setItem('CURRENT_USER', JSON.stringify(currentUser))
        state.currentUser = currentUser
          if(window.plus){
              plus.storage.setItem('CURRENT_USER', JSON.stringify(currentUser));
          }
      },

    }
  }
  
  export default user