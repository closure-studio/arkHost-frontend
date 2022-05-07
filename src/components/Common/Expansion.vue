<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Skadi
 * @Date: 2021-07-05 08:48:49
 * @LastEditTime: 2021-07-17 21:24:16
-->
<style>
  .update {
    white-space: pre-wrap
  }
</style>
<template>
  <v-expansion-panels v-model="show" multiple>
    <v-expansion-panel v-for="row in list" :key="row.title">
      <v-expansion-panel-header :class="row.type+'--text px-4'">
        <h3>
          <v-icon style="vertical-align:text-bottom" :color="row.type" left>
            mdi-lightbulb-on-outline
          </v-icon>{{ row.title }}
        </h3>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="px-1">
        <div v-for="(k, v) in row.list">
          <h2 class="pb-1">{{ typeMap[v] }}</h2>
          <span v-for="(d, dd) in k" class="update">&emsp;&nbsp;{{ dd+1 }}. {{ d }}<br></span>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      list(){
        return this.data.reverse()
      }
    },
    data(){
      return{
        show: [0],
        typeMap: {stone: '里程碑', feature: '实装', fix: '修复', beautify: '美化'}
      }
    },
  }
</script>