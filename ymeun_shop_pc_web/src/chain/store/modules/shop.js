const shop = {
    state: {
        shopList: [],
    },
    mutations: {

      SET_SHOPLIST (state, shopList) {
          localStorage.setItem('SHOPLIST', JSON.stringify(shopList))
          state.shopList = shopList
      },
   

    }
  }
  
  export default shop