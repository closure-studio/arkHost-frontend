<template>
  <v-card v-if="num !== 0">
    <v-img class="item-image" :src="'https://ak.dzp.me/dst/items/' + $items['items'][item]['iconId'] + '.webp'" />
    <p class="item-content">{{ $items['items'][item]['name'] }}</p>
    <p class="item-count">× {{ num }}<span class="blue--text" v-if="add"> ( {{ add }} )</span></p>
  </v-card>
</template>
<style lang="sass">
.item
  display: grid
  grid-gap: 1rem

.item-image
  position: relative
  left: 8px
  width: 100px
  height: 100px

.item-count
  color: white
  position: absolute
  right: 0
  top: 0
  background-color: rgba(0, 0, 0, .6)
  padding: 2.5px 5px
  margin: 0
  pointer-events: none !important

.item-content
  color: white
  position: absolute
  right: 0
  background-color: rgba(0, 0, 0, .6)
  padding: 2.5px 5px
  bottom: 0
  margin-bottom: 0 !important
  pointer-events: none !important

.item-time
  color: white
  position: absolute
  right: 12px
  bottom: 15px
  background-color: rgba(0, 0, 0, .6)
  padding: 2.5px 5px
  margin: 0
  pointer-events: none !important
</style>
<script>
  export default {
    props: {
      item: '',
      num: '',
      add: '',
    },
  }
</script>
