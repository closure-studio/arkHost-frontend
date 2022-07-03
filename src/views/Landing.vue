<template>
  <div
    class="max-w-screen-xl px-4 py-10 mx-auto lg:h-screen lg:flex lg:flex-col"
  >
    <div class="max-w-3xl mx-auto text-center">
      <h1
        class="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 flex flex-col"
      >
        <span>可露希尔云挂机平台</span>
        <span class="sm:block text-xl lg:text-2xl">
          基于云手机全自动远程托管
        </span>
      </h1>
      <div class="flex justify-center gap-4 mt-8">
        <router-link
          :to="user.isLogin ? '/home' : '/login'"
          class="btn btn-info btn-outline px-12 py-3 w-auto active:text-opacity-75"
        >
          {{ user.isLogin ? '进入面板' : '用户登录' }}
        </router-link>
        <a
          href="https://jq.qq.com/?_wv=1027&k=FiJjOEe8"
          class="btn btn-success btn-outline px-12 py-3 w-auto active:text-opacity-75"
        >
          交流群
        </a>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-8 lg:gap-16 lg:grid-cols-2 mt-8">
      <div
        class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-full lg:order-last"
      >
        <img
          class="absolute inset-0 object-cover w-full h-full"
          src="https://ak.nai-ve.com/img/login.58a0ee4e.webp"
          alt="skadiD here"
        />
      </div>
      <div class="lg:py-24">
        <h2 class="text-3xl font-bold sm:text-4xl">开始智能托管之旅</h2>
        <p class="mt-4 text-gray-600">skadiD真好看</p>
        <a
          class="btn btn-success px-8 py-3 mt-8"
          href="https://github.com/closure-studio/ReadMe"
        >
          <span class="text-sm font-medium"> 在 Github 上 Star </span>
          <svg
            class="w-5 h-5 ml-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </div>
    <div class="footer footer-center mt-10 bg-base-300 text-base-content">
      © 2021-2022 可露希尔云挂机平台 Designed by skadiD
      <span class="text-gray-500">Powerful by daisyUi</span>
    </div>
  </div>
</template>
<script setup>
  import {userStore} from "../store/user";
  import {storeToRefs} from "pinia/dist/pinia";

  const _user = userStore()
  const {user} = storeToRefs(_user)


</script>
