<template>
  <div class="flex flex-row gap-4 md:gap-10 flex-wrap justify-between">
    <div class="md:basis-[46%] lg:basis-[30%] ark-card relative">
      <div class="absolute right-0 left-0 top-0 bottom-0 opacity-20 bg-no-repeat"
           style="background-position:-532px -758px;background-image: url('https://assest.arknights.host/charpack/char_1012_skadi2_boc_4.webp')"/>
      <div class="flex flex-row">
        <div class="w-fit flex flex-col items-center">
          <div class="avatar">
            <div class="w-24 rounded-full ring ring-offset-base-100 ring-offset-2" :class="isLogin ? 'ring-success' : 'ring-error'">
              <img :src="'https://ak.dzp.me/dst/avatar/ASSISTANT/' + (gameInfo?.status?.secretary || 'npc_001_doctor') + '.webp'" alt="skadiD" />
            </div>
          </div>
        </div>
        <div class="w-full flex flex-col ml-6 lg:ml-4 overflow-hidden justify-between md:justify-center whitespace-nowrap">
          <span class="font-bold text-2xl md:text-3xl xl:text-5xl lg:text-4xl lg:text-center tracking-wider overflow-hidden text-ellipsis">
            Dr.<span class="text-info">{{ gameInfo?.status?.nickName || '【未登录】' }}</span>
          </span>
          <button class="btn btn-primary md:hidden z-10" @click="showModal = true">托管配置</button>
        </div>
      </div>
      <button class="btn btn-primary mt-8 hidden md:block z-10" @click="showModal = true">托管配置</button>
    </div>
    <div v-if="isLogin" class="md:basis-[46%] lg:basis-[30%] ark-card ark-pro font-bold lg:text-left">
      <div class="mt-1 pb-2 text-5xl flex flex-col">
        <div class="flex justify-between items-center">
          <span class="text-info text-2xl">理智</span>
          <div class="badge badge-primary p-4">Lv.{{gameInfo.status?.level}}</div>
        </div>
        <div class="text-center mt-1">
          <span class="text-6xl md:text-5xl 2xl:text-6xl text-primary">{{ nowAp }}</span> / {{ gameInfo.status?.maxAp || '-' }}
        </div>
      </div>
      <div class="divider text-info"> 理智溢出时间 </div>
      <div class="text-2xl text-center">{{ fullAp }}</div>
    </div>
    <div v-if="isLogin" class="basis-full lg:basis-[30%] ark-card ark-pro font-bold lg:text-left">
      <div class="mt-1 pb-2 text-5xl flex flex-col">
        <span class="text-info text-2xl">拓展面板</span>
        <div class="mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4 grid gap-4">
          <button class="btn btn-primary btn-outline btn-block h-16 text-3xl rounded-none">编队</button>
          <router-link :to="`/dashboard/${_account}/${_platform}`" class="btn btn-primary btn-outline btn-block h-16 text-3xl rounded-none">
            仓库
          </router-link>
          <router-link :to="`/account`" class="btn btn-primary btn-outline btn-block h-16 text-3xl rounded-none">
            认证
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="isLogin" class="basis-full lg:basis-[45%] xl:basis-[55%] ark-card ark-pro font-bold lg:text-left overflow-hidden">
      <div class="mt-1 pb-2 text-5xl flex flex-col">
        <span class="text-info text-2xl">托管日志</span>
        <div class="overflow-auto rounded max-h-96 mt-4">
          <table class="min-w-full text-sm">
            <thead>
              <tr class="text-info text-left text-xl">
                <th>时间</th>
                <th>事件</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-opacity-20 border-primary h-12 text-xl"
                  v-for="k in gameLog"
                  :class="{
                    'text-info': k.info.includes('高星提醒') || k.info.includes('[6★]'),
                    'text-primary': k.info.includes('战斗开启成功'),
                    'text-success': k.info.includes('获得物品') || k.info.includes('完成')
                  }">
                <td>{{ formatDate(k.ts, true) }}</td>
                <td>{{ k.info }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="isLogin && screenshots" class="basis-full lg:basis-[50%] xl:basis-[40%] ark-card ark-pro font-bold lg:text-left">
      <div class="mt-1 text-5xl flex flex-col">
        <span class="text-info text-2xl">不实时截图</span>
        <div class="carousel w-full mt-2">
          <div :id="'screen_' + (v + 1)" class="carousel-item relative w-full" v-for="(k, v) in screenshots">
            <img :src="'https://screenshot.dzp.me/' + k" class="w-full" alt="screen"/>
          </div>
        </div>
        <div class="flex justify-center w-full pt-3 gap-3">
          <a v-for="k in screenshots.length" :href="'#screen_' + k" class="btn btn-sm btn-outline btn-primary">{{ k }}</a>
        </div>
      </div>
    </div>
  </div>
  <Modal :showing="showModal" :close="close">
    <div class="card ark-pro bg-base-100 shadow-lg overflow-visible">
      <div class="card-body">
        <h1 class="card-title text-3xl text-info">托管配置</h1>
        <div class="divider my-2"/>
        <div class="card-actions space-y-3">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 gap-y-5 w-full">
            <div class="relative">
              <input type="text" id="f_1" class="float-input peer" placeholder=" " v-model.number="config.keepingAP"/>
              <label for="f_1" class="float-input-text">理智保留</label>
            </div>
            <div class="relative">
              <input type="text" id="f_2" class="float-input peer" placeholder=" " v-model.number="config.recruitReserve"/>
              <label for="f_2" class="float-input-text">公招券保留</label>
            </div>
            <span class="flex justify-between w-full text-info">
              是否基建排班<input type="checkbox" class="toggle" checked v-model="config.enableBuildingArrange" />
            </span>
            <span class="flex justify-between w-full text-info">
              忽略招募支援机械<input type="checkbox" class="toggle" checked v-model="config.recruitIgnoreRobot" />
            </span>
            <span class="flex justify-between w-full text-info">
              是否托管战斗<input type="checkbox" class="toggle" checked v-model="config.isAutoBattle" />
            </span>
          </div>
        </div>
        <div class="divider mb-1">托管地图<div class="btn btn-info btn-outline btn-sm" @click="showMapSearch = true">配置</div></div>
        <div class="gap-2 flex whitespace-nowrap flex-wrap mb-1 text-info">
          当前战斗队列：
          <div v-if="config.battleMaps?.length > 0" class="badge badge-primary p-3" v-for="k in config.battleMaps">{{ stageTable[k]?.code }}</div>
          <div v-else class="badge badge-primary p-3">暂未配置</div>
        </div>
        <div class="divider my-1">*点击保存才会提交托管地图</div>
        <button class="btn btn-primary btn-block" @click="saveCfg">保存</button>
      </div>
    </div>
  </Modal>
  <Modal :showing="showMapSearch" :close="close2">
    <div class="card ark-pro bg-base-100 shadow-lg overflow-visible">
      <div class="card-body">
        <h1 class="card-title text-3xl text-info">地图选择器 Beta</h1>
        <div class="flex whitespace-nowrap items-center mt-1">
          <div class="relative w-full">
            <input type="text" id="f_3" class="float-input peer" placeholder=" " v-model="mapKeyWord"/>
            <label for="f_3" class="float-input-text">关卡名或代号</label>
          </div>
          <button class="btn btn-info px-7 ml-4" @click="search">查找</button>
        </div>
        <div class="gap-2 flex whitespace-nowrap flex-wrap mt-1 text-info">
          当前战斗队列：
          <div v-if="battleMap_.length > 0" class="badge badge-primary p-3" v-for="k in battleMap_">{{ k }}</div>
          <div v-else class="badge badge-primary p-3">等待添加</div>
        </div>
        <div class="divider my-1"/>
        <div v-for="v in searchRes.slice((page - 1) * 5, page * 5)" @click="select(v.id, v.code)"
             class="ark-card my-2 lg:hover:translate-x-6 duration-500 group ">
          <MapItem :stage="v" :battleMap="battleMap"/>
        </div>
        <div class="grid grid-cols-2 gap-3 mt-3" v-if="searchRes.length > 0">
          <div class="btn btn-block btn-primary" :class="{'btn-disabled': page < 2}" @click="page--">上一页</div>
          <div class="btn btn-block btn-primary" :class="{'btn-disabled': page >= Math.ceil(searchRes.length / 5)}" @click="page++">下一页</div>
        </div>
        <button class="btn btn-primary btn-block" @click="submitStage">关闭</button>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
  import {useRoute} from "vue-router";
  import {apiConf, apiDetails, apiGameLog, apiScreenshots, apiConfEdit} from "../plugins/axios";
  import {computed, ref} from "vue";
  //@ts-ignore
  import {formatDate} from '../plugins/function.js'
  import Modal from "../components/element/Modal.vue";
  import {createToast} from "mosha-vue-toastify";
  import {stageTable} from "../store/data";
  import MapItem from "../components/MapItem.vue";

  const route = useRoute();
  const gameInfo = ref<Details>({} as Details);
  const gameLog = ref<Log[]>([]);
  const isLogin = ref(false);
  const _account = route.params.account as string
  const _platform = route.params.platform as string
  apiDetails(_account, _platform).then((res: any) => {
    isLogin.value = res.code === 1;
    gameInfo.value = res.data as Details || {};
  })
  // calc present time ap
  const nowAp = computed(() => {
    const t = gameInfo.value.status
    if (typeof t === "undefined") {
      return '-'
    }
    if (t.ap >= t.maxAp) {
      return t.ap
    }
    const _ap = t.ap + Math.floor((new Date().getTime() / 1000 - t['lastApAddTime']) / 360)
    return _ap > t.maxAp ? t.maxAp : _ap
  })
  const fullAp = computed(() => {
    const t = gameInfo.value.status
    if (typeof t === "undefined") {
      return '-'
    }
    if (nowAp.value >= t.maxAp) {
      return '理智已溢出，请及时使用'
    }
    const time = (t.maxAp - Number(nowAp.value)) * 360 + new Date().getTime() / 1000
    return formatDate(time, 'hh:mm:ss')
  })
  const screenshots = ref<string[]>([]);
  apiGameLog(_account, _platform).then((res: any) => {
    gameLog.value = res.data.reverse()
  })
  apiScreenshots(_account, _platform).then((res: any) => {
    screenshots.value = res.data?.[0]?.fileName
  })
  const config = ref<GameCfg>({} as GameCfg);
  apiConf(_account, _platform).then((res: any) => {
    config.value = res.data
  })
  const showModal = ref(false)
  const showMapSearch = ref(false)
  const close = () => {
    showModal.value = false
  }
  const close2 = () => {
    showMapSearch.value = false
  }
  const saveCfg = () => {
    console.log(config.value)
    apiConfEdit(_account, Number(_platform), config.value).then((res: any) => {
      if (res.code === 1) {
        createToast('修改成功', {
          showIcon: true,
          type: 'success',
          transition: 'bounce',
        })
      } else {
        createToast('修改失败：' + res.message, {
          showIcon: true,
          type: 'danger',
          transition: 'bounce',
        })
      }
    })
    close()
  }

  // battle map select
  const mapKeyWord = ref('')
  const searchRes = ref<Stage[]>([])
  const battleMap = ref<string[]>([])   // id
  const battleMap_ = ref<string[]>([])  // code
  const page = ref(1)
  const filter = (obj: any, func: Function) => {
    let ret = <Stage[]>[]
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && func(obj[key])) {
        obj[key].id = key
        ret.push(obj[key])
      }
    }
    return ret;
  }
  const search = () => {
    page.value = 1
    if (mapKeyWord.value === '') {
      createToast("请输入关卡关键词", {
        showIcon: true,
        type: "info",
        transition: "bounce",
      });
      searchRes.value = []
      return
    }
    searchRes.value = filter(stageTable.value, (item: Stage) => {
      let key = mapKeyWord.value.toUpperCase()
      if (item.name.includes(key) || item.code.includes(key)) {
        return item
      }
    }).reverse()
    console.log(searchRes.value)
  }
  const select = (mapID: string, mapName: string) => {
    if (!battleMap.value.includes(mapID)) {
      if (battleMap.value.length > 4) {
        createToast("当前托管队列已满", {
          showIcon: true,
          type: "warning",
          transition: "bounce",
        });
        return
      }
      battleMap.value.push(mapID)
      battleMap_.value.push(mapName)
      createToast("已添加到战斗队列", {
        showIcon: true,
        type: "success",
        transition: "bounce",
      });
    } else {
      battleMap.value = battleMap.value.filter(item => item !== mapID)
      battleMap_.value = battleMap_.value.filter(item => item !== mapName)
    }
  }
  const submitStage = () => {
    config.value.battleMaps = battleMap.value
    showMapSearch.value = false
  }
</script>