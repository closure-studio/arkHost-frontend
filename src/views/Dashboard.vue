<template>
  <div>
    <v-card class="my-4">
      <v-card-title class="ml-2 orange--text">平台公告</v-card-title>
      <div class="pb-4 ml-6">
        <span class="text-h6">&emsp;&emsp;{{this.ann}}</span>
      </div>
    </v-card>
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
                <td>{{ k.config.account.replace(/(\d{3})\d{4}(\d{4})/, '$1囗囗囗囗$2') }}</td>
                <td>{{ serverList[k.config.platform] }}</td>
                <td>{{ k.config['isPause'] ? '暂停': '运行中'}}</td>
                <td v-html="status(k.status)" />
                <td>
                  <v-btn small color="warning" @click="login(k.config.account, k.config.platform)">登录</v-btn>
                  <v-btn small color="green" class="mx-2" @click="getScreen(k.config.account, k.config.platform)">截图</v-btn>
                  <v-btn small color="info"  class="mr-2" @click="$router.push({name:'账号详情', params: {account: k.config.account, platform: k.config.platform}}).catch(err => {})">详情</v-btn>
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
import {apiAddGame, apiAnnounce, apiDelGame, apiGameLogin, apiListGame, apiScreen} from "@/plugins/axios";
import Loading from "@/components/Common/Loading";
export default {
  components: {Loading},
  data:() => ({
    ann: '登录后查看',
    server: [{id:0,name:'IOS'}, {id:1,name:'安卓官方'}, {id:2,name:'Bilibili'}],
    rule: [v => !!v || '!!!!!!!!!!!!!!'],
    selServer: {id:1},
    account: '',
    password: '',
    overlay: false,
    overlay2: false,
    head: ['序号', '账号', '所属平台', '运行状态', '账号状态', '操作'],
    gameList: [],
    serverList: ['IOS','官服','B服']
  }),
  methods:{
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
          return '游戏错误'
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
    login(ac, pf){
      apiGameLogin({
        account: ac,
        platform: pf
      }).then(async (resp) => {
        if (resp.code) {
          this.$notify('操作成功')
        } else {
          this.$notify({type: 'w', title: '操作失败', text: resp.message})
        }
        await this.loadList()
      })
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
    await apiAnnounce().then((resp) => {
      if (resp.code) {
        this.ann = resp.data
      }
    })
    await this.loadList()
  }
}
</script>