import axios from "axios";
import { createToast } from "mosha-vue-toastify";
import { userStore } from "../store/user";
import { useRouter } from "vue-router";

const service = axios.create({
  baseURL: localStorage.getItem('host') || "https://api.arknights.host/",
});
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    if (err.response.status == 401) {
      createToast("登录过期，请重新登录", {
        showIcon: true,
        type: "danger",
        transition: "bounce",
      });
      userStore().logout();
      const router = useRouter();
      router.push({ path: "/login" }).catch(() => {});
      return;
    }
    createToast("网络故障，请稍后重试", {
      showIcon: true,
      type: "danger",
      transition: "bounce",
    });
    console.log(err);
  }
);
function post(url: string, params: object) {
  return new Promise((resolve) => {
    service.post(url, params).then((res) => {
      resolve(res);
    });
  });
}
function get(url: string) {
  return new Promise((resolve) => {
    service.get(url).then((res) => {
      resolve(res);
    });
  });
}
function del(url: string, params: any) {
  return new Promise((resolve) => {
    axios.delete(url, { data: params }).then((res) => {
      resolve(res);
    });
  });
}
export default service;
export const apiRegister = (params: any) => post("Auth", params); // Register
export const apiLogin = (params: string) => get(`Auth/${params}`); // Login
export const apiReLogin = (token: string) => get(`Auth/${token}`); // ReLogin
export const apiCron = () => get("Nodes"); // Cron
export const apiAnnounce = () => get("System/Announcement"); // Announce
export const apiAddGame = (params: any) => post("Game", params); // Game
export const apiGameLogin = (params: any) => post("Game/Login", params); // Game
export const apiListGame = () => get("Game"); // GameList
export const apiDelGame = (params: any) => del("Game", params); // Del
export const apiScreen = (account: string, platform: string) =>
  get(`Game/Screenshot/${account}/${platform}`); // GetScreen
export const apiDetails = (account: string, platform: string) =>
  get(`Game/${account}/${platform}`); // GetDetails
export const apiConf = (account: string, platform: string) =>
  get(`Game/Config/${account}/${platform}`); // GetConf
export const apiConfEdit = (account: string, platform: number, params: any) =>
  post(`Game/Config/${account}/${platform}`, params); // UpdateConfig
export const apiLog = (account: string, platform: number, index: string) =>
  get(`Log/${account}/${platform}/${index}`); // Log
export const apiScreenshots = (account: string, platform: number) =>
  get(`Game/Screenshots/${account}/${platform}`); // GetScreen
export const apiGetMapList = () => get("System/Maps"); // GetMapList

export const apiGetLog = () => get("System/LogFile"); // GetLog
export const apiGameDataUpdate = () => post("System/GameDataUpdate", {}); // UpdateData
export const apiEditAnnounce = (params: any) =>
  post("System/Announcement", params); // EditAnnounce
export const apiStatus = () => get("System/Status"); // Status
