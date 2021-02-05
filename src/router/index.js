import Vue from 'vue'
import VueRouter from 'vue-router'
import Content from '@/components/Content'
import Notfound from '@/components/Notfound'
import Notfound from '@/components/Bitcoin'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Content',
    component: Content
  },
  {
    path: '/coin',
    name: 'Bitcoin',
    component: Bitcoin
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
