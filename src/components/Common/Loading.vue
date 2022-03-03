<template>
  <v-overlay :absolute="true" :value="overlay">
    <v-progress-circular
        indeterminate
        size="64"
    ></v-progress-circular>
  </v-overlay>
</template>
<script>
  export default {
    props: {
      overlay: {
        type: Boolean,
        default: false
      }
    }
  }
</script>