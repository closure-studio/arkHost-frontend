<template>
  <v-card class="my-4">
    <v-card-title class="ml-2 orange--text">平台公告</v-card-title>
    <div class="pb-4 ml-6">
      <span class="text-h6" style="white-space:break-spaces">{{this.ann}}</span>
    </div>
  </v-card>
</template>
<script>
  import {apiAnnounce} from "@/plugins/axios";
  export default {
    data: () => ({
       ann: '登陆后查看'
    }),
    async created() {
      await apiAnnounce().then((resp) => {
        if (resp.code) {
          this.ann = resp.data
        }
      })
    }
  }
</script>
