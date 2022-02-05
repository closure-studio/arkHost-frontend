import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from 'vue-notification'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/assets/index.css'

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = "http://146.56.166.61:7777/"
Vue.axios.interceptors.response.use(response => {
  return {
    data: response.data
  }
}, err => {
  Vue.notify({type:"error", duration:5000, title:"请求时发生意外", text:"如反复出现请提issue<br>当前请求：<code>"+ err.config.url+"</code><br>请求返回："+err.message})
})

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
