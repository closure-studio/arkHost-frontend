<template>
  <div class="flex h-screen font-roboto">
    <div class="flex-1 flex flex-col overflow-hidden bg-base-300">
      <div class="m-5" :class="{ 'm-0': !isLarge }">
        <Header />
      </div>
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="mx-auto px-5 py-2">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import Header from "./Header.vue";
import { isLarge } from "../../plugins/common";
</script>
