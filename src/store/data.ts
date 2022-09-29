import {ref} from "vue";
import {TableItems, TableStage, TableStage_} from "../plugins/axios";

const stageTable = ref<any>({})
const items = ref<Items>({} as Items)

TableStage().then((resp: any) => {
    stageTable.value = resp
})
// TableStage_().then((resp: any) => {
//     for (let k in resp.stages) {
//         if (!k.includes('camp') && !k.includes('#f#') && !k.includes('bossrush') && !k.includes('act1lock_a') && !k.includes('act17d7_01') && !k.includes('lt_') && !k.includes('tr_')) {
//             if (resp.stages[k]['apCost'] > 0) {
//                 let items = []
//                 for (let item of resp.stages[k]['stageDropInfo']['displayRewards']) {
//                     if (item['dropType'] === 2 || item['dropType'] === 3) {
//                         items.push(item['id'])
//                     }
//                 }
//                 if (items.length > 0) {
//                     stageTable.value[k] = {
//                         name: resp.stages[k]['name'],
//                         code: resp.stages[k]['code'],
//                         ap: resp.stages[k]['apCost'],
//                         items: items
//                     }
//                 }
//             }
//         }
//     }
//     console.log(JSON.stringify(stageTable.value))
// })

TableItems().then((resp: any) => {
    items.value = resp
})
// TableItems_().then((resp: any) => {
//   let items = {} as any
//   for (let k in resp.items) {
//     items[k] = {
//       name: resp.items[k]['name'],
//       icon: resp.items[k]['iconId']
//     }
//   }
//   console.log(JSON.stringify(items))
// })
export { stageTable, items }