import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Disc from '../views/Disc.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home/disc/:id',
        name: 'disc',
        component: Disc
      }
    ]
  },
  // {
  //   path: '/singer',
  //   component: Singer,
  //   children: [
  //     // {
  //     //   path: '/singer/singerHome',
  //     //   name: 'singerHome',
  //     //   component: () => import('../views/singerHome.vue')
  //     // }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
