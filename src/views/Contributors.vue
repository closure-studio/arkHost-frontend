<template>
  <v-row>
    <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
      <h1 class="blue--text text-center text-decoration-line-through">可露希尔de午夜商超</h1>
      <h4 class="text-center">无鳞同胞，加入我们，共同进化，我们，需要你，<br>项目，可以持续，发展</h4>
      <Divider msg="项目介绍" class="mt-2"/>
      <v-card class="mb-4 mx-6">
        <v-card-text>
          如有兴趣且有精力参与项目开发，欢迎加入<b class="red--text">泰拉海嗣培育中心</b> <code>450555868</code>
        </v-card-text>
      </v-card>
      <v-timeline align-top dense>
        <v-timeline-item color="pink" small>
          <v-row class="pt-1 pb-8">
            <v-col cols="3">
              <strong class="orange--text">后端方向</strong>
            </v-col>
            <v-col>
              <strong>以 <code>Golang</code> 为主体</strong>
              <div class="text-caption pt-1">
                <code>Python</code> <code>C++</code> <code>Shell</code> 共同参与
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
        <v-timeline-item color="teal lighten-3 pt-5" small>
          <v-row class="pt-1">
            <v-col cols="3">
              <strong class="blue--text">前端方向</strong>
            </v-col>
            <v-col>
              <strong>目前是 <code>Vue2</code></strong>
              <div class="text-caption mb-2">
                但是已经准备前往 <code>Vue3</code> + <code>Tailwind</code>
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
      <Divider msg="不知道写什么了" class="mt-2"/>
      <div class="mx-6">
        <v-btn block outlined color="orange" large href="https://github.com/closure-studio/">Github</v-btn>
      </div>
    </v-col>
    <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 6">
      <v-row>
        <v-col cols="6" md="3" lg="3" v-for="i in teams" >
          <v-card class="d-flex align-center py-4 flex-column" >
            <v-avatar size="64" class="mb-4">
              <img :src="`https://res.arknights.host/team/${i[1]}.png`" alt="skadiD">
            </v-avatar>
            <span class="text-h5">{{i[0]}}</span>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

</template>

<script>
  import Divider from "@/components/Common/divider";
  export default {
    components: {Divider},
    data(){
      return{
        teams: [["GK", "563255057"],["Ooooooutdated", "1228138940"],["32方混淆", "2370275150"],["孤星", "2823706257"],["skadiD", "10003653"]]
      }
    },
    created() {
      console.log('你有没有想过朋友不再是朋友')
      console.log('家园不再是家园?')
    }
  }
</script>