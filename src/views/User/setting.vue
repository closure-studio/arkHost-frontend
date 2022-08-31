<template>
  <v-card class="px-6">
    <div class="d-flex py-3 align-center text-h6">
      绑定 QQ 账号
      <v-spacer />
      <v-btn color="info" outlined @click="bind">点击绑定 / 改绑</v-btn>
    </div>
    <div v-if="showBind" class="pb-5">
      <v-text-field class="mb-4" v-model="qq" label="QQ 号" required outlined hide-details/>
      <v-text-field class="mb-4" v-model="code" label="验证码" required outlined hide-details v-show="needCode"/>
      <v-btn block x-large @click="bindQQ">保存</v-btn>
    </div>
  </v-card>
</template>
<script>
  import {apiBindQQ} from "@/plugins/axios";

  export default {
    data() {
      return {
        showBind: false,
        needCode: false,
        qq: '',
        code: ''
      }
    },
    methods: {
      bind() {
        this.showBind = true
      },
      bindQQ() {
        apiBindQQ(this.qq, this.code).then(resp => {
          if (resp.code === 2){
            this.needCode = true
            this.$notify({type:'i', text:'发送验证码成功，请及时填写'})
          } else if (resp.code === 1) {
            this.showBind = false
            this.needCode = false
            this.$notify({type:'s', text:'绑定成功'})
          } else {
            this.$notify({type:'w', title:'绑定失败', text: resp.message})
          }
        })
      }
    }
  }
</script>