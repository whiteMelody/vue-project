const channel = {
    state: {
        channelList: [],
        channelList1: [],
    },
    mutations: {

      SET_CHANNELLIST (state, channelList) {
          localStorage.setItem('CHANNELLIST', JSON.stringify(channelList))
          state.channelList = channelList
      },
      SET_CHANNELLIST1 (state, channelList1) {
        localStorage.setItem('CHANNELLIST1', JSON.stringify(channelList1))
        state.channelList1 = channelList1
      },

    }
  }
  
  export default channel