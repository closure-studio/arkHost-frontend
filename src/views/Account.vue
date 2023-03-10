<template>
  <h1 class="text-4xl font-bold mt-2 mb-6">身份认证</h1>
  <div class="divider font-bold text-info">请将下方内容复制并发送至官方群组</div>
  <div class="alert shadow-lg">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span class="text-primary">verifyCode:{{code}}</span>
    </div>
  </div>
  <div class="divider font-bold text-info">
    <span class="countdown text-xl w-full justify-center">
      <span class="font-mono" :style="`--value:${ Math.ceil(ts / 60) };`"></span> :
      <span class="font-mono" :style="`--value:${ ts % 60 };`"></span>
    </span>
  </div>
  <div class="absolute bottom-2 grid grid-cols-2 gap-2 left-2 right-2">
    <a href="https://jq.qq.com/?_wv=1027&k=FiJjOEe8" class="btn btn-primary btn-block">加入官方群①</a>
    <a href="https://jq.qq.com/?_wv=1027&k=8C3DZiQM" class="btn btn-primary btn-block">加入官方群②</a>
  </div>
</template>

<script lang="ts" setup>
  import {apiBingQQ} from "../plugins/axios";
  import {ref} from "vue";
  import {createToast} from "mosha-vue-toastify";

  const code = ref('')
  const ts = ref(0)
  apiBingQQ().then((res: any) => {
    if (res.code === 0){
      code.value = res.message
      createToast(res.message, {
        showIcon: true,
        type: "error",
        transition: "bounce",
      });
    }

    if (res.code === 1) {
      code.value = res?.data?.verifyCode
      ts.value = res?.data?.expireTimestamp - Math.ceil(Date.now() / 1000)
      setInterval(() => {
        ts.value--
      }, 1000)
    }

    if (res.code === 2) {
      code.value = "你已绑定 QQ"
      createToast("你已绑定 QQ", {
        showIcon: true,
        type: "success",
        transition: "bounce",
      });
    }
  })

</script>