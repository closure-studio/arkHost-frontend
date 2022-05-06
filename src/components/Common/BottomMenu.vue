<template>
  <v-bottom-sheet
    v-model="show"
    no-click-animation
    :retain-focus="false"
  >
    <v-list>
			<v-subheader>抽水马桶v1.0</v-subheader>
			<v-list-item
				v-for="r in rows"
				@click="jump(r.event)"
			>
				<v-list-item-avatar>
					<v-avatar size="32px" tile>
						<v-icon>{{r.icon}}</v-icon>
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-title>{{ r.name }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-bottom-sheet>
</template>
<script>
export default {
	props:{
		visible: {type: Boolean, default: false}
	},
	computed: {
    show: {
      set(v){ this.$emit('close', v) },
      get(){ return this.visible }
    }
	},
	data: () => ({
		rows: [{
      name: '服务监控',
      event: '/cron',
      icon: 'mdi-power-plug'
    },{
      name: '后勤分队',
      event: '/contributors',
      icon: 'mdi-account-group'
    },{
      name: '闪断记录',
      event: '/history',
      icon: 'mdi-history'
    }]
	}),
	methods:{
		jump(event) {
			this.show = false
			this.$router.push(event).catch()
		}
	}
}
</script>