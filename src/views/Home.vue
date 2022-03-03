<style scoped>
/* From cssbuttons.io by @gagan-gv */
</style>

<template>
  <div>
    <div class="d-flex align-center my-4 mt-9 flex-column">
      <img
          src="@/assets/logo.png"
          height="128px"
          class="mt-5"
      />
      <span class="text-h4">可露希尔云挂机</span>
      <span class="subtitle-1 text--secondary">云手机全自动远程托管</span>
    </div>
    <div class="d-flex justify-space-around pt-9">
      <v-btn x-large class="px-9 py-2" tile color="green" outlined @click="$router.push('/login')">登录</v-btn>
      <v-btn x-large class="px-9 py-2" tile color="orange" outlined @click="$router.push('/register')">注册</v-btn>
    </div>
  </div>
</template>
