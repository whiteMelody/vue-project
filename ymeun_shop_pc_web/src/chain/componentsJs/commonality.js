import Vue from 'vue'
import MessagePop from '../components/MessagePop'

function plugin() {
    if(plugin.installed){
        return
    }
    Vue.component('MessagePop',MessagePop)
}


export default plugin
