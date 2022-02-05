<template>
	<v-dialog v-model="show" persistent max-width="290">
		<v-card>
			<v-card-title class="text-h5">
				提示
			</v-card-title>
			<span class="text--secondary pl-6">{{this.title}}</span>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="show = false">
					取消
				</v-btn>
				<v-btn color="green darken-1" text @click="submit">
					确认
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
  export default {
    props: {
      visible: {type: Boolean},
      title: {type: String},
    },
	computed:{
		show: {
			set(v){
				this.$emit('close', v)
			},
			get(){
				return this.visible
			}
		},
	},
	methods:{
		submit(){
			this.show = false
			this.$emit('submit', true)
		}
	}
  }
</script>