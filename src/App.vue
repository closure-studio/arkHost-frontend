<template>
  <component is="layout">
    <router-view />
  </component>
</template>
<script setup>
import { load } from "./plugins/theme";
import { isLarge } from "./plugins/common";
import { getCurrentInstance, onMounted } from "vue";
import { userStore } from "./store/user";
import { storeToRefs } from "pinia/dist/pinia";
load();
const _user = userStore();
const { user } = storeToRefs(_user);

const $axios =
  getCurrentInstance().appContext.config.globalProperties.$axios.defaults;
if (user.value.isLogin) {
  $axios.headers["Authorization"] = user.value.token;
}

onMounted(() => {
  isLarge.value = document.documentElement.clientWidth >= 1024;
  window.onresize = () => {
    isLarge.value = document.documentElement.clientWidth >= 1024;
  };
});
</script>
