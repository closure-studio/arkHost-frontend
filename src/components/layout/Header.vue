<template>
  <div class="navbar bg-base-100 shadow-lg" :class="{ 'rounded-lg': isLarge }">
    <div class="navbar-start">
      <div class="btn btn-circle btn-ghost">
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
              <a>{{ $route.meta["title"] }}</a>
            </li>
          </ul>
        </div>
        <div class="lg:hidden text-xl">
          {{ $route.meta["title"] }}
        </div>
      </div>
    </div>
    <div class="navbar-center text-info font-bold">
      <div v-if="!isLarge">
        <div class="text-lg breadcrumbs">
          <ul>
            <li><a>可露希尔</a></li>
            <li>
              <a>{{ $route.meta["title"] }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const dropdownOpen = ref(false);
import { isLarge } from "../../plugins/common";
import { userStore } from "../../store/user";
import { createToast } from "mosha-vue-toastify";
const user = userStore();
const logout = () => {
  user.logout();
  createToast("退出成功", {
    showIcon: true,
    type: "success",
    transition: "bounce",
  });
};
</script>
