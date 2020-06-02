const map = {
    state: {
      map: {},
    },
    mutations: {
      SET_MAP_LOCAL (state, map) {
          //xzMap 防止重名
        localStorage.setItem('xzMap', JSON.stringify(map))
        state.map = map
          if(window.plus){
              plus.storage.setItem('xzMap', JSON.stringify(map));
          }
      },
    }
  }
  
  export default map