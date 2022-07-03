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
          <input class="qbz-input" />
          <span class="text-info text-lg">密码：</span>
          <input class="qbz-input" />
        </div>
        <button class="btn btn-success btn-block mt-6">登录</button>
      </div>
    </div>
    <div class="basis-full md:basis-3/4">
      <div class="ark-card">
        <span class="card-title text-info justify-center">托管列表</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {apiAnnounce} from "../plugins/axios";
import {ref} from "vue";
import {createToast} from "mosha-vue-toastify";
import Select from "../components/element/Select.vue";
import Loading from "../components/loading.vue";

// 获取公告
const ann = ref('加载中...')
const load = ref(true)
apiAnnounce().then((res) => {
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

const _plat = ref('安卓')
const platform = ['安卓', 'IOS', 'B服']
const onPlat = (val) => {
  _plat.value = val;
}
</script>