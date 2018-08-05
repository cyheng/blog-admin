import {user_info_get,logout_post,login_post} from '@/api/blog-admin-api/index'
import {getToken,removeToken,setToken} from '@/auth'
const state = {
    token:getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: '',
}


const mutations  = {
    SET_TOKEN(state,token){
        state.token = token
    },
    SET_NAME(state,name){
        state.name = name
    },
    SET_AVATAR(state,url){
        state.avatar = url
    },
    SET_ROLES(state,role){
        state.roles = role
    },
    SET_INTRODUCTION(state,itro){
        state.introduction = itro
    }
}


const actions  = {
    async login({commit},{username,password}){
        try {
        let  {data}  = await login_post({ data: { username, password } });
        setToken(data.token)
        commit('SET_TOKEN', data.token)
        
        } catch ({response}) {
            throw response
        }
        
    },
    async  getUserInfo({commit,state}){
        try {
        const {data,status} = await user_info_get({params:{token:state.token}})

        commit('SET_ROLES', data.role)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.avatar)
        commit('SET_INTRODUCTION', data.introduction) 
        } catch ({response}) {
          throw response
        }
    },

     front_logout({commit}){
        commit('SET_TOKEN', '')
        commit('SET_ROLES','')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_INTRODUCTION', '') 
        removeToken()
    }

}


export default {
    state,
    mutations,
    actions 
}