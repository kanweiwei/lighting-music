import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/home",
    component: () => import("@/views/home/index.vue")
  },
  {
    //歌单详情
    path: '/songListDetail/:id',
    name: 'songListDetail',
    component: () => import('@/components/songListDetail.vue')
  },
  {
    //更多歌单
    path: '/songListAll',
    name: 'songListAll',
    component: () => import('@/components/songListAll.vue')
  },
  {
    //更多歌单
    path: '/searchDetail/:kw',
    name: 'searchDetail',
    component: () => import('@/views/home/searchDetail.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue'),
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      },

    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
