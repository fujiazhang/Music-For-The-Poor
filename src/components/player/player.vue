<template>
    <div class="player-box">
        <div class="mini-playerricon"  @click="open" v-show="!searchBoxFocue">
            <MusicAnimation></MusicAnimation>
        </div>
        <transition appear name="slide">
            <div class="player" v-show="fullScreen">
                <div class="nav">
                    <div class="back" @click="back"><i class="iconfont iconfanhui"></i></div>
                    <div class="nav-text" v-if="currentSong">
                      {{currentSong.songname}}
                    </div>
                    <div class="down" v-if="_IsPC">
                      <a :href="audioPlayUrl" target="_black" :download="currentSong.songname" >
                        <i class="iconfont iconxiazai"></i>
                      </a>
                    </div>
                    <div class="down" v-else @click="showTips('请在pc端进行下载😣')">
                      <i class="iconfont iconxiazai"></i>
                    </div>
                </div>
                <div class="normal-player">
                    <div class="background" v-if="currentSong">
                      <img :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentSong?.albummid}.jpg`" alt="" width="100%" height="100%">
                    </div>
                    <div class="middle">
                      <div class="cd-wrapper" v-show="currentSong">
                        <img  :src="`https://y.gtimg.cn/music/photo_new/T002R300x300M000${currentSong?.albummid}.jpg`" alt="">
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
         <audio ref="audioRef"
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
import { useStore } from "vuex";
import { computed, watch, ref } from "vue";
import { Api } from "@/api";
import { IsPC } from "@/common/js/util";
import { playMode } from "@/common/js/config";
export default {
  name: "player",
  components: {
    MusicAnimation,
    ProgressBar,
  },
  setup() {
    const store = useStore();
    const fullScreen = computed(() => store.state.fullScreen);
    const searchBoxFocue = computed(() => store.state.searchBoxFocue);
    const playlist = computed(() => store.state.playlist);
    const playing = computed(() => store.state.playing);
    const currentSong = computed(() => store.getters.currentSong);
    const currentIndex = computed(() => store.state.currentIndex);
    const mode = computed(() => store.state.mode);
    const _IsPC = computed(() => IsPC());

    const audioRef = ref(null);
    let audioPlayUrl = ref(null);
    let songReady = ref(false);
    let currentTime = ref(0);
    let duration = ref(1);
    let percent = computed(() => {
      return currentTime.value / duration.value;
    });

    watch(currentIndex, (newCurrentIndex) => {
      getSong(newCurrentIndex);
    });

    watch(playing, (newPlaying) => {
      const audioEl = audioRef.value;
      newPlaying ? audioEl.play() : audioEl.pause();
    });

    async function getSong(newCurrentIndex) {
      try {
        songReady.value = false;
        let res = await Api.PlayerApi.getSongPlayUrl(
          playlist.value[newCurrentIndex]?.songmid
        );
        const audioEl = audioRef.value;
        audioEl.src = res.data[playlist.value[newCurrentIndex]?.songmid];
        audioPlayUrl.value = res.data[playlist.value[newCurrentIndex]?.songmid];
        audioEl.play();
        setTimeout(() => {
          songReady.value = true;
        }, 500);
      } catch (error) {
        console.log(error);
      }
    }

    function open() {
      if (playing.value) {
        store.commit("SET_FULLSCREEN", true);
      }
    }

    function back() {
      store.commit("SET_FULLSCREEN", false);
    }

    function _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    }

    function format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = _pad(interval % 60);
      return `${minute}:${second}`;
    }

    function showTips(str) {
      alert(str);
    }

    function togglePlaying(flg) {
      store.commit("SET_PLAYING_STATE", flg);
    }

    function loop() {
      const audioEl = audioRef.value;
      audioEl.currentTime = 0;
      audioEl.play();
      store.commit("SET_PLAYING_STATE", true);
      // if (this.currentLyric) {
      // this.currentLyric.seek(0)
      // }
    }

    function next() {
      if (!songReady.value) {
        return; // 确保音乐资源已经准备好，避免报错
      }
      if (playlist.value.length === 1) {
        loop();
      } else {
        let index = currentIndex.value + 1;
        if (index === playlist.value.length) {
          index = 0;
        }
        store.commit("SET_CURRENT_INDEX", index);
        if (!playing.value) {
          togglePlaying(true);
        }
      }
    }
    function prev() {
      if (!songReady.value) {
        return;
      }
      if (playlist.value.length === 1) {
        loop();
      } else {
        let index = currentIndex.value - 1;
        if (index === -1) {
          index = playlist.value.length - 1;
        }
        store.commit("SET_CURRENT_INDEX", index);
        if (!playing.value) {
          togglePlaying(true);
        }
      }
    }

    function end() {
      currentTime.value = 0;
      if (mode === playMode.loop) {
        loop();
      } else {
        next();
      }
    }

    function ready() {
      // 监听 playing 这个事件确保慢网速或者快速切换歌曲导致的 DOM Exception
      const audioEl = audioRef.value;
      songReady.value = true;
      duration.value = audioEl.duration;
      //   this.canLyricPlay = true
      // this.savePlayHistory(this.currentSong)
      // 如果歌曲的播放晚于歌词的出现，播放的时候需要同步歌词
      //   if (this.currentLyric && !this.isPureMusic) {
      //     this.currentLyric.seek(this.currentTime * 1000)
      //   }
    }

    function updateTime(e) {
      currentTime.value = e.target.currentTime;
    }

    function onProgressBarChanging(percent) {
      if (songReady.value) {
        const audioEl = audioRef.value;
        currentTime.value = audioEl.duration * percent;
      }
    }
    function onProgressBarChange(percent) {
      if (songReady.value) {
        const audioEl = audioRef.value;
        const _currentTime = audioEl.duration * percent;
        currentTime.value = _currentTime;
        audioEl.currentTime = _currentTime;
      }
    }

    return {
      playlist,
      fullScreen,
      playing,
      currentIndex,
      mode,
      searchBoxFocue,
      format,
      open,
      back,
      currentSong,
      songReady,
      audioRef,
      audioPlayUrl,
      _IsPC,
      showTips,
      togglePlaying,
      next,
      prev,
      currentTime,
      percent,
      duration,
      updateTime,
      end,
      onProgressBarChange,
      onProgressBarChanging,
      ready,
    };
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

    .down {
      width: 15px;
      font-size: 20px;
      width: 25px;
      font-size: 20px;
      height: 25px;
      text-align: center;

      a {
        display: block;
        width: 100%;
        height: 100%;
        color: #fff;
      }

      .iconfont {
        font-size: 22px;
      }
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

      img {
        width: 100%;
        height: 100%;
      }
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
