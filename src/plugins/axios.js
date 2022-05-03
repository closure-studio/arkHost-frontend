import axios from 'axios'
import Vue from "vue";

axios.defaults.baseURL = "https://api.arknights.host/"
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
function del(url, params) {
	return new Promise((resolve) => {
		axios.delete(url, {data:params}).then(res => {
			resolve(res)
		})
	})
}
export default axios
export const apiRegister = params => post('Auth', params) // Register
export const apiLogin = params => get(`Auth/${params}`) // Login
export const apiReLogin = (token) => get(`Auth/${token}`) // ReLogin
export const apiCron = () => get('Nodes') // Cron
export const apiAnnounce = () => get('System/Announcement') // Announce
export const apiAddGame = params => post('Game', params) // Game
export const apiGameLogin = params => post('Game/Login', params) // Game
export const apiListGame = () => get('Game') // GameList
export const apiDelGame = params => del('Game', params) // Del
export const apiScreen = (account, platform) => get(`Game/Screenshot/${account}/${platform}`) // GetScreen
export const apiDetails = (account, platform) => get(`Game/${account}/${platform}`) // GetDetails
export const apiConf = (account, platform) => get(`Game/Config/${account}/${platform}`) // GetConf
export const apiConfEdit = (account, platform, params) => post(`Game/Config/${account}/${platform}`, params) // UpdateConfig
export const apiLog = (account, platform, index) => get(`Log/${account}/${platform}/${index}`) // Log
export const apiScreenshots = (account, platform) => get(`Game/Screenshots/${account}/${platform}`) // GetScreen
export const getChars = () => get(`https://jackjieyyy.github.io/ArknightsGameData/zh_CN/gamedata/excel/activity_table.json`)
