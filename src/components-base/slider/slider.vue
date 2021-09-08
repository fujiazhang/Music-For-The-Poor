<template>
  <div class="slide-banner">
    <div class="banner-wrapper">
      <div class="slide-banner-wrapper" ref="sliderRef">
        <div class="slide-banner-content">
          <div v-for="item in sliders" class="slide-page" :class="'page' + item" :key="item">
            <a href="https://music.163.com/" target="_blank"><img :src="item" alt="" srcset=""></a>
          </div>
        </div>
      </div>
      <div class="dots-wrapper">
        <span
          class="dot"
          v-for="(item,index) in sliders"
          :key="item"
          :class="{'active': currentPageIndex === index}"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {ref} from 'vue'
  import useSlider from './use-slider'

  export default {
    props:{
      sliders:{
        type:Array,
        default:()=>[]
      } 
    },
    setup() {
      const sliderRef = ref(null)
      const {currentPageIndex} = useSlider(sliderRef)

      return {
        sliderRef,
        currentPageIndex
      }
    }
   
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

.slide-banner
  .banner-wrapper
    position relative
  .slide-banner-wrapper
    min-height 1px
    overflow hidden
  .slide-banner-content
    white-space nowrap
    font-size 0
    .slide-page
      display inline-block
      width 100%
      line-height 200px
      text-align center
      font-size 26px
      a
        display block
        img
          display block
          width 100%
  .dots-wrapper
    position absolute
    bottom 4px
    left 50%
    transform translateX(-50%)
    .dot
      display inline-block
      margin 0 4px
      width 8px
      height 8px
      border-radius 50%
      background #eee
      &.active
        width 20px
        border-radius 5px
        background $color-sub-theme
  .btn-wrap
    margin-top 20px
    display flex
    justify-content center
    button
      margin 0 10px
      padding 10px
      color #fff
      border-radius 4px
      background-color #666

</style>
