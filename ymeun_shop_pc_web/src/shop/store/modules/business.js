const business = {
    state: {
        businessList: [],
    },
    mutations: {
        SET_BUSINESSLIST (state, businessList) {
        localStorage.setItem('BUSINESSLIST', JSON.stringify(businessList))
        state.businessList = businessList
      },

    }
  }
  
  export default business