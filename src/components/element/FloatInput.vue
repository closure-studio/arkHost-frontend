<template>
  <div class="relative">
    <input
      type="text"
      id="floating_outlined"
      class="input px-2.5 pb-3.5 pt-4 w-full text-sm text-info bg-transparent rounded-lg border-gray-400 focus:border-info focus:outline-none focus:ring-0 peer"
      placeholder=""
      v-model="val['value']"
    />
    <label
      for="floating_outlined"
      class="absolute text-sm text-gray-400 duration-200 -translate-y-4 scale-75 top-1.5 z-10 origin-[0] bg-gray-200 px-1 peer-focus:text-info peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-90 peer-focus:-translate-y-4 left-2"
      >{{ title }}</label
    >
  </div>
</template>
<script setup>
defineProps({
  title: String,
  val: Object,
})
</script>
