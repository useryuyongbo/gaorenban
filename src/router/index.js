import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/login'    //重定向
  },
  {
    path: '/login',
    name: 'login',      //进入到login
    component: () => import('../views/login.vue') //路由懒加载
    // component:login
  },
  {
    path: '/home',
    name: 'home',
    component: ()=>import('../views/Home'),
    redirect: '/home/index',
    children:[
      {
        path: 'index',
        name: 'index',      //进入到首页
        component: () => import('../views/home/Index')
      },
      {
        path: 'infoStatis',
        name: 'infoStatis',      //人才信息管理
        component: () => import('@/views/SubView'),
        children:[
          {
            path:'userinfo',
            component: () => import('../views/infoStatis/Userinfo')
          },{
            path: 'personinfo',
            component: () => import('../views/infoStatis/Personinfo')
          }
        ]
      },
      {
        path: 'expenditure',
        name: 'expenditure',      //经费申报
        component: () => import('@/views/SubView'),
        children:[
          {
            path:'go',
            component: () => import('../views/home/Go')
          },{
            path:'gocopy',
            component: () => import('../views/home/Gocopy.vue')
          },{
            path:"gocopyshenhe",
            component:()=>import('../views/home/Gocopycheck.vue')
          }
        ]
      },
      {
        path: 'assess',
        name: 'aasses',  //人才考核
        component: () => import('@/views/SubView'),
        children:[
          {
            path:'assessInfo',
            component: () => import('../views/assess/AssessInfo')
          },{
            path: 'subAssess',
            component: () => import('../views/assess/SubAssess')
          },{
            path: 'personAssess',
            component: () => import('../views/assess/PersonAssess')
          }
        ]
      },
      {
        path: 'declare',
        name: 'declare',      //人才申报
        component: () => import('@/views/SubView'),
        children:[
          {
            path:'declareInfo',
            component: () => import('../views/declare/DeclareInfo')
          },{
            path: 'subDeclare',
            component: () => import('../views/declare/SubDeclare')
          },{
            path: 'personDeclare',
            component: () => import('../views/declare/PersonDeclare')
          }
        ]
      },
      {
        path: 'record',
        name: 'record',      //进入到档案管理
        component: () => import('../views/home/Record')
      },
      {
        path:'journal',//日志
        name:'journal',
        component:()=>import('../views/home/journal')
      },
      {
        path:'project',//项目申报
        name:'project',
        component:()=>import('@/views/SubView'),
        children:[
          {
            path:'projectapplication',
            component: () => import('../views/home/projectapplication')
          },{
            path: 'projectinf',
            component: () => import('../views/home/projectinf')
          },,{
            path: 'projectDeclare',
            component: () => import('../views/home/projectmaterials')
          }
        ]
      },
      {
        path:'treatment',//待遇兑现
        name:'treatment',
        component:()=>import('../views/home/treatment')
      },
      {
        path:'experttable',//专家信息表
        name:'experttable',
        component:()=>import('../views/home/experttable')
      }

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// const whiteList = ['/login']
// //路由守卫
// router.beforeEach((to, from, next) => {
//   console.log("asdas")
//   console.log(store.state)
//   if (store.getters.token) {
//     if (to.path === '/login') {
//       next('/')
//     } else {
//       next()
//     }
//   } else {
//     if (whiteList.includes(to.path)) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

export default router
