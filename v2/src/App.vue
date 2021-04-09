<template>
  <div id="app">
    <Header></Header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Player></Player>
    <Nav></Nav>
  </div>
</template>
<script>
import Header from '@/components/m-header/m-header'
import Player from '@/components/player/player'
import Nav from '@/components/nav/nav'
export default {
  components: {
    Header,
    Player,
    Nav
  }

}
</script>
<style lang="stylus">
</style>
