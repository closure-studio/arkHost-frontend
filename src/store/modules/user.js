const user = {
	namespaced: true,
	state: {
		isLogin: false,
		lastLoginTs: 0
	},
	mutations: {
		Load(state, data) {
			for(let k in data){
				state[k] = data[k]
			}
			state.isLogin = true
			state.lastLoginTs = Date.now()
		},
		Exit(state){
			for(let k in state){
				state[k] = 0
			}
		},
	},
	actions: {
		load(context, data) {
			context.commit('Load', data)
		},
		exit(context) {
			context.commit('Exit')
		},
	}
}

export default user;