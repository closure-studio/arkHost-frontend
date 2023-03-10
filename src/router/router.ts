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
    },{
      path: "/Login",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta: { title: "账号登录", noAuth: true },
    },{
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
      meta: { title: "主页" },
    },{
      path: "/details/:account/:platform",
      name: "details",
      component: () => import("../views/Details.vue"),
      meta: { title: "账号信息" },
    },{
      path: "/Register",
      name: "Register",
      component: () => import("../views/Register.vue"),
      meta: { title: "账号注册", noAuth: true },
    },{
      path: "/test",
      name: "test",
      component: () => import("../views/test.vue"),
      meta: { title: "test", noAuth: true },
    },{
      path: "/cron",
      name: "cron",
      component: () => import("../views/Cron.vue"),
      meta: { title: "状态监控"},
    },{
      path: "/admin",
      name: "admin",
      component: () => import("../views/Admin.vue"),
      meta: { title: "后台管理"},
    },{
      path: "/dashboard/:account/:platform",
      name: "dashboard",
      component: () => import("../views/DashBoard.vue"),
      meta: { title: "仓库统计V2"},
    },{
      path: "/account",
      name: "account",
      component: () => import("../views/Account.vue"),
      meta: { title: "账号认证"},
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
