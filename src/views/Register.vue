<template>
  <div
    class="flex flex-col max-w-md mx-auto rounded-md bg-base-200 shadow-2xl relative"
  >
    <loading v-if="load">
      <div class="flex items-center justify-center">
        <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin-slow border-info"/>
      </div>
    </loading>
    <div class="p-6 sm:p-10">
      <div class="mb-6 text-center">
        <h1 class="my-3 text-4xl font-bold text-info">注册</h1>
      </div>
      <div class="space-y-8">
        <div class="space-y-4 text-info font-bold">
          <div>
            <label class="block mb-2">登录账号</label>
            <input
              type="email"
              v-model="reg.email"
              placeholder="邮箱"
              class="ark-input mb-2"
            />
          </div>
          <div>
            <div class="flex justify-between mb-2">
              <label for="password">登录密码</label>
            </div>
            <input
              type="password"
              v-model="reg.password"
              placeholder="请输入密码"
              class="ark-input mb-2"
            />
          </div>
        </div>
        <div class="space-y-2">
          <button @click="register" class="btn px-8 py-3 btn-block btn-info">
            注册
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
import {apiLogin, apiRegister, apiReLogin} from "../plugins/axios";
import { getCurrentInstance, ref,watch } from "vue";
import { createToast } from "mosha-vue-toastify";
import { useRoute, useRouter } from "vue-router";
import { userStore } from "../store/user";
import Loading from "../components/loading.vue";
import { validate } from "../plugins/function";
import { storeToRefs } from "pinia/dist/pinia";
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-vue-v3';


const { data, error, isLoading, getData } = useVisitorData(
  { extendedResult: true },
  // Set to true to fetch data on mount
  { immediate: false }
);
watch(data, (currentData) => {
  if (currentData) {
    if (currentData.confidence.score) > 0.7{
      instance.appContext.config.globalProperties.$axios.defaults.headers["VisitorId"] = currentData.visitorId
    }
    // Do something with the data
    console.log(currentData);
  }
});

async getData();


const reg = ref({
  email: '',
  password: ''
})
const load = ref(false);

const router = useRouter();
const route = useRoute();
const _user = userStore();
const instance = getCurrentInstance();
const { user } = storeToRefs(_user);

const register = () => {
  load.value = true;
  if (reg.value.email === "" || reg.value.password === "") {
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
  apiRegister(reg.value).then((resp) => {
    load.value = false;
    if (resp.code) {
      createToast("注册成功，欢迎来到可露希尔的午夜商超", {
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
