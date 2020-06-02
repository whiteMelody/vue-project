import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  actions: {
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
  },
  modules: {

  }
})

export default store
