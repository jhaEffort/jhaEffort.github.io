import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
   mode:'history',
   base:'/',
   routes:[
       {
           path:'/',
           name:'首页',
           component: ()=> import('../pages/main.vue'),
           redirect:'list',
           children:[
               {
                   path:'',
                   name:'',
                   component:()=> import(/* webpackChunkName: "list-index" */ '../pages/list/index.vue'),
                   meta:{
                    title: '列表',
                   }
               }
           ]
       },
       {
           path:'/my',
           name:'my',
           component:()=> import(/*webpackChunkName: "my"*/ '../pages/my/index.vue'),
           meta:{
               title:'个人中心'
           }

       }
   ]
})