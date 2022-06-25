import { defineStore } from "pinia";

export const userStore = defineStore("user", {
  state: () => ({
    user: {
      isLogin: false,
      token: "",
    },
  }),
  actions: {
    login(token: string) {
      this.user.isLogin = true;
      this.user.token = token;
    },
    logout() {
      this.$reset();
    },
  },
});
