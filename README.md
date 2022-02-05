# arkHost-frontend
> 本项目是 [ArkHost](https://github.com/closure-studio/ArkHost) 的前端仓库


## 客制化修改

#### vue-notification

由于vuetify使用了和 `vue-notification` 相同的 `warn` `info` `error` 等颜色关键词 ~~（还蠢的离谱）~~ ，导致样式出错

**因此统一规范修改后的使用方式**

修改 `vue-notification` / `Notification.vue` 中 L399-L409 上述关键词，仅保留其首字母
```css
.vue-notification.w {
  background: #ffb648;
  border-left-color: #f48a06;
}

.vue-notification.e {
  background: #E54D42;
  border-left-color: #B82E24;
}

.vue-notification.s {
  background: #68CD86;
  border-left-color: #42A85F;
}
```