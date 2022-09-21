<template>
  <div class="ark-card relative">
    <span class="card-title text-info">平台公告</span>
    <span class="text-lg mt-2" style="white-space: break-spaces"> {{ ann }}</span>
    <loading v-if="load" />
  </div>
  <div class="flex flex-row mt-4 flex-wrap md:flex-nowrap">
    <div class="basis-full md:basis-1/3 md:mr-4 mb-4">
      <div class="ark-card" style="overflow: unset">
        <div class="space-y-1.5">
          <span class="card-title text-info justify-center">快速开始</span>
          <span class="text-info text-lg">所属服务器：</span>
          <Select :value="_plat" :data="platform" v-on:valueSelect="onPlat"/>
          <span class="text-info text-lg">账号：</span>
          <input class="ark-input" />
          <span class="text-info text-lg">密码：</span>
          <input class="ark-input" />
        </div>
        <button class="btn btn-success btn-block mt-6">登录</button>
      </div>
    </div>
    <div class="basis-full md:basis-3/4">
      <div class="ark-card ark-pro">
        <span class="card-title text-info justify-center">托管列表</span>
      </div>
      <div class="ark-card mt-3">
        <div class="grid ark-grid gap-4">
          <div class=" rounded-md px-4 py-5 ark-cardItem shadow-3xl" v-for="k in list">
            <div class="flex justify-between items-center">
              <span class="text-lg">账号：{{k.config.account.replace(/(\d{3})\d{6}(\d{2})/, '$1****$2')}}</span>
              <div class="badge p-3" :class="k.config.platform === 1 ? 'badge-primary' : 'badge-info'">
                {{k.config.platform === 1 ? '官' : 'B'}}服
              </div>
            </div>
            <div class="divider text-primary">详细信息</div>
            <div class="flex justify-between">
              当前状态：<span :class="statusColor(k.status.code)">{{k.status.text}}</span>
            </div>
            <div class="flex justify-between mt-2">
              <button class="btn btn-outline btn-warning btn-sm w-[45%] h-10">暂停</button>
              <button class="btn btn-outline btn-error btn-sm w-[45%] h-10">删除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {apiAnnounce, apiListGame} from "../plugins/axios";
import {ref} from "vue";
import {createToast} from "mosha-vue-toastify";
import Select from "../components/element/Select.vue";
import Loading from "../components/loading.vue";

// 获取公告
const ann = ref('加载中...')
const load = ref(true)
const list = ref<GameInfo[]>([])
apiAnnounce().then((res: any) => {
  load.value = false
  if (res.code){
    ann.value = res.data
  } else {
    createToast('读取公告失败', {
      showIcon: true,
      type: 'danger',
      transition: 'bounce',
    })
  }
})
apiListGame().then((res: any) => {
  list.value = res.data
})
const _plat = ref('官服')
const platform = ['官服', 'B服']
const onPlat = (val: string) => {
  _plat.value = val;
}
const statusColor = (code: number) => {
  switch (code) {
    case -1:
      return 'text-red-500'
    case 0:
      return 'text-orange-500'
    case 1:
      return 'text-blue-500'
    case 2:
      return 'text-green-500'
    case 999:
      return 'text-purple-600'
    default:
      return ''
  }
}
interface GameInfo {
  config: {
    account: string
    platform: number
    isPause: boolean
  },
  status: {
    code: number
    text: string
  }
}
</script>