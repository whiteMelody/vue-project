import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import map from './modules/map'
import user from './modules/user'

Vue.use(Vuex)

const store=new Vuex.Store({
    modules:{
        map,
        user,
    },
    getters,
})

export default store
