import { createRouter, createWebHistory } from "vue-router";
import { createToast } from "mosha-vue-toastify";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "",
      component: () => import("../views/Landing.vue"),
      meta: { title: "平台首页", noAuth: true },
    },
    {
      path: "/Login",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta: { title: "账号登录", noAuth: true },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
      meta: { title: "主页" },
    }
  ],
});
router.beforeEach((to, from, next) => {
  const udata = JSON.parse(localStorage.getItem("arkhost_user") || "{}");
  if (
    to.matched.some((record) => !record.meta.noAuth) &&
    !udata?.["user"]?.["isLogin"]
  ) {
    createToast("请先登录", {
      showIcon: true,
      type: "info",
      transition: "bounce",
    });
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
  next();
});
