<template>
  <div class="flex flex-col md:w-1/2">
    <div class="flex whitespace-nowrap items-center justify-between">
      <div class="relative">
        <input type="text" id="f_1" class="float-input peer" placeholder=" " v-model="keyword"/>
        <label for="f_1" class="float-input-text">理智保留</label>
      </div>
      <button class="btn btn-info px-7" @click="search">查找</button>
    </div>
    <div class="mt-2 gap-2 flex">
      当前战斗队列：
      <div class="badge badge-primary p-3" v-for="k in battleMap">{{ k }}</div>
    </div>
    <div class="divider">检索结果</div>
    <div v-for="(v, k) in searchRes" class="ark-card my-2 lg:hover:translate-x-6 duration-500 group " @click="select(k)">
      <div class="absolute ark-mapItem md:ark-mapItem-md lg:ark-mapItem-lg">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 460 460" xml:space="preserve" fill="currentColor">
            <path class="hidden group-hover:flex" d="M230,0C102.975,0,0,102.975,0,230s102.975,230,230,230s230-102.974,230-230S357.025,0,230,0z M268.333,377.36 c0,8.676-7.034,15.71-15.71,15.71h-43.101c-8.676,0-15.71-7.034-15.71-15.71V202.477c0-8.676,7.033-15.71,15.71-15.71h43.101 c8.676,0,15.71,7.033,15.71,15.71V377.36z M230,157c-21.539,0-39-17.461-39-39s17.461-39,39-39s39,17.461,39,39 S251.539,157,230,157z"></path>
        </svg>
      </div>
      <div class="w-full flex items-center text-3xl justify-between md:justify-start">
        <div class="flex flex-col md:w-56">
          <span class="flex items-end leading-5"><span class="text-lg leading-3">作战</span>{{ v.code }}</span>
          <span class="text-primary font-bold whitespace-nowrap overflow-hidden text-ellipsis">{{ v.name }}</span>
        </div>
        <div class="flex flex-row items-center">
          <div class="w-14 lg:w-16 rounded-full mx-2">
            <img src="//ak.dzp.me/dst/items/AP_GAMEPLAY.webp" alt="ap cost"/>
          </div>
          -{{ v.ap < 10 ? '&nbsp;' + v.ap + '&nbsp;' : v.ap }}
        </div>
      </div>
      <div class="divider text-lg text-info py-1">掉落物一览</div>
      <div class="flex flex-row gap-1 overflow-y-auto w-full">
        <div class="w-14 lg:w-16 min-w-[3.5rem] lg:min-w-[5rem] rounded-full" v-for="item in v.items">
          <img :src="'//ak.dzp.me/dst/items/' + (items[item]?.icon || 'default') + '.webp'" :alt="items[item]?.name"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {ref} from "vue";
  import {stageTable, items} from "../store/data";
  import {createToast} from "mosha-vue-toastify";

  const keyword = ref('')
  const searchRes = ref<Stage[]>([])
  const battleMap = ref<string[]>([])
  const search = () => {
    if (keyword.value === '') {
      createToast("请输入关卡关键词", {
        showIcon: true,
        type: "info",
        transition: "bounce",
      });
      searchRes.value = []
      return
    }
    searchRes.value = filter(stageTable.value, (item: Stage) => {
      if (item.name.includes(keyword.value.toUpperCase()) || item.code.includes(keyword.value.toUpperCase())) {
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
  const select = (mapID: string) => {
    if (!battleMap.value.includes(mapID)) {
      battleMap.value.push(mapID)
      createToast("已添加到战斗队列", {
        showIcon: true,
        type: "success",
        transition: "bounce",
      });
    } else {
      battleMap.value = battleMap.value.filter(item => item !== mapID)
    }
  }
</script>