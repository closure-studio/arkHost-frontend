<template>
  <div>
    <v-card class="my-4">
      <v-card-title class="ml-2">托管详情
        <span class="text--secondary ml-2">- {{$route.query.account.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</span>
        <v-spacer />
        <v-btn large tile class="mr-2" color="orange" outlined @click="model=true,getConf()">挂机配置</v-btn>
      </v-card-title>
      <v-divider />
      <v-row class="mx-6 mt-4 justify-center">
        <v-col v-if="$vuetify.breakpoint.smAndDown" class="pb-0">
          <v-alert outlined dense type="success">欢迎回来：<code>Dr.{{details.status.nickName}}</code><br>上次登录：<code>{{ formatDate(details.status.lastOnlineTs, true) }}</code></v-alert>
        </v-col>
        <v-alert outlined dense type="success" v-else>欢迎回来：<code>Dr.{{details.status.nickName}}</code> 上次登录：<code>{{ formatDate(details.status.lastOnlineTs, true) }}</code></v-alert>
      </v-row>
      <v-row class="mb-3 mx-6">
        <v-col cols="6" md="4" lg="4" v-for="k in 3" class="px-0">
          <div class="px-3">
            <v-chip :color="['warning', 'error', 'success'][k-1]" large label style="width: 100%" link outlined>
              <v-avatar size="36" left>
                <img :src="'https://ak.dzp.me/dst/items/'+info[k+2]+'.webp'">
              </v-avatar>
              {{['源石', '单抽券', '十连券'][k-1]}}:{{info[k-1]}}
            </v-chip>
          </div>
        </v-col>
      </v-row>
      <Divider msg="↓ 巴别塔饿灵 ↓"/>
      <div class="px-6 pb-2 d-flex justify-space-between justify-md-center">
        <div>
          <p class="text-title mb-2">等级：<code>{{ details.status.level }}</code></p>
          <p class="text-title mb-2">经验：<code>{{ details.status.exp}}</code></p>
          <p class="text-title mb-2">看板：<code>{{ chars[details.status.secretary].name }}</code></p>
          <p class="text-title mb-2">理智：<code>{{ details.status.ap }}</code> / <code>{{ details.status.maxAp }}</code></p>
        </div>
        <v-divider vertical :class="$vuetify.breakpoint.smAndDown ? '' : 'mx-9'" />
        <div style="direction: rtl">
          <p class="text-title mb-2">公招券：<code>{{ details.status.recruitLicense }}</code></p>
          <p class="text-title mb-2">信用点：<code>{{ details.status.socialPoint}}</code></p>
          <p class="text-title mb-2">龙门币：<code>{{ details.status.gold }}</code></p>
        </div>
      </div>
    </v-card>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          不实时截图
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-carousel cycle hide-delimiter-background :show-arrows="false" height="100%">
            <v-carousel-item v-for="(file, i) in screenshots.file" eager :key="i" :src="screenshots.host + file"/>
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
                    <Character :char="details.troop.chars[k['charInstId']]" :group="chars[details.troop.chars[k['charInstId']]['charId']].profession"/>
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
          <div class="item" :style="'grid-template-columns: repeat(auto-fill, minmax(' + ($vuetify.breakpoint.smAndDown ? '100' : '140') + 'px, 1fr));'">
            <v-card v-for="(num, v) in details.inventory" v-if="num !== 0">
              <v-img class="item-image" :src="'https://ak.dzp.me/dst/items/'+items['items'][v]['iconId']+'.webp'" />
              <p class="item-content">{{ items['items'][v]['name'] }}</p>
              <p class="item-count">× {{ num }}</p>
            </v-card>
          </div>
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
                <v-select
                    color="info"
                    :items='maps'
                    item-value="val"
                    v-model="map"
                    outlined
                    dense
                    label='选择地图'
                    hide-details
                    :menu-props="{ offsetY: true }"
                ></v-select>
                <v-text-field label="理智保留" v-model="ap" persistent-hint :hint="'当前等级最大自然恢复理智为 ' + details.status.maxAp" class="mt-3"></v-text-field>
                <div class="d-flex justify-space-between">
                  <v-switch
                      v-model="autoBattle"
                      label='自动战斗'
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
<style lang="sass">
  .item
    display: grid
    grid-gap: 1rem

  .item-image
    position: relative
    left: 8px
    width: 100px
    height: 100px

  .item-count
    color: white
    position: absolute
    right: 0
    top: 0
    background-color: rgba(0, 0, 0, .6)
    padding: 2.5px 5px
    margin: 0
    pointer-events: none !important

  .item-content
    color: white
    position: absolute
    right: 0
    background-color: rgba(0, 0, 0, .6)
    padding: 2.5px 5px
    bottom: 0
    margin-bottom: 0 !important
    pointer-events: none !important

  .item-time
    color: white
    position: absolute
    right: 12px
    bottom: 15px
    background-color: rgba(0, 0, 0, .6)
    padding: 2.5px 5px
    margin: 0
    pointer-events: none !important
</style>
<script>
import {apiConf, apiConfEdit, apiDetails, apiGameLogin, apiGetMapList, apiLog, apiScreenshots} from "@/plugins/axios";
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
      items: [],
      map: '',
      maps: [],
      ap: '',
      autoBattle: true,
      screenshots: {
        host: '',
        file: []
      },
      chars: [],
      tab: 0,

    }),
    async created() {
      this.chars = require('../../assets/data/character_table.json')
      this.items = await require('../../assets/data/item_table.json')
      //console.log(this.items.items)
      await this.loadData()
      await this.getScreen()
      console.log('你有没有听见海猫的悲鸣?')
    },
    methods:{
      async getConf(){
        await apiGetMapList().then((resp) => {
          for(const k in resp.data.mapDict){
            this.maps.push({text: k, val: resp.data.mapDict[k]})
          }
        })
        await apiConf(this.$route.query.account, this.$route.query.platform).then((resp)=>{
          if (resp.code) {
            this.ap = resp.data.keepingAP
            this.map = resp.data.mapId
            this.autoBattle = resp.data.isAutoBattle
            this.pause = resp.data.isPause
          } else {
            this.$notify({type: 'w', title: '获取信息失败', text: resp.message})
          }
        })
      },
      async getScreen(){
        await apiScreenshots(this.$route.query.account, this.$route.query.platform).then((resp) => {
          if (resp.code) {
            for (const k of resp.data) {
              this.screenshots.host = k.host
              Array.prototype.push.apply(this.screenshots.file, k['fileName'])
            }
          }else{
            this.$notify({type: 'w', title: '获取实时截图失败', text: resp.message})
          }
        })
      },
      async loadData(){
        if(this.$route.query.account && this.$store.state.user.isLogin){
          apiDetails(this.$route.query.account, this.$route.query.platform).then((resp) => {
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
      submitEdit() {
        apiConfEdit(this.$route.query.account, this.$route.query.platform, {
          "account": this.$route.query.account,
          "isAutoBattle": this.autoBattle,
          "mapId": this.map,
          "platform": this.$route.query.platform,
          "keepingAP": Number(this.ap)
        }).then((resp) => {
          if (resp.code) {
            this.$notify('托管配置修改成功，自动重新登录游戏...')
            apiGameLogin({
              account: this.$route.query.account,
              platform: this.$route.query.platform
            }).then(async (resp) => {
              if (resp.code) {
                this.$notify('重新登录成功')
              } else {
                this.$notify({type: 'w', title: '重新登录异常', text: resp.message})
              }
            })
            this.$router.push('/dashboard')
          } else {
            this.$notify({type: 'w', title: '修改托管配置失败', text: resp.message})
          }
        })
      },
      async getDetails(){
        await apiLog(this.$route.query.account, this.$route.query.platform, 1)
      }
    }
  }
</script>