import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Disc from '@/views/Disc.vue'
import Mv from '@/views/mv.vue'
import My from '@/views/my.vue'
import Singer from '@/views/singer.vue'
import singerHome from '@/views/singerHome.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: ':id',
        component: Disc
      }
    ]
  },
  {
    path: '/mv',
    name: 'mv',
    component: Mv
  },
  {
    path: '/my',
    name: 'my',
    component: My
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: '/singer/singerHome',
        name: 'singerHome',
        component: singerHome
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
