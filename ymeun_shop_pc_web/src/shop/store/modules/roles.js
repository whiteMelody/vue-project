
const roles = {
    state: {
        developer: [],
        shopManager: [],
        counselor: [],
        cosmetologist: [],
        reception: [],
        roleList:[],
        roleName: {}
    },
    mutations: {
      SET_DEVELOPER (state, developer) {
        localStorage.setItem('DEVELOPER', JSON.stringify(developer))
        state.developer = developer
      },
      SET_SHOPMANAGER (state, shopManager) {
        localStorage.setItem('SHOPMANAGER', JSON.stringify(shopManager))
        state.shopManager = shopManager
      },
      SET_COUNSELOR (state, counselor) {
        localStorage.setItem('COUNSELOR', JSON.stringify(counselor))
        state.counselor = counselor
      },
      SET_COSMETOLOGIST (state, cosmetologist) {
        localStorage.setItem('COSMETOLOGIST', JSON.stringify(cosmetologist))
        state.cosmetologist = cosmetologist
      },
      SET_RECEPTION (state, reception) {
        localStorage.setItem('RECEPTION', JSON.stringify(reception))
        state.reception = reception
      },
      
      SET_ROLELIST(state, roleList) {
        localStorage.setItem('ROLELIST', JSON.stringify(roleList))
        state.roleList = roleList
      },
      
      SET_ROLENAME(state, roleName) {
        localStorage.setItem('ROLENAME', JSON.stringify(roleName))
        state.roleName = roleName
      },

    }
  }
  
  export default roles