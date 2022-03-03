<template xmlns="http://www.w3.org/1999/html">
  <div>
    <v-alert type="info" dense class="my-4">
      受网络波动影响, 本页面显示的数据仅供参考
    </v-alert>
    <v-row>
      <v-col v-for="k in server" cols=12 lg="3" md="6" sm="12">
        <v-card class="mb-4">
          <v-card-title class="py-2">
            <span :class="Date.parse(new Date()) / 1000 - k['update_UTCTime'] > 300 ? 'red--text' : 'green--text'">#{{k.number}} - {{k.name}}</span>
          </v-card-title>
          <div class="pa-4 pt-0">
            CPU占用：{{k['cpu'].toFixed(2)}}%<br>
            上线时间：<span class="text--secondary">{{formatDate(k['boot_UTCTime'], true)}}</span><br>
            最近更新：<span class="text--secondary">{{formatDate(k['update_UTCTime'], true)}}</span><br>
            内存占用：{{(100 - k['memory']['available'] / k['memory']['total'] * 100).toFixed(2)}}%
            <v-progress-linear :value="(100 - k['memory']['available'] / k['memory']['total'] * 100).toFixed(2)" class="mt-1"></v-progress-linear>
          </div>
          <Loading :overlay="overlay"/>
        </v-card>

      </v-col>
      <v-col class="pt-0" cols="12">
        <v-btn block tile large @click="load" :disabled="overlay">{{ overlay ? '请稍等' : '更新数据' }}</v-btn>
      </v-col>
    </v-row>

  </div>
</template>
<script>
  import {apiCron} from "@/plugins/axios";
  import Loading from "@/components/Common/Loading";
  export default {
    components: {Loading},
    data: () => ({
      server: [],
      overlay: false
    }),
    methods: {
      load(){
        this.overlay = true
        apiCron().then((resp) => {
          if (resp.code) {
            this.server = resp.data
            this.overlay = false
            this.$notify('获取最新数据成功')
          } else {
            this.$notify({type: 'w', text: '加载监控记录失败'})
          }
        })
      }
    },
    async created() {
      await this.load()
    }
  }
</script>