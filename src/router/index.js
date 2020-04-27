import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/index',
    name: 'index',
    redirect: 'messageList',
    component: () => import('../views/index/home.vue'),
    children:[
      {
        path: 'messageList',
        name: 'messageList',
        component: () => import('../views/message/index.vue'),
        children: [
          {
            path: 'chat',
            name: 'chat',
            component: () => import('../views/chat/chat.vue'),
          }
        ]
      },
      {
        path: 'contactlist',
        name: 'contactList', 
        component: () => import('../views/contact/contact.vue')
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{


  let site = ['/login']
 // console.log(store.state.user.userInfo)
  if(!site.includes(to.path)){
    
      if(store.state.user.userInfo.username){
       // console.log('已经登录')
        next()
      }else{
        next('/login')
      }
  }else{
    next()
  }
   
})
export default router
