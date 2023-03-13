<template>
  <div class="ark-card relative">
    <span class="card-title text-info">平台公告</span>
    <span class="text-lg mt-2" style="white-space: break-spaces"> {{ ann }}</span>
    <loading v-if="load">
      <div class="flex items-center justify-center">
        <div class="w-16 h-16 border-4 border-dashed rounded-full animate-spin-slow border-info"/>
      </div>
    </loading>
  </div>
  <div class="flex flex-row mt-4 flex-wrap md:flex-nowrap">
    <div class="basis-full md:basis-1/3 md:mr-4 mb-4">
      <div class="ark-card" style="overflow: unset">
        <div class="space-y-1.5">
          <span class="card-title text-info justify-center">快速开始</span>
          <span class="text-info text-lg">所属服务器：</span>
          <Select :value="_plat" :data="platform" v-on:valueSelect="onPlat"/>
          <span class="text-info text-lg">账号：</span>
          <input class="ark-input" v-model="addNew.account" />
          <span class="text-info text-lg">密码：</span>
          <input class="ark-input" v-model="addNew.password" />
        </div>
        <button class="btn btn-info btn-outline btn-block mt-6 rounded-none" @click="login">登录</button>
      </div>
    </div>
    <div class="basis-full md:basis-3/4">
      <div class="ark-card ark-pro">
        <span class="card-title text-info justify-center">托管列表</span>
      </div>
      <div class="ark-card mt-3">
        <div class="grid ark-grid gap-4">
          <div class="rounded-md px-4 py-5 ark-cardItem shadow-3xl relative" v-for="(k, v) in list">
            <loading opacity="opacity-90" v-if="showDel[v]">
              <div class="text-primary text-lg z-10 flex items-center">
                <div class="text-2xl font-bold flex flex-col gap-y-6">
                  真的要删除吗？
                  <button class="btn btn-error block btn-outline" @click="del(k.config.account, k.config.platform)">
                    确认删除
                  </button>
                </div>
              </div>
            </loading>
            <loading opacity="opacity-90" v-else-if="k.status.code === 999">
              <div class="text-primary text-lg z-10 flex items-center">
                <button class="btn btn-primary block btn-outline" @click="captcha(k)">
                  点击进行滑块验证
                </button>
              </div>
            </loading>
            <loading opacity="opacity-80" v-else-if="k.status.code === 1">
              <div class="text-primary text-lg z-10 flex items-center">
                登录中...
              </div>
            </loading>
            <div @click="jump(k)" v-if="k.config?.account">
              <div class="flex justify-between items-center">
                <span class="text-lg tracking-wider font-bold whitespace-nowrap text-ellipsis overflow-hidden">账号：{{account(k.config.account)}}</span>
                <div class="badge p-3 px-4" :class="k.config.platform === 1 ? 'badge-primary' : 'badge-info'">
                  {{k.config.platform === 1 ? '官' : 'B'}}服
                </div>
              </div>
              <div class="divider text-primary">详细信息</div>
              <div class="flex flex-col font-normal text-lg">
              <span class="flex justify-between w-full">
                当前状态：<span :class="statusColor(k.status.code)" class="font-bold">{{k.status.text}}</span>
              </span>
                <span class="flex justify-between w-full">
                托管地图：<span class="font-bold">{{stageTable[k.game_config.mapId]?.code || '-'}}</span>
              </span>
                <span class="flex justify-between w-full">
                理智保留：<span class="font-bold">{{k.game_config.keepingAP}}</span>
              </span>
                <span class="flex justify-between w-full">
                基建排班：<input type="checkbox" class="toggle" checked v-model="k.game_config.enableBuildingArrange" />
              </span>
              </div>
            </div>
            <div class="flex justify-between mt-2">
              <button class="btn btn-outline btn-sm w-[45%] h-10" :class="k.status.code === 2 ? 'btn-primary' : 'btn-warning'" @click="k.status.code === 2 ? pause(k) : run(k)">
                {{k.status.code === 2 ? '暂停' : '启动'}}
              </button>
              <button class="btn btn-outline btn-error btn-sm w-[45%] h-10" @click="showDel[v] = true">
                删除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  apiAnnounce,
  apiListGame,
  apiDelGame,
  apiConf,
  apiConfEdit,
  apiGameLogin,
  apiGeetestSet, apiAddGame,
} from "../plugins/axios";
import {stageTable} from "../store/data";
import {ref} from "vue";
import {createToast} from "mosha-vue-toastify";
import Select from "../components/element/Select.vue";
import Loading from "../components/loading.vue";
import {useRouter} from "vue-router";

// 获取公告
const ann = ref('加载中...')
const load = ref(true)
const list = ref<GameInfo[]>([])
const showDel = ref<boolean[]>([])
apiAnnounce().then((res: any) => {
  load.value = false
  if (res.code) {
    ann.value = res.data["announcement"]
  } else {
    createToast('读取公告失败', {
      showIcon: true,
      type: 'danger',
      transition: 'bounce',
    })
  }
})
const getList = () => {
  setTimeout(() => {
    apiListGame().then((res: any) => {
      list.value = res.data
      })
  }, 5000)
}

getList()
const _plat = ref('官服')
const platform = ['官服', 'B服']
const addNew = ref({
  platform: 1,
  account: '',
  password: '',
})
const onPlat = (val: string) => {
  _plat.value = val;
  addNew.value.platform = val === '官服' ? 1 : 2
}
const statusColor = (code: number) => {
  switch (code) {
    case -1:
      return 'text-red-500'
    case 0:
      return 'text-orange-500'
    case 1: // 登录中
      return 'text-blue-500'
    case 2:
      return 'text-green-500'
    case 999: // 需要验证码
      return 'text-purple-600'
    default:
      return ''
  }
}
const del = (account: string, platform: number) => {
  apiDelGame({
    account: account,
    platform: platform
  }).then((res: any) => {
    if (res.code) {
      createToast('删除成功', {
        showIcon: true,
        type: 'success',
        transition: 'bounce',
      })
      apiListGame().then((res: any) => {
        list.value = res.data
      })
    } else {
      createToast('删除失败', {
        showIcon: true,
        type: 'danger',
        transition: 'bounce',
      })
    }
  })
}
const pause = (data: GameInfo) => {
  apiConf(data.config.account, data.config.platform.toString()).then((res: any) => {
    if (res.code === 1){
      const req = res.data as GameCfg
      req.isStopped = true
      apiConfEdit(data.config.account, data.config.platform, req).then((res: any) => {
        if (res.code === 1){
          createToast('暂停成功', {
            showIcon: true,
            type: 'success',
            transition: 'bounce',
          })
          apiListGame().then((res: any) => {
            list.value = res.data
          })
        } else {
          createToast('暂停失败', {
            showIcon: true,
            type: 'danger',
            transition: 'bounce',
          })
        }
      })
    }
  })
}
const run = (data: GameInfo) => {
  apiGameLogin(data.config).then((res: any) => {
    if (res.code === 1){
      //getList()
      createToast('登录成功', {
        showIcon: true,
        type: 'success',
        transition: 'bounce',
      })
    } else {
      createToast('登录失败', {
        showIcon: true,
        type: 'danger',
        transition: 'bounce',
      })
    }
  })
}
const captcha = (data: GameInfo) => {
  // @ts-ignore
  if (window["initGeetest"] === undefined) {
    console.log("没有初始化Geetest")
    return
  }
  createToast('加载验证码中...', {
    showIcon: true,
    type: 'info',
    transition: 'bounce',
  })
  // @ts-ignore
  window.initGeetest({
    gt: data.captcha_info.gt,
    challenge: data.captcha_info.challenge,
    offline: false,
    product: "bind",
    width: "300px",
    https: true,
    // @ts-ignore
  }, (captchaObj) => {
    captchaObj.onReady(() => {
      // @ts-ignore
      captchaObj.verify();
    })
    captchaObj.onSuccess(() => {
      const validate = captchaObj.getValidate();
      createToast('提交成功，正在登录...', {
        showIcon: true,
        type: 'success',
        transition: 'bounce',
      })
      apiGeetestSet(data.config.account, data.config.platform, {
        challenge: data.captcha_info.challenge,
        geetest_challenge: validate.geetest_challenge,
        geetest_seccode: validate.geetest_seccode,
        geetest_validate: validate.geetest_validate,
        success: true
      }).then(() => {
        //getList()
      })
      captchaObj.destroy(); // 这里是销毁实例，处理完逻辑最终销毁
    })
    captchaObj.onError(() => {
      createToast('验证码加载失败', {
        showIcon: true,
        type: 'danger',
        transition: 'bounce',
      })
    })
  })
}
const router = useRouter()
const jump = (data: GameInfo) => {
  router.push({
    path: `/details/${data.config.account}/${data.config.platform}`
  })
}
const login = () => {
  apiAddGame(addNew.value).then((res: any) => {
    if (res.code === 1){
      createToast('添加成功', {
        showIcon: true,
        type: 'success',
        transition: 'bounce',
      })
      //getList()
    } else {
      createToast('添加失败', {
        showIcon: true,
        type: 'danger',
        transition: 'bounce',
      })
      createToast(res.message, {
        showIcon: true,
        type: 'danger',
        transition: 'bounce',
      })
    }
  })
}
const account = (val: string) => {
  val = val.replace(/(\d{3})\d{6}(\d{2})/, '$1****$2')
  return val.length > 12 ? val.substring(0, 10) + '···' : val
}
</script>
