import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from '@/view/Content'
import Notfound from '@/view/Notfound'
import Coin from '@/view/Coin'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Content',
    component: Content
  },
  {
    path: '/coin',
    name: 'Coin',
    component: Coin
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: Notfound
  },
  {
    path: '*',
    redirect: "/notfound", 
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
