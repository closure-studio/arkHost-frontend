<template>
  <div v-if="!battleMap.includes(stage.id)" class="absolute ark-mapItem md:ark-mapItem-md lg:ark-mapItem-lg">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 460 460" xml:space="preserve" fill="currentColor" class="hidden group-hover:flex group-hover:animate-water-mark">
        <path d="M230,0C102.975,0,0,102.975,0,230s102.975,230,230,230s230-102.974,230-230S357.025,0,230,0z M268.333,377.36 c0,8.676-7.034,15.71-15.71,15.71h-43.101c-8.676,0-15.71-7.034-15.71-15.71V202.477c0-8.676,7.033-15.71,15.71-15.71h43.101 c8.676,0,15.71,7.033,15.71,15.71V377.36z M230,157c-21.539,0-39-17.461-39-39s17.461-39,39-39s39,17.461,39,39 S251.539,157,230,157z"></path>
      </svg>
  </div>
  <div v-else class="absolute ark-mapItem-click md:ark-mapItem-click-md lg:ark-mapItem-click-lg">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 511.755 511.755" xml:space="preserve" fill="currentColor" class="animate-water-mark">
        <path d="M436.891,74.867c-99.819-99.819-262.208-99.819-362.027,0c-99.819,99.797-99.819,262.229,0,362.027 c49.899,49.92,115.456,74.859,181.013,74.859s131.093-24.939,181.013-74.859C536.709,337.096,536.709,174.664,436.891,74.867z M398.96,185.629L249.627,334.963c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251l-85.333-85.333 c-8.341-8.341-8.341-21.824,0-30.165c8.341-8.341,21.824-8.341,30.165,0l70.251,70.251l134.251-134.251 c8.341-8.341,21.824-8.341,30.165,0C407.301,163.805,407.301,177.288,398.96,185.629z"/>
      </svg>
  </div>
  <div class="w-full flex items-center text-3xl justify-between md:justify-start">
    <div class="flex flex-col md:w-56">
      <span class="flex items-end leading-5"><span class="text-lg leading-3">作战</span>{{ stage.code }}</span>
      <span class="text-primary font-bold whitespace-nowrap overflow-hidden text-ellipsis">{{ stage.name }}</span>
    </div>
    <div class="flex flex-row items-center">
      <div class="w-14 lg:w-16 rounded-full mx-2">
        <img src="//ak.dzp.me/dst/items/AP_GAMEPLAY.webp" alt="ap cost"/>
      </div>
      -{{ stage.ap < 10 ? '&nbsp;' + stage.ap + '&nbsp;' : stage.ap }}
    </div>
  </div>
  <div class="divider text-lg text-info py-1">掉落物一览</div>
  <div class="flex flex-row gap-1 overflow-y-auto w-full">
    <div class="w-14 lg:w-16 min-w-[3.5rem] lg:min-w-[5rem] rounded-full" v-for="item in stage.items">
      <img :src="'//ak.dzp.me/dst/items/' + (items[item]?.icon || 'default') + '.webp'" :alt="items[item]?.name"/>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {items} from "../store/data";
  const { stage, battleMap } = defineProps<{
    stage: Stage;
    battleMap: string[]
  }>()
</script>