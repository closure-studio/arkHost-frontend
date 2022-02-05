<template>
  <v-btn @click="test">test</v-btn>
</template>
<script>
  export default {
    methods:{
      test(){
        this.$notify('ssss')
      }
    }
  }
</script>