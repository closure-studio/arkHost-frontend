<template>
  <div>
    <v-card class="my-4">
      <v-card-title class="ml-2">托管详情
        <span class="text--secondary ml-2">- {{$route.params.account.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</span>
        <v-spacer />
        <v-btn large tile class="mr-2" color="orange" outlined @click="model=true">修改信息</v-btn>
      </v-card-title>
    </v-card>
    <v-dialog v-model="model" width="450">
      <v-card>
        <v-card-title class="headline">修改托管信息</v-card-title>
        <v-card-text>
          <v-form refs="doctor">
            <v-row>
              <v-col cols="12">
                <v-text-field label="账号"></v-text-field>
                <v-text-field label="自动作战地图"></v-text-field>
                <v-text-field label="最小保留理智"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  import {apiDetails} from "@/plugins/axios";

  export default {
    data:() => ({
      details: {},
      model: false
    }),
    async created() {
      if(this.$route.params.account && this.$store.state.user.isLogin){
        await apiDetails(this.$route.params.account, this.$route.params.platform).then((resp) => {
          if (resp.code) {
            this.details = resp.data
          } else {
            this.$notify({type: 'w', title: '获取信息失败', text: resp.message})
          }
        })
      }else{
        await this.$router.push('/')
      }
    }
  }
</script>