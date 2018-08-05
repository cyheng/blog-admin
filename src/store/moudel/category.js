import {admin_categories_post,admin_categories_get,admin_categories_delete,admin_categories_put } from "@/api/blog-admin-api/index";
const state = {
    category:[],
    isLoading:false,
    total:0,
}


const mutations = {
    SET_CATEGORY(state,category){
        state.category = category
    },
    FETCH_START(state){
        state.isLoading = true
    },
    FETCH_END(state){
        state.isLoading = false
    },
    SET_TOTAL(state,total){
        state.total = total
    }
}

const actions = {
    getAllCategory({commit},param){
        commit('FETCH_START')
        admin_categories_get({params:param}).then(({data})=>{
            commit('SET_CATEGORY',data.records)
            commit('SET_TOTAL',data.total)
            commit('FETCH_END')
        }).catch(error=>{
            console.log(error.response)
            throw new Error(error)
        })
    },
    postCategory(commit,data){
        return new Promise((resolve, reject)=>{
            admin_categories_post({ "params": { name: data } })
            .then(({ data }) => {
              resolve(data)
            })
            .catch(error => {
                reject(error)
            });
        })
    },
    changeCategory(commit,data){
        return new Promise((resolve, reject)=>{
            admin_categories_put({ "data":  data  })
            .then(({ data }) => {
              resolve(data)
            })
            .catch(error => {
                reject(error)
            });
        })
    },
    deleteCategory(commit,id){
        return new Promise((resolve,reject)=>{
            admin_categories_delete({ "params": { id } }).then(({data}) =>{
                resolve(data)
            })
            .catch(error => {
                reject(error)
            });
        })
    }
}


export default {
    state,
    mutations,
    actions
}