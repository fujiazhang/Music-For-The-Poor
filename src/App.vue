<template>
    <Header></Header>
      <keep-alive>
        <router-view/>
      </keep-alive>
    <Nav></Nav>
     <Player></Player>
</template>
<script>
import Nav from "@/components/nav/nav";
import Header from "@/components/m-header/m-header";
import Player from "@/components/player/player";

export default {
  name: "App",
  components: {
    Header,
    Nav,
    Player,
  },
};
</script>
<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
