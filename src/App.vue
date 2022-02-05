<template>
	<v-app>
		<v-hover v-slot="{ hover }">
			<v-navigation-drawer v-model="drawer" :mini-variant="mini ? !hover : false" app :clipped="true" width="250">
				<v-list-item-group v-model="selectedItem">
					<v-list nav dense shaped>
						<v-list-item @click="$router.push('/').catch(err => {})">
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
							<v-list-item @click="$router.push('/account/'+ k.id).catch(err => {})" v-for="(k,v) in user.col">
								<v-list-item-content>
									<v-list-item-title>{{k.name}}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-group>
					</v-list>
					<v-subheader style="height:12px;padding:0">
						<v-divider/><v-divider />
					</v-subheader>
					<v-list nav dense v-show="user.isLogin">
						<v-list-item @click="$router.push('/setting').catch(err =>{})">
							<v-list-item-icon>
								<v-icon>mdi-cogs</v-icon>
							</v-list-item-icon>
							<v-list-item-title>设置</v-list-item-title>
						</v-list-item>
						<v-list-item @click="logout">
							<v-list-item-icon>
								<v-icon>mdi-logout</v-icon>
							</v-list-item-icon>
							<v-list-item-title>退出登录</v-list-item-title>
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
						<v-btn @click="login" large style="margin-right:24px">
							滚
						</v-btn>
					</template>
					<template v-else>
						<v-btn @click="login" large style="margin-right:24px">
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
				<router-view />
			</v-container>
			
		</v-main>
	</v-app>
</template>
<script>
	export default {
		data: () => ({
			drawer: false,
			selectedItem: 0,
		}),
		computed:{
			user(){
				return {}
			},
			mini(){
				return !this.$vuetify.breakpoint.smAndDown && true // todo: import user's configuration
			}
		},
		methods:{
			login(){
        this.$router.push('/login').catch(err => {})
			},
			register(){},
			logout(){}
		},
		created() {
		}
	}
</script>