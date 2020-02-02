<template>
    <div class="music-list">
        <div class="nav">
            <div class="back" @click="back">&lt;</div>
            <div class="nav-text">{{info.name}}</div>
        </div>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="filter">
                <div class="filter-box" ref="filterBox" v-show="info.name !== ''">
                    <div class="song-des-box">
                        <!-- <div class="img">
                            <img :src="info.avatar" alt="" srcset="">
                        </div>
                        <div class="text-box">
                            <h2>{{info.name}}</h2>
                            <h3>{{discInfo.creator.name}} · 创建</h3>
                            <p>播放数 · {{discInfo.playCount}}</p>
                        </div> -->
                    </div>
                </div>
            </div>

        </div>
        <scroll
            class="list"
            ref="list"
            :data="list"
            @scroll="scroll"
            :listen-scroll="true"
            :probe-type="3"
            :pullingUp="true"
            @pullingUp="pullingUp"
            >
            <div class="song-box">
                <div class="song-title"><i></i>播放全部</div>
                <div class="song-list">
                    <SongList :list="list"/>
                </div>
                <div class="loading-container">
                    <Loading :playerIconColor="'red'" v-show="showLoading"></Loading>
                    <p class="no-more" v-show="noMore">没有更多了...</p>
                </div>

            </div>
        </scroll>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import SongList from '@/components/song-list/song-list'
const RESERVED_HEIGHT = 50

export default {
  props: {
    info: {
      type: Object,
      default () {
        return {
        }
      }
    },
    list: {
      typeo: Object,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      scrollY: 0,
      showLoading: true,
      page: 1,
      noMore: false
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.info.avatar})`
    }
  },
  created () {
    this.SET_PLAY_ICON_COLOR('white')
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  activated () {
    this.SET_PLAY_ICON_COLOR('white')
  },
  deactivated () {
    this.SET_PLAY_ICON_COLOR('black')
  },
  destroyed () {
    this.SET_PLAY_ICON_COLOR('black')
  },
  methods: {
    back () {
      this.$router.back()
    },
    pullingUp () {
      this.showLoading = true
      this.$emit('pullingUp', this.page)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    finishPullUp () {
      this.page = this.page + 1
      this.$refs.list.finishPullUp()
    },
    noMoreText () {
      this.showLoading = false
      this.noMore = true
    },
    ...mapMutations({
      'SET_PLAY_ICON_COLOR': 'SET_PLAY_ICON_COLOR'
    })
  },
  watch: {
    scrollY (newVal) {
      let zIndex = 0
      if (newVal < this.minTransalteY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
        this.$refs.filterBox.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.filterBox.style.display = ''
      }
      this.$refs.bgImage.style.zIndex = zIndex
    },
    list () {
      this.finishPullUp()
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
.music-list
    position: fixed;
    left 0
    top 0
    right 0
    bottom 0
    z-index: 100;
    background: #fff;
    .nav
        width calc(100% - 15px)
        height 49px;
        display flex;
        align-items center;
        position: fixed;
        top: 0;
        left: 6px;
        z-index: 50;
        color #fff
        .back
            width 15px
            font-size 20px
        .nav-text
            flex 1
            text-align center
            font-size 16px
    .bg-image
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        transform-origin: top
        background-size: cover
        .filter-box
            display flex
            justify-content center
            height 100%;
            width 100%;
            .song-des-box
                display flex
                color #fff
                align-items center
                padding 0 20px;
                box-sizing border-box;
                .text-box
                    height 100px
                    padding-left 10px
                    display: flex;
                    align-items: center;
                    h2
                        font-size 16px
                        margin-bottom 10px
                        line-height 1.2

                    h3
                        font-size 12px
                        color #f9f9f9
                        line-height 1.2
                        margin-bottom 10px
                    p
                        font-size 12px
                        color #f9f9f9
                        line-height 1.2

                .img
                    img
                        width 100px
        .filter
            position: absolute;
            backdrop-filter:blur(10px)
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(7,17,27,.4);

    .list
        position: absolute
        bottom: 0
        width: 100%
    .song-box
        width 100%
        padding 10px 10px
        // margin-top -20px
        background #fff
        // border-radius 15px
        box-sizing border-box
        .song-title
            font-size 16px
            padding-bottom 20px
            color #333
        .loading-container
            text-align center
            .no-more
                font-size 12px
                color #999
</style>
