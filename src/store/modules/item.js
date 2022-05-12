const items = {
	namespaced: true,
	state: {
		test: [{time:'ts', status: "json1", items: "json2"}]
	},
	mutations: {
		Log(state, data) {
			state[data.account] = [{
				time: Math.floor(new Date().valueOf() / 1000),
				status: data.status,
				items: data.items
			}]
		},
		Reset(state, account){
			state[account] = []
		},
	},
	actions: {
		logs(context, data) {
			context.commit('Log', data)
		},
		reset(context, account) {
			context.commit('Reset', account)
		},
	}
}
export default items;