const user = {
    state: {
        messageCount: {},
    },
    mutations: {
      SET_MESSAGE_COUNT (state, messageCount) {
        localStorage.setItem('MESSAGE_COUNT', JSON.stringify(messageCount))
        state.messageCount = messageCount
      },

    }
  }
  
  export default user