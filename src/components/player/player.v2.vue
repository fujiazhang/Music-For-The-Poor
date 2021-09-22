<template>
    <div class="player-box">
        <div class="mini-playerricon"  @click="open" v-show="!searchBoxFocue">
            <MusicAnimation></MusicAnimation>
        </div>
        <transition appear name="slide">
            <div class="player" v-show="fullScreen">
                <div class="nav">
                    <div class="back" @click="back"><i class="iconfont iconfanhui"></i></div>
                    <div class="nav-text">{{currentSong.name}}</div>
                </div>
                <div class="normal-player">
                    <div class="background">
                      <img v-show="currentSong.image" :src="currentSong.image" alt="" width="100%" height="100%">
                    </div>
                    <div class="middle">
                      <div class="cd-wrapper">
                        <img  v-show="currentSong.image" :src="currentSong.image" alt="">
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="progress-wrapper">
                        <span  class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                          <ProgressBar  :percent="percent" :songReady="songReady"  @percentChange="onProgressBarChange"
                            @percentChanging="onProgressBarChanging"></ProgressBar>
                        </div>
                        <span  class="time time-r">{{format(duration)}}</span>
                      </div>
                    <div class="operators">
                        <!-- <div class="icon i-left">
                          <i class="iconfont iconxunhuan"></i>
                        </div> -->
                        <div class="icon i-left">
                          <i class="iconfont iconshangyishoushangyige" @click="prev"></i>
                        </div>
                        <div class="icon i-center">
                          <i class="iconfont iconziyuan" v-show="!playing" @click="togglePlaying(true)"></i>
                          <i class="iconfont iconzanting" v-show="playing"  @click="togglePlaying(false)"></i>
                        </div>
                        <div class="icon i-right">
                          <i class="iconfont icon49xiayishou" @click="next"></i>
                        </div>
                        <!-- <div class="icon i-right"> -->
                          <!-- <i class="iconfont icon49xiayishou"></i> -->
                        <!-- </div> -->
                    </div>
                    </div>
                </div>
            </div>
        </transition>
        <audio ref="audio"
           @playing="ready"
           @error="error"
           @timeupdate="updateTime"
           @ended="end"
           @pause="paused">
        </audio>

  </div>
</template>
<script>
import MusicAnimation from "@/components-base/music-animation/music-animation";
import ProgressBar from "@/components-base/progress-bar/progress-bar";
// import { getSongUrl } from "@/api/song";
import { mapGetters, mapMutations } from "vuex";
import { playMode } from "@/common/js/config";
export default {
  components: {
    MusicAnimation,
    ProgressBar,
  },
  computed: {
    ...mapGetters([
      "fullScreen",
      "currentSong",
      "playing",
      "playlist",
      "currentIndex",
      "mode",
      "searchBoxFocue",
    ]),
    percent() {
      return this.currentTime / this.duration;
    },
  },
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: "",
      isPureMusic: false,
      pureMusicLyric: "",
      duration: "",
    };
  },
  watch: {
    currentSong(newSong, oldSong) {
      let _this = this;
      /* 确认点击的是否当前播放 */
      if (newSong.id === oldSong.id) {
        return;
      }
      this.songReady = false;
      //   this.canLyricPlay = false
      //   if (this.currentLyric) {
      //     this.currentLyric.stop()
      //     // 重置为null
      //     this.currentLyric = null
      //     this.currentTime = 0
      //     this.playingLyric = ''
      //     this.currentLineNum = 0
      //   }
      // if (newSong.url) {
      //   this.$refs.audio.src = newSong.url
      //   this.$refs.audio.play()
      //   //   // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
      //   clearTimeout(this.timer)
      //   this.timer = setTimeout(() => {
      //     this.songReady = true
      //   }, 5000)
      //   //   this.getLyric()
      // } else {
      // 有用
      // getSongUrl(newSong.id, newSong.cid).then(function (e) {
      //   if (!_this.currentSong.image) {
      //     // 有图片则不在设置
      //     _this.currentSong.image = e.data.data.pic;
      //   }
      //   _this.currentSong.url = e.data.data["320k"];
      //   _this.$refs.audio.src = _this.currentSong.url;
      //   _this.$refs.audio.play();
      //   // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
      //   clearTimeout(_this.timer);
      //   _this.timer = setTimeout(() => {
      //     _this.songReady = true;
      //   }, 5000);
      // });

      // }
    },
  },
  methods: {
    // 点击搜索框时 小图标给取消按钮让位

    open() {
      this.SET_FULLSCREEN(true);
    },
    back() {
      this.SET_FULLSCREEN(false);
    },
    ready() {
      clearTimeout(this.timer);
      // 监听 playing 这个事件确保慢网速或者快速切换歌曲导致的 DOM Exception
      this.songReady = true;
      this.duration = this.$refs.audio.duration;
      //   this.canLyricPlay = true
      // this.savePlayHistory(this.currentSong)
      // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
      //   if (this.currentLyric && !this.isPureMusic) {
      //     this.currentLyric.seek(this.currentTime * 1000)
      //   }
    },
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    onProgressBarChanging(percent) {
      if (this.songReady) {
        this.currentTime = this.$refs.audio.duration * percent;
      }
    },
    onProgressBarChange(percent) {
      if (this.songReady) {
        const currentTime = this.$refs.audio.duration * percent;
        this.currentTime = currentTime;
        this.$refs.audio.currentTime = currentTime;
      }
    },
    togglePlaying(flag) {
      if (!this.songReady) {
        return;
      }
      if (flag) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
      this.SET_PLAYING_STATE(flag);
    },
    next() {
      if (!this.songReady) {
        return; // 确保音乐资源已经准备好，避免报错
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.SET_CURRENT_INDEX(index);
        if (!this.playing) {
          this.togglePlaying(true);
        }
      }
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        // this.loop()
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playlist.length - 1;
        }
        this.SET_CURRENT_INDEX(index);
        if (!this.playing) {
          this.togglePlaying(true);
        }
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.SET_PLAYING_STATE(true);
      // if (this.currentLyric) {
      // this.currentLyric.seek(0)
      // }
    },
    error() {
      clearTimeout(this.timer);
      this.songReady = true;
    },
    paused() {
      //   this.SET_PLAYING_STATE(false)
      //   if (this.currentLyric) {
      //     this.currentLyric.stop()
      //   }
    },
    end() {
      this.currentTime = 0;
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    ...mapMutations({
      SET_FULLSCREEN: "SET_FULLSCREEN",
      SET_PLAYING_STATE: "SET_PLAYING_STATE",
      SET_CURRENT_INDEX: "SET_CURRENT_INDEX",
      SET_PLAY_MODE: "SET_PLAY_MODE",
    }),
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/mixin';

.mini-playerricon {
  position: fixed;
  z-index: 150;
  right: 10px;
  top: 24.5px;
  width: 30px;
  transform: translateY(-50%);
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.slideFadeIn-enter-active, .slideFadeIn-leave-active {
  transition: all 0.3s;
}

.player {
  position: fixed;
  z-index: 160;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: #Fff;

  .nav {
    width: calc(100% - 15px);
    height: 49px;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 6px;
    z-index: 160;
    color: #fff;

    .back {
      width: 15px;
      font-size: 20px;
      width: 25px;
      font-size: 20px;
      height: 25px;
      text-align: center;
    }

    .nav-text {
      flex: 1;
      text-align: center;
      font-size: 16px;
      padding: 0 40px;
      box-sizing: border-box;
      no-wrap();
    }
  }

  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: #222;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 120px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        box-sizing: border-box;
        padding-top: 80%;

        img {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-radius: 50%;
          border: 10px solid hsla(0, 0%, 100%, 0.1);
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 95%;
        margin: 0 auto;
        padding: 10px 0;

        .progress-bar-wrapper {
          flex: 1;
        }

        .time {
          color: #ccc;
          font-size: 12px;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
        }

        .time-l {
          text-align: left;
        }

        .time-r {
          text-align: right;
        }
      }
    }

    .operators {
      width: 70%;
      margin: 0 auto;
      display: flex;
      align-items: center;

      .icon {
        flex: 1;
        color: #fff;
        text-align: center;

        i {
          font-size: 22px;
        }
      }

      .i-center {
        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
