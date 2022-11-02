<template>
  <span class="text-3xl font-bold">一键改密码</span>
  <div class="flex flex-row whitespace-nowrap items-center mt-3 gap-4 flex-wrap lg:flex-nowrap">
    <span class="text-info text-2xl">账号:</span>
    <input class="ark-input" v-model="p.username" />
    <span class="text-info text-2xl ml-4">密码:</span>
    <input class="ark-input" v-model="p.password" />
  </div>
  <button class="btn btn-block btn-primary mt-4" @click="reset">提交</button>
</template>
<script setup>
  import {ref} from "vue";
  import {adminResetPasswd} from "../plugins/axios";
  const p = ref({
    username: '',
    password: ''
  })
  const reset = () => {
    adminResetPasswd(p.value.username, p.value.password).then((resp) => {
      console.log(resp)
    })
  }
</script>