<template>
  <v-row dense class="justify-center">
    <v-col :cols="$vuetify.breakpoint.smAndDown ? 12 : 8">
      <Expansion :data="history" />
    </v-col>
  </v-row>
</template>
<script>
  import Expansion from '@/components/Common/Expansion';
  import data from '@/assets/update.json'
  export default {
    components: {
        Expansion
    },
    data() {
      return {
        history: data
      }
    },
    created() {
      console.log(data)
    }
  }
</script>