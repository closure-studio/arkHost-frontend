const config = {
	namespaced: true,
	state: {
		Dark: true,
		Debug: true,
	}, 
	mutations: {
		Dark(state) {
			state.Dark = !state.Dark;
		},
		Debug(state) {
			state.Debug = !state.Debug;
		},
	},
	actions: {
		dark(c) {
			c.commit('Dark')
		},
		debug(c) {
			c.commit('Debug')
		},
	}
}
export default config;