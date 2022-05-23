<template>
  <div>
    <Divider msg="系统状态" class="py-4"/>
    <div class="item" style="grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));">
      <v-card v-for="(v, k) in status" class="pa-5 ">
        <span class="text--secondary">{{k}}: </span><span class="float-right">{{v}}</span>
      </v-card>
    </div>
    <v-btn block large class="mt-3" @click="getStatus">刷新</v-btn>
    <Divider msg="公告管理" class="py-4"/>
    <v-textarea rows="5" outlined label="公告编辑" v-model="ann" hide-details></v-textarea>
    <v-btn block large class="mt-3" @click="save">保存内容</v-btn>
    <Divider msg="日志分析" class="py-4"/>
    <v-alert type="info" dense outlined v-if="$vuetify.breakpoint.smAndDown">加载日志前请确保设备处于横屏状态</v-alert>
    <div class="d-flex justify-space-between justify-md-start ">
    <v-btn @click="load(0)" large>加载日志</v-btn>
    <v-btn @click="load(1)" large class="mx-2">加载倒叙日志</v-btn>
    <v-btn @click="exports" large >保存日志</v-btn>
    </div>
    <pre class="mt-4">{{ log }}</pre>
  </div >
</template>
<style>
  pre {
    background-color: #333;
    color: #fff;
    white-space: pre-wrap;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    padding: 0.75em 1em;
    overflow: auto;
  }
</style>
<script>
import {apiAnnounce, apiEditAnnounce, apiGetLog, apiStatus} from "@/plugins/axios";
  import Divider from "@/components/Common/divider";
  export default {
    components: {Divider},
    data: () => ({
      ann: '',
      status: {},
      log: '...'
    }),
    async created() {
      await apiAnnounce().then((resp) => {
        if (resp.code) {
          this.ann = resp.data
        }
      })
      await this.getStatus()
    },
    methods: {
      async getStatus() {
        await apiStatus().then((resp) => {
          if (resp.code) {
            this.status = resp.data
            this.$notify({type: 's', title: '状态信息获取成功'})
          }
        })
      },
      load(t) {
        apiGetLog().then((resp) => {
          if(t){
            const arr = resp.split('\n').reverse()
            arr.shift()
            resp = arr.join('\n')
          }
          this.log =  resp
        })
      },
      exports() {
        const FileSaver = require('file-saver');
        const blob = new Blob([this.log], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "log.txt");
        this.$notify('下载成功')
      },
      save() {
        apiEditAnnounce({
          announcement: this.ann
        }).then((resp) => {
          if (resp.code === 1) {
            this.$notify({type: 's', title: '保存成功'})
          } else {
            this.$notify({type: 'w', title: '保存失败', text: resp.message})
          }
        })
      }
    }
  }
</script>