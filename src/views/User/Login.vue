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
        hide-details="auto"
        type="password"
        prepend-inner-icon="mdi-lock"
      />
      <span class="float-right py-2" @click="forget=true">忘记密码？</span>
		</v-form>
		<v-row :style="$vuetify.breakpoint.smAndDown ? '' : 'width: 52%'">
      <v-col cols="6">
        <v-btn large block tile @click="reg">注册</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn large block tile outlined @click="login" :disabled="disabled">登录</v-btn>
      </v-col>
		</v-row>
    <v-dialog v-model="forget" width="500">
      <v-card>
        <v-card-title class="headline">找回密码</v-card-title>
        <v-card-text>
          <v-form :v-model="true" lazy-validation ref="form">
            <v-container>
              <v-row class="skd">
                <v-col cols="12" v-if="!code">
                  <v-text-field v-model="email" label="注册邮箱" required outlined :rules="emailRules" hide-details="auto"/>
                </v-col>
                <v-col cols="12" v-if="!code">
                  <v-text-field v-model="qq" label="绑定QQ" required outlined :rules="qqRule" hide-details="auto"/>
                </v-col>
                <v-col cols="12" v-if="code">
                  <v-text-field v-model="codeNum" label="验证码" required outlined hide-details/>
                </v-col>
                <v-col cols="12" v-if="code">
                  <v-text-field v-model="newPass" label="新密码" required outlined hide-details
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions class="mx-2">
          <v-btn block color="button" large @click="send" v-if="!code">
            <span class="white--text"><v-icon left>
              mdi-login-variant
            </v-icon>发送验证码</span>
          </v-btn>
          <v-btn block color="button" large @click="submit" v-if="code">
					<span class="white--text"><v-icon left>
						mdi-login-variant
					</v-icon>确认修改</span>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn class="ml-2" @click="reset" v-if="code">
            重置操作
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
	</div>
</template>
<style>
  .skd .col-12 {
    padding: 1.5rem 0 0 0!important;
  }
</style>

<script>
import {apiForgetPass, apiLogin} from "@/plugins/axios";

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
      qqRule: [
        v => !!v || '请输入QQ号',
      ],
      disabled: false,
      forget: false,
      code: false,
      qq: '',
      codeNum: '',
      newPass: '',
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
              this.axios.defaults.headers['Authorization'] = resp.data.token
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
      },
      send(){
        apiForgetPass(this.qq, this.email, this.codeNum).then(resp => {
          if(resp.code === 2){
            this.code = true
            this.$notify({type:'s', text:'验证码已发送至QQ，请及时填写'})
          } else {
            this.$notify({type:'w', title: '验证码发送失败', text: resp.message})
          }
        })
      },
      reset(){
        this.code = false
        this.qq = ''
        this.codeNum = ''
      },
      submit(){
        apiForgetPass(this.qq, this.email, this.codeNum, this.newPass).then(resp => {
          if(resp.code === 1){
            this.code = true
            this.$notify({type:'s', text:'密码重置成功'})
          } else {
            this.$notify({type:'w', title: '密码重置失败', text: resp.message})
          }
        })
      }
    }
	}
</script>
