const treatmentRoom = {
    state: {
        treatmentRoomList: [],
    },
    mutations: {

      SET_TREATMENTROOMLIST (state, treatmentRoomList) {
        localStorage.setItem('TREATMENTROOMLIST', JSON.stringify(treatmentRoomList))
        state.treatmentRoomList = treatmentRoomList
      },

    }
  }
  
  export default treatmentRoom