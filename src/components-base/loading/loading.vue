<template>
    <div class="wrapper">
        <span class="line1" :class="iconColor"></span>
        <span class="line2" :class="iconColor"></span>
        <span class="line3" :class="iconColor"></span>
        <span class="line4" :class="iconColor"></span>
    </div>
</template>
<script>
export default {
  name:'loading',
  props: {
    color: {
      type: String,
      default:''
    }
  },
  computed: {
    iconColor () {
      if (this.color === 'black') {
        return 'black'
      }

      if (this.color === 'red') {
        return 'red'
      }
      if (this.color === 'white') {
        return 'white'
      }
      return ''
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper {
    display: inline-block;
    height: 30px;
    line-height: 40px;
    text-align: center;
    position: relative;
    vertical-align: bottom;
}
span {
        display: inline-block;
        width: 2px;
        margin-bottom: 0;

        margin-right: -8px;
    }
    .black{
        background-color: #333;
    }
    .white{
        background-color #fff;
    }
    .red{
        background-color red;
    }
    .line1 {
        // alternate意为应该轮流反向播放动画
        animation: line 0.6s infinite ease-in-out alternate;
    }

    .line2 {
        animation: line 0.6s 0.2s infinite ease-in-out alternate;
    }

    .line3 {
        animation: line 0.6s 0.4s infinite ease-in-out alternate;
    }

    .line4 {
        animation: line 0.6s 0.6s infinite ease-in-out alternate;
    }

    @keyframs line {
        from {
            height: 0;
        }
        to {
            height: 20px;
        }
    }

    @-webkit-keyframes line {
        from {
            height: 0;
        }
        to {
            height: 20px;
        }
    }
</style>
