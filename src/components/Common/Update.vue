<template>
  <v-dialog persistent :value="show" width="500">
    <v-card>
      <v-card-title class="headline deep-purple white--text font-weight-black">
        闪断更新公告
      </v-card-title>
      <v-card-text class="mt-5">
        <span>
          <span
            class="blue white--text darken-2"
            style="padding: 1px 5px"
          >版本</span>
          <span
            class="grey white--text darken-2"
            style="padding: 1px 5px; margin-right: 10px"
          >{{ latestPost.version }}</span>
        </span>
        <span display="flex">
          <span
            class="green white--text darken-2"
            style="padding: 1px 5px"
          >日期</span>
          <span
            class="grey white--text darken-2"
            style="padding: 1px 5px; margin-right: 10px"
          >{{ latestPost.date }}</span>
        </span>
        <span display="flex" class="d-none d-lg-inline">
          <span
            class="orange white--text darken-2"
            style="padding: 1px 5px"
          >标题</span>
          <span
            class="grey white--text darken-2"
            style="padding: 1px 5px; margin-right: 10px"
          >{{ latestPost.title }}</span>
        </span>
        <div
          class="subtitle-1 text--primary font-weight-black"
          style="margin-top: 10px; margin-bottom: 5px"
        >
          近期更新内容
        </div>
        <div class="caption">
          <div v-for="eachType in ['stone', 'cloud', 'feature', 'fix', 'beautify']" :key="eachType">
            <div v-if="latestPost.list[eachType] !== undefined">
              <div class="body-2 font-weight-bold">
                <v-icon left small>
                  {{ getListIcon(eachType) }}
                </v-icon><span style="vertical-align: middle" class="text--primary">{{
                  getTypeName(eachType)
                }}</span>
              </div>
              <li
                v-for="eachItem in latestPost.list[eachType]"
                :key="eachItem"
                class="ml-2"
                style="list-style-type: circle"
              >
                {{ eachItem }}
              </li>
            </div>
          </div>
        </div>
      </v-card-text>
      <v-divider />
      <v-card-actions class="caption" v-html="tips"></v-card-actions>
      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn to="/Contributors" text @click="show = false" tile>
          <v-icon left>
            mdi-page-layout-sidebar-left
          </v-icon>广告：加入工程部
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="show = false"
          tile
        >
          此事平平无奇<v-icon right>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import log from "@/assets/update.json";

log.forEach((e) => {
  let temp = {};
  e.list.forEach((item) => {
    if (temp[item.type] === undefined) {
      temp[item.type] = [item.text];
    } else {
      temp[item.type].push(item.text);
    }
  });
  e.list = temp;
});

let latestPost = log[log.length - 1];

export default {
  data() {
    return {
      show: Boolean(),
      log: Object(),
      latestPost: latestPost,
      tips: "闪断补偿：没有！<br>补偿范围：" + latestPost.date + " 16:00更新前所有注册并绑定游戏UID的用户（不含游客账号）"
    };
  },
  mounted() {
    this.show = false;
    if (localStorage.getItem("ver") !== this.latestPost.version) {
      this.show = true;
      localStorage.setItem("ver", this.latestPost.version);
    }
  },
  methods: {
    getTypeName(name) {
      switch (name) {
        case "stone":
          return "里程碑";
        case "feature":
          return "特性";
        case "fix":
          return "修复";
        case "beautify":
          return "美化";
        default:
          return "其他";
      }
    },
    getListIcon: function (type) {
      switch (type) {
        case "feature":
          return "mdi-lightbulb-on";
        case "fix":
          return "mdi-bug";
        case "beautify":
          return "mdi-flower";
        case "stone":
          return "mdi-rocket";
        default:
          break;
      }
    }
  }
};
</script>
