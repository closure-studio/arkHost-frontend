<template>
	<div :class="$vuetify.breakpoint.smAndDown ? '' : 'd-flex align-center flex-column'">
		<div class="d-flex justify-center">
			<img
				src="@/assets/logo.png"
				height="128px"
				class="my-7"
			 />
		</div>
		<v-form ref="form" :v-model="true" lazy-validation :style="$vuetify.breakpoint.smAndDown ? '' : 'width: 50%'">
		<v-text-field
			v-model="email"
			label="邮箱"
			outlined
			required
			:rules="emailRules"
			prepend-inner-icon="mdi-email"
		></v-text-field>
		<v-text-field
			v-model="password"
			label="密码"
			outlined
			required
			:rules="pwdRule"
			type="password"
			prepend-inner-icon="mdi-lock"
		></v-text-field>
		</v-form>
		<v-row :style="$vuetify.breakpoint.smAndDown ? '' : 'width: 52%'">
		<v-col cols="6">
			<v-btn large block tile @click="reg">注册</v-btn>
		</v-col>
		<v-col cols="6">
			<v-btn large block tile outlined @click="login" :disabled="disabled">登录</v-btn>
		</v-col>
		</v-row>
	</div>
</template>
<script>
	import {apiLogin} from "@/plugins/axios";

  export default {
		data: () => ({
      email: '',
      password: '',
      emailRules: [
        v => !!v || '请输入邮箱地址',
        v => /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) || '你这是邮箱吗!'
      ],
      pwdRule: [
        v => !!v || '请输入密码',
      ],
      disabled: false
		}),
    methods:{
      reg(){
        this.$router.push('/register')
      },
      login(){
        if(this.$refs.form.validate()) {
          this.disabled = true
          this.$notify('少女折寿中...')
          apiLogin(`${this.email}/${this.password}`).then((resp) => {
            if(resp.code){
              this.$store.dispatch('user/load',resp.data)
              this.$notify({type:'s',text:'登录成功，欢迎来到可露希尔的午夜商超'})
              this.$router.push('/dashboard')
            }else{
              this.$notify({type:'w', title: '登录失败', text: resp.message})
            }
            this.disabled = false
          })
        }else{
          this.$notify({title: '提示', text: '填写的信息不对啊'})
        }
      }
    }
	}
</script>