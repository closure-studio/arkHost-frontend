<template>
  <div class="flex justify-between">
    <div class="text-4xl font-bold flex flex-col">
      仓库统计
      <span class="text-xl">首次使用或更新请<span class="text-primary" @click="request">【识别仓库】</span></span>
      <span class="text-primary/60 text-lg">最后识别时间：{{formatDate(gameInfo.lastFreshTs, true)}}</span>
    </div>
    <div v-if="isLarge">
      <button class="btn btn-primary btn-outline px-7" @click="request">识别仓库</button>
      <button class="btn btn-primary px-10 ml-3" @click="router.back()">返回</button>
    </div>
  </div>
  <div v-if="!isLarge" class="my-3 flex justify-between">
    <button class="btn btn-primary btn-outline px-7" @click="request">识别仓库</button>
    <button class="btn btn-primary px-10" @click="router.back()">返回</button>
  </div>
  <div class="grid ark-itemGrid md:gap-3">
    <div class="flex flex-col items-center" v-for="(v, k) in gameInfo.inventory" v-show="v">
      <div class="w-16 min-w-[4.5rem] lg:min-w-[5rem] rounded-full">
        <img :src="'//ak.dzp.me/dst/items/' + (items[k]?.icon || 'default') + '.webp'" :alt="items[k]?.name"/>
      </div>
      <span class="text-xl font-bold">{{v}}</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {ref} from "vue";
  import {apiDetails, apiReqOCR} from "../plugins/axios";
  import {useRoute, useRouter} from "vue-router";
  import {createToast} from "mosha-vue-toastify";
  import {formatDate} from "../plugins/function.js";
  import {items} from "../store/data";
  import {isLarge} from "../plugins/common";
  const route = useRoute()
  const router = useRouter()
  const _account = route.params.account as string
  const _platform = route.params.platform as string
  const gameInfo = ref<Details>({} as Details);
  const request = () => {
    apiReqOCR(_account, _platform).then((resp: any) => {
      console.log(resp)
      createToast(resp.message, {
        showIcon: true,
        type: resp.code ? "success" : "info",
        transition: "bounce",
      });
    })
  }
  const get = () => {
    apiDetails(_account, _platform).then((resp: any) => {
      gameInfo.value = resp.data as Details || {};
    })
  }
  get()
</script>