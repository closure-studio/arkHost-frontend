import { defineStore } from "pinia";

export const configStore = defineStore("config", {
  state: () => ({
    config: {
      url: "",
    },
  }),
  actions: {
    setUrl(url: string) {
      this.config.url = url;
    },
  },
});
