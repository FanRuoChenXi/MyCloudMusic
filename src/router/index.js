import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/itemMusic",
    name: "itemMusic",
    component: () => import("../views/ItemMusic.vue"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/user",
    name: "user",
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next();
      } else {
        next("/login");
      }
    },
    component: () => import("../views/InfoUser.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from) => {
  if (to.path == "/login") {
    store.state.isFooter = false;
  } else {
    store.state.isFooter = true;
  }
});
export default router;
