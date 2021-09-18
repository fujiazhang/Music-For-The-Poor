<template>
    <div class="music-list">
        <div class="nav">
            <div class="back" @click="back">&lt;</div>
            <div class="nav-text">歌单</div>
        </div>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="filter">
                <div class="filter-box" ref="filterBox" v-show="discInfo.dissname !== ''">
                    <div class="song-des-box">
                        <div class="img">
                            <img :src="discInfo.headurl" alt="" srcset="">
                        </div>
                        <div class="text-box">
                            <h2>{{discInfo.dissname}}</h2>
                            <h3>{{discInfo.nickname}} · 创建</h3>
                            <p>播放数 · {{discInfo.visitnum}}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <scroll class="list" ref="list"  @scroll="scroll"
            :listen-scroll="true" :probe-type="3">
            <div class="song-box">
                <div class="song-title"><i></i>播放全部</div>
                <div class="song-list">
                    <SongList :list="discInfo.songlist"/>
                </div>
                <div v-show="!discInfo.songlist.length" class="loading-container">
                    <!-- <Loading :playerIconColor="'red'"></Loading> -->
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import Scroll from "@/components-base/scroll/scroll";
// import Loading from '@/base/loading/loading'
import SongList from "@/components/song-list/song-list";
const RESERVED_HEIGHT = 50;

export default {
  props: {
    bgImage: {
      type: String,
      default: "",
    },
    discInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      scrollY: 0,
    };
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`;
    },
  },
  created() {
    this.SET_PLAY_ICON_COLOR("white");
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.imageHeight}px`;
  },
  activated() {
    this.SET_PLAY_ICON_COLOR("white");
  },
  destroyed() {
    this.SET_PLAY_ICON_COLOR("black");
  },
  methods: {
    back() {
      this.$router.back();
    },
    scroll(pos) {
      this.scrollY = pos.y;
    },
    ...mapMutations({
      SET_PLAY_ICON_COLOR: "SET_PLAY_ICON_COLOR",
    }),
  },
  watch: {
    scrollY(newVal) {
      let zIndex = 0;
      if (newVal < this.minTransalteY) {
        zIndex = 10;
        this.$refs.bgImage.style.paddingTop = 0;
        this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
        this.$refs.filterBox.style.display = "none";
      } else {
        this.$refs.bgImage.style.paddingTop = "70%";
        this.$refs.bgImage.style.height = 0;
        this.$refs.filterBox.style.display = "";
      }
      this.$refs.bgImage.style.zIndex = zIndex;
    },
  },
  components: {
    Scroll,
    SongList,
    // Loading
  },
};
</script>
<style lang="stylus" scoped>
.music-list {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: #fff;

  .nav {
    width: calc(100% - 15px);
    height: 49px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 6px;
    z-index: 50;
    color: #fff;

    .back {
      width: 15px;
      font-size: 20px;
    }

    .nav-text {
      flex: 1;
      text-align: center;
      font-size: 16px;
    }
  }

  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 80%;
    transform-origin: top;
    background-size: cover;

    .filter-box {
      display: flex;
      justify-content: center;
      height: 100%;
      width: 100%;

      .song-des-box {
        display: flex;
        color: #fff;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;

        .text-box {
          display: flex;
          flex-flow: column;
          align-items: center;
          padding-left: 10px;

          h2 {
            font-size: 16px;
            margin-bottom: 10px;
            line-height: 1.2;
          }

          h3 {
            font-size: 12px;
            color: #f9f9f9;
            line-height: 1.2;
            margin-bottom: 10px;
          }

          p {
            font-size: 12px;
            color: #f9f9f9;
            line-height: 1.2;
          }
        }

        .img {
          img {
            width: 100px;
            border-radius: 50%;
          }
        }
      }
    }

    .filter {
      position: absolute;
      backdrop-filter: blur(10px);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }

  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .song-box {
    width: 100%;
    padding: 10px 10px;
    // margin-top -20px
    background: #fff;
    // border-radius 15px
    box-sizing: border-box;

    .song-title {
      font-size: 16px;
      padding-bottom: 20px;
      color: #333;
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
    }
  }
}
</style>
