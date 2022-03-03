<template>
  <div>
    <v-pagination
      v-model="userPagePrev" :length="parseInt((total+9) / 10)"
      :v-show="true" circle class="pb-3"
    />
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left" v-for="k in head">
            {{k}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="r in gameList">
          <td>{{ r.ID }}</td>
          <td>{{ r.Username }}</td>
          <td>{{ r.Status == 1 ? '禁言' : '正常' }}</td>
          <td :style="'color: '+groupName[r.UserGroup].Color">{{ groupName[r.UserGroup].Name }}</td>
          <td>{{ formatDate(r.CreatedAt, true) }}</td>
          <td>
            <v-btn disabled small>修改</v-btn>
            <v-btn v-if="r.Status !== 1" class="ml-2" color="red" small @click="nukeUser(r.ID)">禁言</v-btn>
            <v-btn v-else class="ml-2" color="red" small @click="disnukeUser(r.ID)">解封</v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
  export default {
    props: {
      head: {
        type: Array,
        default: []
      },
      items: {
        type: Array,
        default: []
      },
      total: Number
    },
    data:() => ({
      userPagePrev: 0
    }),
    computed:{
      gameList(){
        return this.items
      }
    }
  }
</script>
