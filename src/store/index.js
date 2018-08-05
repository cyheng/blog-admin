import Vuex from 'vuex'
import Vue from 'vue'
import user from './moudel/user'
import category from './moudel/category'
import comment from './moudel/comment'
import getters from './getters'
Vue.use(Vuex)


const store = new Vuex.Store({
    modules:{
        user,
        comment,
        category,
     
    },
    getters
})


export default store