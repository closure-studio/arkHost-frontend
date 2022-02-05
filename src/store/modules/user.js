const user = {
	namespaced: true,
	state: {
		token: '',
		isLogin: false
	},
	mutations: {
		Load(state, data) {
			state.token = data
			state.isLogin = true
		},
		Cache(state, data){
			for(let k in data){
				state[k] = data[k]
			}
		},
		Exit(state){
			for(let k in state){
				state[k] = 0
			}
			state.isLogin = false
		},
	},
	actions: {
		load(context, data) {
			context.commit('Load', data)
		},
		exit(context) {
			context.commit('Exit')
		},
		cache(context, data){
			context.commit('Cache', data)
		},
	}
}

export default user;