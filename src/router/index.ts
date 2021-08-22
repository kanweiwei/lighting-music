import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("@/views/home/index.vue"),
  },
  {
    //歌单详情
    path: "/songListDetail/:id",
    name: "songListDetail",
    component: () => import("@/views/songListDetail/index.vue"),
  },
  {
    path: "/comment/:type/:id",
    name: "comment",
    component: () => import("@/views/CommentPage.vue"),
  },
  {
    //更多歌单
    path: "/songListAll",
    name: "songListAll",
    component: () => import("@/views/songListAll/index.vue"),
  },
  {
    //更多歌单
    path: "/searchDetail/:kw",
    name: "searchDetail",
    component: () => import("@/views/home/searchDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
