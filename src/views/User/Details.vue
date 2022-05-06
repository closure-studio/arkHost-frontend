<template>
  <div>
    <v-card class="my-4">
      <v-card-title class="ml-2">托管详情
        <span class="text--secondary ml-2">- {{$route.params.account.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</span>
        <v-spacer />
        <v-btn large tile class="mr-2" color="orange" outlined @click="model=true,getConf()">修改信息</v-btn>
      </v-card-title>
      <v-divider />
      <v-row class="mx-6 mt-4 justify-center">
        <v-col v-if="$vuetify.breakpoint.smAndDown" class="pb-0">
          <v-alert outlined dense type="success">欢迎回来 <code>Dr.{{details.status.nickName}}</code><br>您上次登录是在：<code>{{ formatDate(details.status.LastApAddTime, true) }}</code></v-alert>
        </v-col>
        <v-alert outlined dense type="success" v-else>欢迎回来 <code>Dr.{{details.status.nickName}}</code> 您上次登录是在：<code>{{ formatDate(details.status.LastApAddTime, true) }}</code></v-alert>
      </v-row>
      <v-row class="mb-3 mx-6">
        <v-col cols="6" md="4" lg="4" v-for="k in 3" class="px-0">
          <div class="px-3">
            <v-chip :color="['warning', 'error', 'success'][k-1]" large label style="width: 100%" link outlined>
              <v-avatar size="36" left>
                <img :src="'https://res.arknights.host/dst/static/items/'+info[k+2]+'.webp'">
              </v-avatar>
              {{['源石', '单抽券', '十连券'][k-1]}}:{{info[k-1]}}
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <Divider msg="大群信息"/>
      <div class="px-6 pb-2">
        <p class="text-title mb-2">当前等级：<code>{{ details.status.level }}</code> （经验：<code>{{ details.status.exp }}</code> ）</p>
        <p class="text-title mb-2">当前看板：<code>{{ chars[details.status.secretary]['name'] }}</code></p>
        <p class="text-title mb-2">龙门&emsp;币：<code>{{ details.status.gold}}</code></p>
      </div>
    </v-card>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          实时截图
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-carousel cycle hide-delimiter-background :show-arrows="false" height="100%">
            <v-carousel-item v-for="(item,i) in screenshots" eager :key="i" :src="item.url"/>
          </v-carousel>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          编队信息
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-tabs v-model="tab" dark>
            <v-tab v-for="item in details.troop.squads">
              {{ item.name }}
            </v-tab>
          </v-tabs>
          <v-divider />
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in details.troop.squads">
              <v-card flat class="my-3">
                <v-row>
                  <v-col v-for="k in item['slots']" v-if="k" cols="12" md="3" lg="3" sm="6">
                    <Character :char="details.troop.chars[k['charInstId']]"/>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
          仓库统计
        </v-expansion-panel-header>
        <v-expansion-panel-content>

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="model" width="450">
      <v-card>
        <v-card-title class="headline">修改托管信息</v-card-title>
        <v-card-text>
          <v-form refs="doctor">
            <v-row>
              <v-col cols="12">
                <v-text-field label="自动作战地图" v-model="map"></v-text-field>
                <v-text-field label="最小保留理智" v-model="ap"></v-text-field>
                <div class="d-flex justify-space-between">
                  <v-switch
                      v-model="autoBattle"
                      label='自动战斗'
                  ></v-switch>
                  <v-switch
                      v-model="pause"
                      label='暂停托管'
                  ></v-switch>
                </div>
                <v-btn block tile large @click="submitEdit">提交修改</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>
<script>
import {apiConf, apiConfEdit, apiDetails, apiLog, apiScreenshots} from "@/plugins/axios";
import Character from "@/components/Character";
import Divider from "@/components/Common/divider";

  export default {
    components: {Divider, Character},
    data:() => ({
      details: {
        status: {},
        troop: {
          squads: []
        }
      },
      model: false,
      info: [],
      map: '',
      ap: '',
      pause: false,
      autoBattle: true,
      screenshots: {},
      chars: [],
      tab: 0,

    }),
    async created() {
      await this.loadData()
      await this.getScreen()
      this.chars = require('../../assets/data/character_table.json')
      console.log(chars)
      console.log('你有没有听见海猫的悲鸣?')
    },
    methods:{
      async getConf(){
        await apiConf(this.$route.params.account, this.$route.params.platform).then((resp)=>{
          if (resp.code){
            this.ap = resp.data.reserveAp
            this.map = resp.data.mapId
            this.autoBattle = resp.data.isAutoBattle
            this.pause = resp.data.isPause
          }else{
            this.$notify({type: 'w', title: '获取信息失败', text: resp.message})
          }
        })
      },
      async getScreen(){
        await apiScreenshots(this.$route.params.account, this.$route.params.platform).then((resp) => {
          if (resp.code){
            this.screenshots = resp.data
          }else{
            this.$notify({type: 'w', title: '获取实时截图失败', text: resp.message})
          }
        })
      },
      async loadData(){
        if(this.$route.params.account && this.$store.state.user.isLogin){
          apiDetails(this.$route.params.account, this.$route.params.platform).then((resp) => {
            if (resp.code) {
              this.details = resp.data // troop
              this.info = [
                  this.details.status.androidDiamond, this.details.status.gachaTicket, this.details.status.tenGachaTicket,
                  'DIAMOND', 'TKT_GACHA', 'TKT_GACHA_10'
              ]
            } else {
              this.$notify({type: 'w', title: '获取信息失败', text: resp.message})
            }
          })
        } else {
          await this.$router.push('/')
        }
      },
      async submitEdit() {
        await apiConfEdit(this.$route.params.account, this.$route.params.platform, {
          "account": this.$route.params.account,
          "isAutoBattle": this.autoBattle,
          "isPause": this.pause,
          "mapId": this.map,
          "platform": this.$route.params.platform,
          "keepAp": this.ap
        }).then(async (resp) => {
          if (resp.code) {
            this.$notify('托管配置修改成功')
            //await this.loadData()
          } else {
            this.$notify({type: 'w', title: '修改托管配置失败', text: resp.message})
          }
        })
      },
      async getDetails(){
        await apiLog(this.$route.params.account, this.$route.params.platform, 1)
      }
    }
  }
</script>