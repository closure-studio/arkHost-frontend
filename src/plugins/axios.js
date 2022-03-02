import axios from 'axios'
import Vue from "vue";

axios.defaults.baseURL = "http://146.56.166.61:7778/"
axios.interceptors.response.use(response => {
	return response.data
}, err => {
	Vue.notify({
		type: "e", duration: 50000,
		title:"请求时发生意外",
		text:`如反复出现请提issue<br>当前请求：<code>${err.config.url}</code><br>请求返回：${err.message}`
	})
})
function post(url, params) {
	return new Promise((resolve) => {
		axios.post(url, params).then(res => {
			resolve(res)
		})
	})
}
function get(url) {
	return new Promise((resolve) => {
		axios.get(url).then(res => {
			resolve(res)
		})
	})
}
export default axios
export const apiRegister = params => post('Auth', params) // Register
export const apiLogin = params => get(`Auth/${params}`) // Login
export const apiCron = () => get('Nodes') // Cron
export const apiAnnounce = () => get('System/Announcement') // Cron