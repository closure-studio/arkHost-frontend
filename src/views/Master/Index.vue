<template>
  <div>
    <Divider msg="公告管理" class="py-4"/>
    <v-textarea rows="5" outlined label="公告编辑" v-model="ann" hide-details></v-textarea>
    <v-btn block large class="mt-3" @click="save">保存内容</v-btn>
    <Divider msg="日志分析" class="py-4"/>
    <v-alert type="info" dense outlined v-if="$vuetify.breakpoint.smAndDown">加载日志前请确保设备处于横屏状态</v-alert>
    <v-btn @click="load" large>加载最近日志</v-btn>
    <v-btn @click="exports" large class="ml-4" :class="$vuetify.breakpoint.smAndDown ? 'float-end' : ''">保存日志到本地</v-btn>
    <pre class="mt-4">{{ log }}</pre>
  </div>
</template>
<style>
  pre {
    background-color: #333;
    color: #fff;
    white-space: pre-wrap;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    padding: 0.75em 1em;
  }
</style>
<script>
  import {apiAnnounce, apiEditAnnounce, apiGetLog} from "@/plugins/axios";
  import Divider from "@/components/Common/divider";
  export default {
    components: {Divider},
    data: () => ({
      ann: '',
      log: '...'
    }),
    async created() {
      await apiAnnounce().then((resp) => {
        if (resp.code) {
          this.ann = resp.data
        }
      })
    },
    methods: {
      load() {
        apiGetLog().then((resp) => {
          this.log = resp
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