<template>
    <div  class="item">
        <div class="img-wrapper" v-lazy:background-image="data.pic"  @click="selectPlay">
            <i class=" playIcon iconfont iconziyuan" v-show="showPlayIcon"></i>
            <div class="loadng" v-show="showLoading">
                <Loading :playerIconColor="'red'" />
            </div>
            <video
                class="video"
                ref="video"
                @click.stop="togglePlay"
                v-show="showVideo"
                webkit-playsinline=""
                playsinline=""
                x5-playsinline=""
                @playing="startPlay"
                @waiting="waiting"
                x-webkit-airplay="allow">
            </video>
        </div>
        <div class="title">
            {{data.title}}
        </div>
        <div class="info-box">
            <div class="info-l">
                <div class="avatar">
                    <img  v-lazy="data.owner.face"  alt="" srcset="">
                </div>
                <div class="name">
                    {{data.owner.name}}
                </div>
            </div>
            <div class="info-r">
                <div class="item" style="margin-right:20px">
                    <i class="iconfont iconxihuan"></i>
                    <span>{{data.stat.like}}</span>
                </div>
                <div class="item" style="margin-right:20px">
                    <i class="iconfont iconpinglun"></i>
                    <span>{{data.stat.reply}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getVideoUrl } from '@/api/mv'
import Loading from '@/base/loading/loading'
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {
        }
      }
    },
    posY: {}
  },
  data () {
    return {
      showVideo: false,
      showLoading: false,
      showPlayIcon: true
    }
  },
  components: {
    Loading
  },
  created () {
  },
  watch: {

  },
  methods: {
    hideVideo () {
      console.log('执行关闭')
      this.$refs.video.src = ''
      this.$refs.video.pause()
      this.showVideo = false
      this.showLoading = false
      this.showPlayIcon = true
    },
    async selectPlay () {
      try {
        this.$emit('setVideo', this.data.aid)
        this.showPlayIcon = false
        this.showVideo = true
        this.showLoading = true
        let res = await getVideoUrl(this.data.aid, this.data.cid)
        /*
        避免快速点击播放后点击关闭（请求已发出）
        而在 异步操作获取到真实地址play方法前 已将当前视频关闭
        所以加一个判断当前 this.showVideo
        */
        if (this.showVideo) {
          this.$refs.video.src = res.data.url
          this.$refs.video.play()
        }
      } catch (error) {
        console.log(error)
      }
    },
    waiting () {
      this.showLoading = true
    },
    startPlay () {
      this.showLoading = false
    },
    togglePlay () {
      if (this.$refs.video.paused) {
        this.showPlayIcon = false
        this.$refs.video.play()
      } else {
        this.showPlayIcon = true
        this.$refs.video.pause()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/mixin'
.img-wrapper
    position relative
    width calc(100% - 20px)
    height 180px
    margin  0 auto
    background-size cover
    border-radius 10px
    .video
        width 100%
        height 100%
        border-radius 10px
        background #000
    .playIcon
        position absolute
        font-size 28px
        transform translate(-50%,-50%)
        left 50%
        top 50%
        color #ebecec
    .loadng
        position absolute
        top 50%
        left 50%
        transform translate(-50%,-50%)
.title
    padding 20px 0
    box-sizing border-box
    no-wrap()
    padding-left 10px
    text-align left
.info-box
    display flex
    justify-content space-between
    .info-l
        display flex
        align-items center
        .avatar
            width 25px
            height 25px
            padding-left 10px
            margin-right 5px
            img
                width 100%
                height 100%
                border-radius 50%
    .info-r
        display flex
        align-items center
        .item
            width 50px
            position relative
            text-align left
            i
                margin-right 5px
            span
                position absolute
                left 20px
                top 0px
                color  #999

</style>
