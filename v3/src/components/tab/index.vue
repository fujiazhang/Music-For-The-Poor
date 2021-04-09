<template>
  <div class="nav">
    <router-link to="/home" class="nav-item" tag="div">
      <i class="iconfont iconshouye"></i>
      <span> 首页 </span>
    </router-link>
    <router-link to="/singer" class="nav-item" tag="div">
      <i class="iconfont iconliebiao1"></i>
      <span> 歌手 </span>
    </router-link>
    <router-link to="/mv" class="nav-item" tag="div">
      <i class="iconfont iconMV"></i>
      <span> MV </span>
    </router-link>
    <router-link to="/my" class="nav-item" tag="div">
      <i class="iconfont iconwodedangxuan"></i>
      <span> 我的 </span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>
<style lang="stylus" scoped>
.nav {
  position: fixed;
  display: flex;
  width: 100%;
  height: 50px;
  bottom: 0;
  left: 0;
  background: #fff;

  .nav-item {
    width: 33.333%;
    text-align: center;
    padding-top: 10px;

    i {
      display: block;
      padding-bottom: 5px;
      font-size: 20px;
    }

    span {
      display: block;
      font-size: 12px;
      color: #999;
    }
  }
}

.router-link-active {
  color: #e60026;

  span {
    color: #e60026 !important;
  }
}
</style>
