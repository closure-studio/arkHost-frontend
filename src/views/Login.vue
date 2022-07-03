<template>
  <div
    class="flex flex-col max-w-md mx-auto rounded-md bg-base-200 shadow-2xl relative"
  >
    <loading v-if="load" />
    <div class="p-6 sm:p-10">
      <div class="mb-6 text-center">
        <h1 class="my-3 text-4xl font-bold text-info">登录</h1>
      </div>
      <div class="space-y-8">
        <div class="space-y-4 text-info font-bold">
          <div>
            <label class="block mb-2">账号</label>
            <input
              type="email"
              v-model="email"
              placeholder="邮箱"
              class="qbz-input mb-2"
            />
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <label for="password">密码</label>
            </div>
            <input
              type="password"
              v-model="password"
              placeholder="请输入密码"
              class="qbz-input mb-2"
            />
          </div>
        </div>
        <div class="space-y-2">
          <button @click="login" class="btn px-8 py-3 btn-block btn-info">
            登录
          </button>
          <p class="px-6 text-sm text-center text-gray-400">
            Powered by @skadiD
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { apiLogin, apiReLogin } from "../plugins/axios";
import { getCurrentInstance, ref } from "vue";
import { createToast } from "mosha-vue-toastify";
import { useRoute, useRouter } from "vue-router";
import { userStore } from "../store/user";
import Loading from "../components/loading.vue";
import { validate } from "../plugins/function";
import { storeToRefs } from "pinia/dist/pinia";

const email = ref("");
const password = ref("");
const load = ref(false);

const router = useRouter();
const route = useRoute();
const _user = userStore();
const instance = getCurrentInstance();
const { user } = storeToRefs(_user);

if (user.value.isLogin) {
  load.value = true;
  apiReLogin(user.value.token).then((resp) => {
    if (resp.code) {
      createToast("你已登录，自动跳转中", {
        showIcon: true,
        type: "success",
        transition: "bounce",
      });
      _user.login(resp.data.token);
      instance.appContext.config.globalProperties.$axios.defaults.headers[
        "Authorization"
      ] = resp.data.token;
      router.push(route.query.redirect ? route.query.redirect : "/home");
      return;
    }
    load.value = false;
    createToast("自动登录异常，请重新登录", {
      showIcon: true,
      type: "warning",
      transition: "bounce",
    });
  });
}

const login = () => {
  load.value = true;
  if (!validate(email.value, password.value)) {
    load.value = false;
    createToast("错误的提交信息", {
      showIcon: true,
      type: "warning",
      transition: "bounce",
      timeout: 1200,
    });
    return;
  }
  createToast("少女折寿中", {
    showIcon: true,
    type: "info",
    transition: "bounce",
    timeout: 1500,
  });
  apiLogin(`${email.value}/${password.value}`).then((resp) => {
    load.value = false;
    if (resp.code) {
      createToast("登录成功，欢迎来到可露希尔的午夜商超", {
        showIcon: true,
        type: "success",
        transition: "bounce",
      });
      _user.login(resp.data.token);
      instance.appContext.config.globalProperties.$axios.defaults.headers[
        "Authorization"
      ] = resp.data.token;
      router.push(route.query.redirect ? route.query.redirect : "/home");
      return;
    }
    createToast("错误的登录信息：" + resp.message, {
      showIcon: true,
      type: "info",
      transition: "bounce",
    });
  });
};
</script>
