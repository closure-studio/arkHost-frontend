import axios from "axios";
import { createToast } from "mosha-vue-toastify";
import { userStore } from "../store/user";
import { useRouter } from "vue-router";

function FindBetterHost() {
  // define a array to store the host

  const apiHost : { [key: string]: number } = {
    'https://api-a.arknights.host': -1,
    'https://api-b.arknights.host': -1,
    'https://api-c.arknights.host': -1,
    'https://devapi.arknights.host':-1,
  }
const path = '/Nodes';
const promiseArray = [];

// go through the apiHost, apiHost is dict
for (let key in apiHost) {
  // using axios and async to get the data
  const ping = async (url: string) => {
    try {
      let startTime = Date.now();
      const response = await axios.get(url + path, { timeout: 2000 });
      apiHost[url] = Date.now() - startTime;
    } catch (error) {
      console.error(error);
    }
  };
  // push the promise to promiseArray
  promiseArray.push(ping(key));
}
Promise.all(promiseArray).then(() => {
  // go through the apiHost, apiHost is dict
  // find the fastest host, ignore the host which is -1
  let fastestHost = '';
  let fastestTime = 999999;
  for (let key in apiHost) {
    if (apiHost[key] != -1 && apiHost[key] < fastestTime) {
      fastestHost = key;
      fastestTime = apiHost[key];
    }
  }
  // if the fastestHost is not empty, set the host to localStorage
  if (fastestHost != '') {
    localStorage.setItem('host', fastestHost);
  }
});
}
FindBetterHost()

const service = axios.create({
  baseURL: localStorage.getItem('host') || "https://devapi.arknights.host/",
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
      router.push({ path: "/login" }).catch(() => { });
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
    service.delete(url, { data: params }).then((res) => {
      resolve(res);
    });
  });
}
function load(fileName: string) {
  return new Promise((resolve) => {
    axios.get(`/data/${fileName}.json`).then((res) => {
      resolve(res.data);
    });
  });
}
export default service;
export const apiRegister = (params: any) => post("Auth", params); // Register
export const apiLogin = (params: string) => get(`Auth/${params}`); // Login
export const apiReLogin = (token: string) => get(`Auth/${token}`); // ReLogin
export const apiCron = () => get("Nodes"); // Cron
export const apiAnnounce = () => get("System/Announcement"); // Announce
export const apiAddGame = (params: any) => post("Game", params); // GameCreate
export const apiGameLogin = (params: any) => post("Game/Login", params); // GameLogin
export const apiGameLog = (account: string, platform: string) => get(`Game/Log/${account}/${platform}/0`); // GameLog
export const apiListGame = () => get("Game"); // GameList
export const apiDelGame = (params: any) => del("Game", params); // Del
export const apiScreen = (account: string, platform: string) =>
  get(`Game/Screenshot/${account}/${platform}`); // GetScreen
export const apiDetails = (account: string, platform: string) =>
  get(`Game/${account}/${platform}`); // GetDetails
export const apiConf = (account: string, platform: string) =>
  get(`Game/Config/${account}/${platform}`); // GetConf
export const apiConfEdit = (account: string, platform: number, params: GameCfg) =>
  post(`Game/Config/${account}/${platform}`, params); // UpdateConfig
export const apiLog = (account: string, platform: number, index: string) =>
  get(`Log/${account}/${platform}/${index}`); // Log
export const apiScreenshots = (account: string, platform: string) =>
  get(`Game/Screenshots/${account}/${platform}`); // GetScreen
export const apiGetMapList = () => get("System/Maps"); // GetMapList

export const apiGetLog = () => get("System/LogFile"); // GetLog
export const apiGameDataUpdate = () => post("System/GameDataUpdate", {}); // UpdateData
export const apiEditAnnounce = (params: any) =>
  post("System/Announcement", params); // EditAnnounce
export const apiStatus = () => get("System/Status"); // Status
export const TableStage = () => load("Stage");
export const TableStage_ = () => load("stage_table");
export const TableItems_ = () => load("item_table");
export const TableItems = () => load("Items");

export const adminResetPasswd = (account: string, password: string) =>
  post(`System/Password/${account}/${password}`, {}); // ResetPasswd
export const adminBan = (account: string, code: string) =>
  post(`System/Account/Status/${account}/${code}`, {}); // Ban
export const apiGeetestSet = (account: string, platform: number, params: any) => post(`Game/Captcha/${account}/${platform}`, params) // Geetest
export const apiReqOCR = (account: string, platform: string) => post(`Game/Ocr/${account}/${platform}`, {}) // OCR