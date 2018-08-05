import router from './router'
import store from './store'
import {getToken} from './auth'
import {Message} from 'iview'

router.beforeEach(async (to,from,next)=>{
    if(!getToken()){
        if(to.path === '/login')//login不用权限
            next()
        else
            next('/login')
    }else{
        if (store.getters.roles !== 'ADMIN'){
           await store.dispatch('getUserInfo').catch((response)=>{
                store.dispatch('front_logout').then(()=>{
                   console.log(response)
                    next('/login')
                })
            })
        }

        if (to.path === '/login') //登陆后不能回到登录页
            next({ path: '/home' })
        else
            next()
    }
})

