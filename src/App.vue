<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Player></Player>
  </div>
</template>
<script>
import Player from '@/components/player/player'
export default {
  components: {
    Player
  }

}
</script>
<style lang="stylus">
</style>
