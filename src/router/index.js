import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import logging from '@/components/logging/logging'
import createArticle from '@/components/article/createArticle'
import articles from '@/components/article/Articles'
import editArticle from '@/components/article/editArticle'
import category from '@/components/category/category'
import comments from '@/components/comments/comments'
import user from '@/components/about-me/user'
import about from '@/components/about-me/about'

Vue.use(Router)

export default new Router({
  base:'/admin/',
  routes: [
    {
      path: '/home',
      component: home,
      children:[
        {path:'',component:logging},
        {path:'category',component:category},
        {path:'comments',component:comments},
        {path:'about',component:about},
        {path:'user',component:user},
      ]
    },
    {
      path: '/article',
      component: home,
      name:'article',
      children:[
        {path:'createArticle',component:createArticle,name:'createArticle'},
        {path:'articles',component:articles,name:'Articles'},
        {path:'editArticle/:id',component:editArticle,name:'editArticle',props: true}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path:'/',
      redirect:{ path: '/home' }
    }
  ]
})
