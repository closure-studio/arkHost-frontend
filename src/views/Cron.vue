<template>
  <span class="text-3xl font-bold text-info">服务器节点</span>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 mt-2">
    <div class="ark-card hover:ark-pro flex" v-for="k in nodeList">
      <span class="text-3xl text-white font-bold flex items-center justify-between mb-1">
        <span class="mr-2">
          #{{ k.number }}
          <span class="text-2xl text-primary">{{k.name}}</span>
        </span>
        <div class="badge p-3" :class="isOffline(k.update_UTCTime) ? 'badge-info' : 'badge-primary' ">
          {{isOffline(k.update_UTCTime) ? '离' : '在' }}线
        </div>
      </span>
      <span class="text-xl">开机时间: {{ formatDate(k.boot_UTCTime, true) }}</span>
      <span class="text-xl">更新时间: {{ formatDate(k.update_UTCTime, true) }}</span>
      <div class="divider my-2 text-primary">服务器状态</div>
      <span class="text-xl">CPU: {{ k.cpu.toFixed(2) }}% (Avg: {{ k.cpuAvg.toFixed(2) }}%)</span>
    </div>
  </div>

</template>

<script lang="ts" setup>
  import {apiCron} from "../plugins/axios";
  import {ref} from "vue";
  import {formatDate} from '../plugins/function.js'
  const nodeList = ref<Node[]>([])
  apiCron().then((resp: any) => {
    nodeList.value = resp.data
  })
  const isOffline = (ts: number) => {
    return new Date().valueOf() / 1000 - ts > 300
  }
</script>
