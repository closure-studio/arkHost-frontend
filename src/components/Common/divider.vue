<template>
  <div class="px-4 pb-4 d-flex align-center">
    <v-divider class="mr-4 ml-2"></v-divider><p class="text--secondary text-center mb-0">{{ msg }}</p><v-divider class="ml-4 mr-2"></v-divider>
  </div>
</template>
<script>
  export default {
    props: {
      msg: String
    }
  }

</script>