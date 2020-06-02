import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store=new Vuex.Store({
    modules:{
        loading,
        user,
    },
    getters,
})

export default store
