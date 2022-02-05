import Vue from 'vue'
import Router from 'vue-router'

import H from '../views/Home.vue'
import L from '../views/User/Login.vue'
import R from '../views/User/Register.vue'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{
    path:'/', component: H, name: '首页'
  },{
    path:'/login', component: L, name: '登录'
  },{
    path:'/register', component: R, name: '注册'
  }]
})