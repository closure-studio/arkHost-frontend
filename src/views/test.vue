<template>
  <div class="flex flex-col w-1/2">
    <div class="flex whitespace-nowrap items-center justify-between">
      <div class="text-lg">关卡检索：<input class="ark-input" v-model="keyword"></div>
      <button class="btn btn-info px-7" @click="search">查找</button>
    </div>
    <div class="divider">检索结果</div>
    <span v-for="k in _search">{{k}}</span>
  </div>
</template>
<script setup lang="ts">
  import {ref} from "vue";
  import {TableStage} from "../plugins/axios";
  const stageTable = ref<any>({})
  const keyword = ref('')
  const _search = ref({})
  TableStage().then((resp: any) => {
    stageTable.value = resp
    // for (let k in resp.stages) {
    //   if (!k.includes('camp') && !k.includes('#f#') && !k.includes('bossrush') && !k.includes('act1lock_a') && !k.includes('act17d7_01') && !k.includes('lt_') && !k.includes('tr_')) {
    //     if (resp.stages[k]['apCost'] !== 0) {
    //       let items = []
    //       for (let item of resp.stages[k]['stageDropInfo']['displayRewards']) {
    //         if (item['dropType'] === 2 || item['dropType'] === 3) {
    //           items.push(item['id'])
    //         }
    //       }
    //       if (items.length > 0) {
    //         stageTable.value[k] = {
    //           name: resp.stages[k]['name'],
    //           code: resp.stages[k]['code'],
    //           ap: resp.stages[k]['apCost'],
    //           items: items
    //         }
    //       }
    //     }
    //   }
    // }
  })
  const search = () => {
    if (typeof stageTable.value.length === 'undefined') {
      _search.value = {}
    }
    _search.value = filter(stageTable.value,  (item: Stage) => {
      if (item.name.includes(keyword.value) || item.code.includes(keyword.value)) {
        return item
      }
    })
  }
  const filter = (obj: any, func: Function) => {
    let ret = {} as any;
    for(let key in obj) {
      if (obj.hasOwnProperty(key) && func(obj[key], key)) {
        ret[key] = obj[key];
      }
    }
    return ret;
  }
interface Stage {
  name: string
  code: string
  ap: number
  items: number[]
}
</script>