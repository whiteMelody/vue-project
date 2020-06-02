import Vue from 'vue'
import Vuex from 'vuex'
import Interface from '../assets/js/interface.js'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    expertList: []
  },
  actions: {
    LOAD_EXPERT_LIST: function ({ commit }) {
      Interface.newsList(1, 20, function (data) {
        console.log(data);
        if (data) {
          commit('SET_EXPERT_LIST', { list: data.returnJSON.indexData })
        }
      });
    }
  },
  mutations: {
    SET_EXPERT_LIST: (state, { list }) => {
      state.expertList = list
    }
  },
  getters: {
    openExpertList: state => {
      return state.expertList.filter(expert => !expert.completed)
    }
  },
  modules: {

  }
})
export default store
