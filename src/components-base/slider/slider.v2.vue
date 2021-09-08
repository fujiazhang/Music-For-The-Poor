<template>
  <div class="slide-banner">
    <div class="banner-wrapper">
      <div class="slide-banner-wrapper" ref="slide">
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
  import BScroll from '@better-scroll/core'
  import Slide from '@better-scroll/slide'

  BScroll.use(Slide) //注册使用插件

  export default {
    data() {
      return {
        currentPageIndex: 0  
      }
    },
    props:{
      sliders:{
        type:Array,
        default:()=>[]
      } 
    },
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.slide.destroy()
    },
    methods: {
      init() {
        this.slide = new BScroll(this.$refs.slide, {
          scrollX: true,
          scrollY: false,
          slide: true,
          momentum: false,
          bounce: false,
          probeType: 3
        })
        this.slide.on('scrollEnd', this._onScrollEnd)

        this.slide.on('slideWillChange', (page) => {
          this.currentPageIndex = page.pageX
        })

        // v2.1.0
        this.slide.on('slidePageChanged', (page) => {
          console.log('CurrentPage changed to => ', page)
        })
      },
      _onScrollEnd () {
        console.log('CurrentPage => ', this.slide.getCurrentPage())
      },
      nextPage() {
        this.slide.next()
      },
      prePage() {
        this.slide.prev()
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
