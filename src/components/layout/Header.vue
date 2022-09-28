<template>
  <div class="navbar bg-base-100 shadow-lg" :class="{ 'rounded-lg': isLarge }">
    <div class="navbar-start">
      <div class="btn btn-circle btn-ghost" @click="jump">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      <div class="navbar-center text-lg text-info ml-2" v-if="isLarge">
        <div class="text-lg breadcrumbs">
          <ul>
            <li><router-link to="/">可露希尔</router-link></li>
            <li>
              <a>{{ $route.meta["title"] }} </a>
            </li>
          </ul>
        </div>
        <div class="lg:hidden text-xl" >
          {{ $route.meta["title"] }}
        </div>
      </div>
    </div>
    <div class="navbar-center text-info font-bold text-xl">
      <div v-if="!isLarge">
        {{ $route.meta["title"] }}
      </div>
    </div>
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-12 rounded-full">
            <img src="//ak.dzp.me/dst/avatar/ASSISTANT/npc_007_closure.webp" alt="closure"/>
          </div>
        </label>
        <div tabindex="0" class="mt-2 p-3 shadow-lg dropdown-content bg-base-300 rounded-md text-system w-52 flex flex-col ">
          <button class="btn btn-block btn-primary" @click="logout">退出登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isLarge } from "../../plugins/common";
import { userStore } from "../../store/user";
import { createToast } from "mosha-vue-toastify";
import {useRouter} from "vue-router";
const user = userStore();
const router = useRouter()
const logout = () => {
  user.logout();
  createToast("退出成功", {
    showIcon: true,
    type: "success",
    transition: "bounce",
  });
};
const jump = () => {
  router.push("/home")
}
</script>
