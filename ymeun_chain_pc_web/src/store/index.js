import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import user from './modules/user'
import roles from './modules/roles'
import treatmentRoom from './modules/treatmentRoom'
import channel from './modules/channel'
import project from './modules/project'
import client from './modules/client'
import message from './modules/message'
import getters from './getters'

Vue.use(Vuex)

const store=new Vuex.Store({
    modules:{
        loading,
        user,
        roles,
        treatmentRoom,
        channel,
        project,
        client,
        message,
    },
    getters,
})

export default store
