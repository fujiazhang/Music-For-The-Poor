<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn" v-show="songReady"></div>
        <div class="loading" v-show="!songReady">
          <div class="loader">
            <div class="face">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { prefixStyle } from '@/common/js/dom'

const progressBtnWidth = 16
const transform = prefixStyle('transform')

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    songReady: {
      type: Boolean
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    progressTouchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
      this.$emit('percentChanging', this._getPercent())
    },
    progressTouchEnd () {
      this.touch.initiated = false
      this._triggerPercent()
    },
    progressClick (e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
      // this._offset(e.offsetX)
      this._triggerPercent()
    },
    setProgressOffset (percent) {
      if (percent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const offsetWidth = percent * barWidth
        this._offset(offsetWidth)
      }
    },
    _triggerPercent () {
      this.$emit('percentChange', this._getPercent())
    },
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    },
    _getPercent () {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      return this.$refs.progress.clientWidth / barWidth
    }
  },
  watch: {
    percent (newPercent) {
      this.setProgressOffset(newPercent)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 2px
      background: #ABABAB
      .progress
        position: absolute
        height: 100%
        background: #fff
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid #fff
          border-radius: 50%
          background: #999
.loading
  width 100%
  height 100%
  display flex
  align-items center
  margin-left 7.5px
.loader
    width: 15px;
    height: 15px
    font-size: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
.loader .face:nth-child(1) {
    width: 100%;
    height: 100%;
    color: #ababab;
    border-color: currentColor currentColor transparent transparent;
    border-width: 0.2em 0em 0em 0.2em;
    --deg: -135deg;
    animation-direction: reverse;
}
.loader .face .circle {
    position: absolute;
    width: 50%;
    height: 0.1em;
    top: 50%;
    left: 50%;
    background-color: transparent;
    transform: rotate(var(--deg));
    transform-origin: left;
}
.loader .face .circle::before {
    position: absolute;
    top: -0.25em;
    right: -0.25em;
    content: '';
    width: .5em;
    height: .5em;
    background-color: currentColor;
    border-radius: 50%;
    // box-shadow: 0 0 2em, 0 0 4em, 0 0 6em, 0 0 8em, 0 0 10em, 0 0 0 0.5em rgba(255, 255, 0, 0.1);
}

.loader .face {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    animation: animate 1.5s linear infinite;
}
@keyframes animate  {
  100% {
    transform: rotate(1turn);
  }
}

</style>
