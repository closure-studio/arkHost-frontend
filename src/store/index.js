/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Skadi
 * @Date: 2021-07-05 08:48:49
 * @LastEditTime: 2021-07-19 21:21:50
 */
import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'

import user from "@/store/modules/user";
import items from "@/store/modules/item";
import config from "@/store/modules/config";
//import item from "@/store/modules/item";

Vue.use(Vuex)
export default new Vuex.Store({
	plugins: [persistedState({
		key: 'arkHost'
	})],
	modules: {
		user, config, items
	},
});
