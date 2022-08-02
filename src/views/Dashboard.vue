<template>
  <div>
    <Announce />
    <v-alert
        dismissible
        color="success"
        outlined
        v-ripple
        class="text-center"
        @click="github"
        v-if="!Github"
    ><span class="text-h6 align-center">拯救可露希爾，點擊 Github 送 star -></span></v-alert>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title style="place-content:center">快速开始</v-card-title>
          <v-form ref="skadiD">
            <v-row>
              <v-col class="mx-3">
                <v-select v-model="selServer" :items="server" outlined label="选择服务器" :menu-props="{offsetY: true}" return-object :rules="rule" item-value="id" item-text="name"></v-select>
                <v-text-field label="账号" outlined required :rules="rule" v-model="account"></v-text-field>
                <v-text-field label="密码" outlined required :rules="rule" v-model="password"></v-text-field>
                <v-btn block tile large @click="addAccount">添加托管</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <Loading :overlay="overlay"/>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="ml-2" style="place-content:center">托管列表<v-icon right size="20" @click="loadList">mdi-refresh</v-icon></v-card-title>
          <Loading :overlay="overlay2"/>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center" v-for="k in head">
                  {{k}}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(k,v) in gameList" class="text-center">
                <td>{{ v+1 }}</td>
                <td>{{ k.config.account.replace(/(\d{3})\d{6}(\d{2})/, '$1****$2') }}</td>
                <td>{{ serverList[k.config.platform] }}</td>
                <td>{{ k.config['isPause'] ? '暂停': '运行中'}}</td>
                <td v-html="status(k.status)" @click="gt(k.status === 999, k.config.account, k.config.platform)"/>
                <td>
                  <v-btn small :color="k.config['isPause'] || k.status.code !== 2 ? 'green' : 'warning'" @click="login(k.config.account, k.config.platform, k.config['isPause'] || k.status.code !== 2)">
                    {{ k.config['isPause'] || k.status.code !== 2 ? '登录' : '暂停' }}</v-btn>
                  <v-btn small color="info"  class="mx-2" @click="$router.push({name:'账号详情', query: {account: k.config.account, platform: k.config.platform}}).catch(err => {})">详情</v-btn>
                  <v-btn small color="error" @click="del(k.config.account, k.config.platform)">删除</v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-alert type="info">Bug汇报,使用交流群: 450555868<br>非盈利性公益项目,且用且珍惜<br>请勿泄露您的任何账号<br>请勿肆处宣扬本网站<br>感谢您的使用</v-alert>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {
  apiAddGame,
  apiAnnounce,
  apiConf,
  apiConfEdit,
  apiDelGame,
  apiGameLogin, apiGeetest, apiGeetestSet,
  apiListGame,
  apiScreen
} from "@/plugins/axios";
import Loading from "@/components/Common/Loading";
import Announce from "@/components/Announce";
export default {
  components: {Loading, Announce},
  data:() => ({
    server: [{id:0,name:'IOS'}, {id:1,name:'安卓官方'}, {id:2,name:'Bilibili'}],
    rule: [v => !!v || '!!!!!!!!!!!!!!'],
    selServer: {id:1},
    account: '',
    password: '',
    overlay: false,
    overlay2: false,
    head: ['序号', '账号', '所属平台', '运行状态', '账号状态', '操作'],
    gameList: [],
    serverList: ['IOS','官服','B服'],
    Github: localStorage.getItem('github'),
  }),
  methods:{
    github(){
      window.open('https://github.com/closure-studio/ReadMe', '_blank')
      localStorage.setItem('github', 'true')
    },
    gt(need, ac, pf){
      this.$notify('正在加载验证码...')
      apiGeetest(ac, pf).then(resp => {
        //console.log(resp)
        initGeetest({
          gt: resp.data['gt'],
          challenge: resp.data['challenge'],
          offline: false,
          product: "bind",
          width: "300px",
          https: true,
        },(captchaObj) => {
          captchaObj.onReady(() => {
            captchaObj.verify();
          })
          captchaObj.onSuccess(() => {
            const validate = captchaObj.getValidate();
            this.$notify('提交成功，继续登录中')
            //console.log("callback", captchaObj, validate)
            apiGeetestSet(ac, pf, {
              challenge: resp.data['challenge'],
              geetest_challenge: validate.geetest_challenge,
              geetest_seccode: validate.geetest_seccode,
              geetest_validate: validate.geetest_validate,
              success: true
            }).then(() => {
              setTimeout(() => {
                this.loadList()
              }, 1000)
            })
            captchaObj.destroy();//这里是销毁实例，处理完逻辑最终销毁
          })
        }, this)
      })
    },
    del(ac, pf){
      this.$emit('alert','真的要删除账号吗?', () =>{
        apiDelGame({
          account: ac,
          platform: pf
        }).then(async (resp) => {
          if (resp.code) {
            await this.loadList()
            this.$notify('删除成功')
          }else
            this.$notify({type: 'w', title: '删除失败', text: resp.message})
        })
      });
    },
    status(n){
      switch (n.code){
        case -1:
          return `<span style="color:red">${n.text}</span>`
        case 0:
          return '<span style="color:orange">未开启</span>'
        case 1:
          return '<span style="color:skyblue">登录中</span>'
        case 2:
          return '<span style="color:green">运行中</span>'
        case 3:
          return `${n.text}`
        case 999:
          //this.$notify({type: 'w', title: '需要通过验证码', text: '请点击【需要验证】'})
          return `<span style="color:purple;cursor: pointer">${n.text}</span>`
      }
    },
    addAccount(){
      if(this.$refs.skadiD.validate()){
        this.overlay = true
        apiAddGame({
          platform: this.selServer.id,
          account: this.account,
          password: this.password
        }).then((resp) => {
          if(resp.code){
            this.$notify('添加托管成功')
            this.overlay = false
            this.$router.go(0)
          }else{
            this.$notify({type: 'w', title: '添加托管失败',text: resp.message})
            this.overlay = false
          }
        })
      }
    },
    getScreen(ac, pf){
      apiScreen(ac,pf).then((resp) => {
        if(resp.code){
          alert('等待实装ing')
        }else{
          this.$notify({type: 'w', title: '获取截图失败', text:resp.message})
        }
      })
    },
    login(ac, pf, isStop){
      if (isStop) {
        apiGameLogin({
          account: ac,
          platform: pf
        }).then(async (resp) => {
          if (resp.code) {
            this.$notify('操作成功，请稍后自行刷新查看结果')
          } else {
            this.$notify({type: 'w', title: '操作失败', text: resp.message})
          }
          await this.loadList()
        })
      } else {
        this.$notify('暂停请求中，请稍后')
        apiConf(ac, pf).then((resp) => {
          if (resp.code) {
            apiConfEdit(ac, pf, {
              "account": ac,
              "platform": pf,
              "isAutoBattle": resp.data.isAutoBattle,
              "mapId": resp.data.mapId,
              "keepingAP": Number(resp.data.keepingAP),
              "isStopped": true
            }).then(async (resp) => {
              if (resp.code) {
                this.$notify({type: 's', text: '暂停托管成功'})
                await this.loadList()
              } else {
                this.$notify({type: 'w', title: '试图暂停失败', text: resp.message})
              }
            })
          } else {
            this.$notify({type: 'w', title: '试图暂停失败', text: resp.message})
          }
        })
      }
    },
    async loadList() {
      this.overlay2 = true
      await apiListGame().then((resp) => {
        if (resp.code) {
          this.gameList = resp.data
          this.overlay2 = false
        } else {
          this.$notify({type: 'w', title: '获取托管信息失败', text: resp.message})
          this.overlay2 = false
        }
      })
    }
  },
  async created() {
    await this.loadList()
  },
}
</script>