<template>
  <v-row>
    <v-col cols="6" md="3" sm="6" lg="4" v-for="i in teams" >
      <v-card class="d-flex align-center py-4 flex-column">
          <v-avatar size="128" class="mb-4">
            <img :src="`https://res.arknights.host/team/${i[1]}.png`" alt="skadiD">
          </v-avatar>
       <span class="text-h5">{{i[0]}}</span>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
  export default {
    data(){
      return{
        teams: [["GK", "563255057"],["Ooooooutdated", "1228138940"],["32方混淆", "2370275150"],["孤星", "2823706257"],["skadiD", "10003653"]]
      }
    },
    created() {
      console.log('你有没有想过朋友不再是朋友')
      console.log('家园不再是家园?')
    }
  }
</script>