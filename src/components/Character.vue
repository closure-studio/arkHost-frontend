<template>
  <v-card height="128px">
    <v-row style="margin:0;height:100%">
      <v-col cols="4" :style="'padding:5px 0 0 0;background:url('+src+'avatar/ASSISTANT/'+char['charId']+'.webp) center bottom / 95% no-repeat'">
        <v-avatar size="32" tile style="-webkit-box-shadow:2px 2px 2px #1e1e1e;float:right">
          <img style="filter:invert(100%)" src="/assets/group/Caster.png">
        </v-avatar>
        <v-avatar color="purple" rounded size="36">
          {{char['level']}}
        </v-avatar>
      </v-col>
      <v-col cols="2" class="d-flex">
        <v-divider
            class="mr-2"
            vertical
        ></v-divider>
        <div class="d-flex flex-column justify-space-between">
          <v-avatar tile size="48">
            <img :src="'/assets/e'+char['evolvePhase']+'.png'">
          </v-avatar>
          <v-avatar size="48">
            <img :src="'/assets/rank/'+char['potentialRank']+'.png'">
          </v-avatar>
        </div>
      </v-col>
      <v-col v-for="k in char['skills']" cols="2" class="d-flex flex-column align-center justify-center">
        <v-badge :color="k['specializeLevel'] ? 'red' : 'blue'" bordered right overlap :content="k['specializeLevel'] ? k['specializeLevel'] : char['mainSkillLvl']">
          <v-avatar tile :size=" $vuetify.breakpoint.smAndDown ? '36' : '50'">
            <img :src="src + 'static/skills/skill_icon_'+k['skillId']+'.webp'">
          </v-avatar>
        </v-badge>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        src: "https://res.arknights.host/dst/"
      }
    },
    props: {
      char: {
        type: Object,
        default: () => {},
      },
    }
  }
</script>