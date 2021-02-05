import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from '@/components/Content'
import Notfound from '@/components/Notfound'
import Coin from '@/components/Coin'


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
    path: '*',
    name: '404',
    component: Notfound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
