<template>
  <v-dialog v-model="dialog" :fullscreen="$vuetify.breakpoint.smAndDown" width="60%" hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar >
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>挂机日志</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="">
            导出数据(没有)
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list three-line subheader>
        <div class="text-center mt-4">
          <span class="text-h4 blue--text">在过去 {{ ((new Date().valueOf() / 1000 - old.time) / 3600).toFixed(2) }} 小时里</span><br>
          <span class="text-h6 text--secondary">你的账号发生了这样的变化</span>
        </div>
        <span class="text-h6 ml-4 orange--text">基础信息</span>
        <div class="d-flex align-center pt-0 justify-space-between flex-wrap" :class="$vuetify.breakpoint.smAndDown ? 'mx-3' : 'mx-10'">
          <div class="d-flex align-center" v-for="k in diff.status">
            <v-avatar :size="$vuetify.breakpoint.smAndDown ? 48 : 64">
              <img :src="'https://ak.dzp.me/dst/items/'+k[2]+'.webp'">
            </v-avatar>
            <span class="text--secondary ml-1" :class="$vuetify.breakpoint.smAndDown ? 'text-h5' : 'text-h4'"><code>{{ (k[0] - k[1]).format() }}</code></span>
          </div>
        </div>
      </v-list>
      <v-divider class="mb-2" />
      <div class="pb-5">
        <span class="text-h6 ml-4 orange--text">仓库资源变化</span>
        <div class="item mx-4" :style="'grid-template-columns: repeat(auto-fill, minmax(' + ($vuetify.breakpoint.smAndDown ? '125' : '160') + 'px, 1fr));'">
          <Item :num="k[0]" :add='(k[0] - k[1]).format()' :item="v" v-for="(k,v) in diff.items"/>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<style>

</style>
<script>
  Number.prototype.format = function() {
    return this > 0 ? '+' + this : this.toString();
  }
  import Divider from "@/components/Common/divider";
  import Item from "@/components/Item";
  export default {
    props: {
      details: {
        type: Object,
        default: () => ({})
      },
      account: 0
    },
    components: {Item, Divider},
    data () {
      return {
        dialog: true,
        notifications: false,
        sound: true,
        widgets: false,
        diff: {
          status: {},
          items: {}
        }
      }
    },
    computed: {
      old() {
        //console.log(this.$store.state.items[this.account][0])
        return this.$store.state.items[this.account][0]
      }
    },
    created() {
      for (const k in this.details.status) {
        const map = {'exp': 'EXP_PLAYER', 'socialPoint': 'SOCIAL_PT', 'gachaTicket': 'TKT_GACHA', 'tenGachaTicket': 'TKT_GACHA_10', 'recruitLicense': 'TKT_RECRUIT', 'ap': 'AP_GAMEPLAY', 'gold': 'GOLD'}
        if (map[k]) {
          //console.log(k, this.details.status[k], this.old.status[k])
          if (this.details.status[k] !== this.old.status[k]) {
            this.diff.status[k] = [this.details.status[k], this.old.status[k], map[k]]
          }
        }
      }
      for (const k in this.details['inventory']) {
        console.log(this.old.items)
        if (this.details['inventory'][k] !== this.old.items[k]){
          this.diff.items[k] = [this.details['inventory'][k], this.old.items[k]]
        }
      }
    },
    watch: {
      dialog(v) {
        if (!v)
          this.$store.dispatch('items/logs', {
            account: this.account,
            status: this.details.status,
            items: this.details['inventory']
          })
      }
    }
  }
</script>