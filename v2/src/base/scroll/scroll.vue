<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    scrollEnd: {
      type: Boolean,
      default: false
    },
    pullingUp: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        pullUpLoad: this.pullingUp
      })
      if (this.listenScroll) {
        let _this = this
        this.scroll.on('scroll', (pos) => {
          _this.$emit('scroll', pos)
        })
      }
      if (this.scrollEnd) {
        let _this = this
        this.scroll.on('scrollEnd', (pos) => {
          _this.$emit('scrollEnd', pos)
        })
      }
      if (this.pullingUp) {
        let _this = this
        this.scroll.on('pullingUp', () => {
          _this.$emit('pullingUp')
        })
      }
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
