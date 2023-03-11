import { createApp } from "vue";
import { createPinia } from "pinia";
import { persist } from "pinia-persists";
import { router } from "./router/router";
import { fpjsPlugin } from '@fingerprintjs/fingerprintjs-pro-vue-v3';
import VueClickAway from "vue3-click-away";
import service from "./plugins/axios";
import App from "./App.vue";
import "mosha-vue-toastify/dist/style.css";
import BaseLayout from "./components/layout/BaseLayout.vue";
import "./assets/index.css";
import "./assets/style.css";
import "/src/plugins/gt.js"

const app = createApp(App);
const pinia = createPinia();
pinia.use(
  persist({
    prefix: "arkhost",
  })
);
app.use(VueClickAway);
app.use(fpjsPlugin, {
  loadOptions: {
    apiKey: "Q8Rj2cKiLVb9VVjSTZcG",
    endpoint: "https://closure-fingerprint.arknights.host"
  },
})
app.component("layout", BaseLayout);
app.config.globalProperties.$axios = service;
app.use(router).use(pinia).mount("#app");
