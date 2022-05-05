<template>
	<v-app>
		<v-hover v-slot="{ hover }">
			<v-navigation-drawer v-model="drawer" :mini-variant="mini ? !hover : false" app :clipped="true" width="250">
				<v-list-item-group v-model="selectedItem">
					<v-list nav dense shaped>
						<v-list-item @click="$router.push('/dashboard').catch(err => {})">
							<v-list-item-icon>
								<v-icon>mdi-home</v-icon>
							</v-list-item-icon>
							<v-list-item-title>首页</v-list-item-title>
						</v-list-item>
						<v-list-group :v-model="true" prepend-icon="mdi-collage" no-action>
							<template v-slot:activator>
								<v-list-item-content>
									<v-list-item-title>托管列表</v-list-item-title>
								</v-list-item-content>
							</template>
							<v-list-item @click="$router.push({name:'账号详情', params: {account: k.config.account, platform: k.config.platform}}).catch(err => {})" v-for="k in list">
								<v-list-item-content>
									<v-list-item-title>{{k.config.account.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-group>
					</v-list>
					<v-subheader style="height:12px;padding:0">
						<v-divider/><v-divider />
					</v-subheader>
					<v-list nav dense v-show="user.isLogin">
						<v-list-item v-for="k in menu" @click="$router.push(k.event)" >
							<v-list-item-icon>
								<v-icon>{{k.icon}}</v-icon>
							</v-list-item-icon>
							<v-list-item-title>{{k.name}}</v-list-item-title>
						</v-list-item>
            <v-list-item @click="logout" >
							<v-list-item-icon>
								<v-icon>mdi-logout</v-icon>
							</v-list-item-icon>
							<v-list-item-title>安全退出</v-list-item-title>
						</v-list-item>

					</v-list>
				</v-list-item-group>
				<v-list nav dense v-show="!user.isLogin">
					<v-list-item @click="login">
						<v-list-item-icon>
							<v-icon>mdi-login</v-icon>
						</v-list-item-icon>
						<v-list-item-title>快速登录</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
		</v-hover>
		<v-app-bar :clipped-left="true" app >
			<v-app-bar-nav-icon @click.stop="drawer = !drawer" ref="banner"/>
			<template v-if="!$vuetify.breakpoint.smAndDown">
				<v-toolbar-title class="pl-5" @click="$router.push('/').catch(err => {}),selectedItem = 0">可露希尔工作室</v-toolbar-title>
				<v-spacer />
				<div class="align-center d-flex">
					<template v-if="user.isLogin">
						<v-btn @click="logout" large>
							退出登录
						</v-btn>
					</template>
					<template v-else>
						<v-btn @click="login" large class="mx-4">
							登录
						</v-btn>
						<v-btn @click="register" outlined large>
							注册
						</v-btn>
					</template>
				</div>
			</template>
			<template v-else>
				<v-toolbar-title v-text="$route.name" class="pl-0" />
        <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
			</template>
		</v-app-bar>
		<v-main>
			<notifications position="center"/>
			<v-container>
        <v-card tile class="d-flex align-center mb-2">
          <v-breadcrumbs
              :items="items"
              divider=">">
          </v-breadcrumbs>
          <v-spacer />
          <v-chip
              color="green"
              class="mr-6"
              label
              outlined
          ><v-icon left>
            mdi-cube-outline
          </v-icon>当前版本: 加入，进化</v-chip>
        </v-card>
				<router-view @alert="alert"/>
			</v-container>
      <notice
          ref="notice"
          :visible.sync="showNotice"
          :title="title"
          @close="showNotice = false"
          @submit="subNotice"
      ></notice>
		</v-main>
	</v-app>
</template>
<script>
  import Notice from "@/components/Common/Alert";
  import {apiListGame, apiReLogin} from "@/plugins/axios";
	export default {
    components: {
      Notice
    },
		data: () => ({
			drawer: false,
			selectedItem: 0,
      showNotice: false,
      title: '',
      subNotice: '',
      list: []
		}),
		computed:{
      items(){
        return [{
          text: '可露希尔',
          disabled: false,
          to: {path: '/'},
        },{
          text: this.$route.name,
          disabled: true,
        }]
      },
      menu(){
        if(this.user.isLogin){
          return [{
            name: '个人设置',
            event: '/setting',
            icon: 'mdi-cogs'
          },{
            name: '服务监控',
            event: '/cron',
            icon: 'mdi-power-plug'
          },{
            name: '后勤分队',
            event: '/contributors',
            icon: 'mdi-account-group'
          }]
        }
        return [{
          name: '快速登录',
          event: this.login,
          icon: 'mdi-login'
        }]
      },
			user(){
				return this.$store.state.user
			},
			mini(){
				return !this.$vuetify.breakpoint.smAndDown && true // todo: import user's configuration
			}
		},
		methods:{
			login(){
        this.$router.push('/login').catch(err => {})
			},
			register(){
        this.$router.push('/register').catch(err => {})
      },
			logout(){
        this.alert('真的要退出吗?', () => {
          this.showNotice = false
          this.$notify({type:'s', text: '你已安全退出'})
          this.$store.dispatch("user/exit")
          this.$router.push("/")
        })
      },
      alert(title, func){
        this.showNotice = true
        this.title = title
        this.subNotice = func
      }
		},
		created() {
      if (this.user.token) {
        if ((Date.now() - this.user.lastLoginTs) / 1000 > 43200){
          apiReLogin(this.user.token).then((resp) => {
            if (resp.code) {
              this.$store.dispatch('user/load', resp.data)
              this.$notify({type: 'w', text: '自动登录成功'})
              this.axios.defaults.headers['Authorization'] = resp.data.token
            }
          })
        }
        this.axios.defaults.headers['Authorization'] = this.user.token
        apiListGame().then((resp) => {
          if (resp.code) {
            this.list = resp.data
          } else {
            this.$notify({type: 'w', title: '获取托管信息失败', text: resp.message})
          }
        })
      } else {
        this.$notify('还没登录呢')
      }
    }
	}
</script>