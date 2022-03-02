import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './plugins/axios'
import Notifications from 'vue-notification'
import vuetify from './plugins/vuetify'


import VueAxios from 'vue-axios'

import '@/assets/index.css'

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VueAxios, axios)
Vue.prototype.formatDate = function (value, details = false) {
  let date = new Date(value * 1000);
  let y = date.getFullYear().toString(),
      m = date.getMonth() + 1,
      d = date.getDate();
  let h, min;
  if (details) {
    h = date.getHours()
    min = date.getMinutes()
    if (h < 10) {
      h = '0' + h;
    }
    if (min < 10) {
      min = '0' + min;
    }
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  y = y.substring(y.length - 2)
  let str = y + '-' + m + '-' + d + ' '
  return details ? str + h + ':' + min : str
}
new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
