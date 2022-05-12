<template>
  <div class="pb-4 d-flex align-center">
    <v-divider class="mr-5"></v-divider><p class="green--text font-weight-bold text-center mb-0 subtitle-1">{{ msg }}</p><v-divider class="ml-5"></v-divider>
  </div>
</template>
<script>
  export default {
    props: {
      msg: String
    }
  }

</script>