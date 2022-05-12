import Vue from 'vue'
import Router from 'vue-router'

import H from '../views/Home.vue'
import Da from '../views/Dashboard.vue'
import L from '../views/User/Login.vue'
import R from '../views/User/Register.vue'
import C from '../views/Cron.vue'
import Con from '../views/Contributors.vue'
import D from '../views/User/Details.vue'
import His from '../views/History.vue'
import M from '../views/Master/Index.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{
    path:'/', component: H, name: '首页'
  },{
    path:'/login', component: L, name: '登录'
  },{
    path:'/register', component: R, name: '注册'
  },{
    path:'/cron', component: C, name: '服务监控'
  },{
    path:'/details', component: D, name: '账号详情'
  },{
    path:'/dashboard', component: Da, name: '控制台'
  },{
    path:'/contributors', component: Con, name: '内容贡献者'
  },{
    path:'/history', component: His, name: '更新记录'
  },{
    path:'/master', component: M, name: '管理后台'
  }]
})