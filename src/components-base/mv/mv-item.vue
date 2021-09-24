<template>
    <div  class="mv-item" :class="{showFull:showFull}">
        <!-- <div class="img-wrapper" v-lazy:background-image=""  @click="selectPlay"> -->
          <div class="img-wrapper" :style="{'background-image':`url(${data.picurl})`}">
            <i class=" playIcon iconfont iconziyuan" v-show="showPlayIcon"  @click="selectPlay"></i>
            <i class=" playIcon iconfont iconzanting" v-show="!showPlayIcon"  @click="togglePlay"></i>
            <i class=" playIcon iconfont iconclose" v-show="showFull"  @click="close"></i>

            <div class="loadng" v-loading="{loading:showLoading,color:'red',title:'mv加载中...'}">
                <!-- <Loading :playerIconColor="'red'" /> -->
            </div>
            <video
                class="video"
                ref="video"
                v-show="showVideo"
                webkit-playsinline=""
                playsinline=""
                x5-playsinline=""
                @playing="startPlay"
                @waiting="waiting"
                @pause="pause()"
                x-webkit-airplay="allow">
            </video>
        </div>
        <div class="title">
            {{data.title}}
        </div>
        <div class="info-box">
            <div class="info-l">
                <div class="avatar">
                    <img  v-lazy="data.singers[0].picurl">
                </div>
                <div class="name">
                    {{data.title}}
                </div>
            </div>
            <div class="info-r">
                <div class="item" style="margin-right:20px">
                    <i class="iconfont iconxihuan"></i>
                    <span>{{data.star_cnt}}</span>
                </div>
                <div class="item" style="margin-right:20px">
                    <i class="iconfont iconpinglun" style="padding-top:10px"></i>
                    <span>{{data.comment_cnt}}</span>
                </div>
            </div>
        </div>
        <div v-if="showFull">
          <h2 class="comment__title">热门评论</h2>
          <ul class="comment__list" v-loading="{loading:showCommentsLoading,color:'red',title:'加载评论中...'}">
            <li v-for="item in comments" class="comment__list_item ">
              <div class="commont_user_info">
                <div class="comment__avatar">
                    <img  v-lazy="item.avatarurl">
                </div>
                <div class="name">
                  <p>{{item.nick}}</p>
                </div>
              </div>
                <div class="comment__text ">{{item.rootcommentcontent}}</div>
            </li>
            <h2  v-show="!comments && !showCommentsLoading">暂无评论</h2>
          </ul>
        </div>
    </div>
</template>
<script>
import { Api } from "@/api";
import { mapMutations } from "vuex";
export default {
  props: {
    data: {
      type: Object,
      default: function () {
        return {};
      },
    },
    posY: {},
  },
  data() {
    return {
      showVideo: false,
      showLoading: false,
      showPlayIcon: true,
      showFull: false,
      comments: [],
      showCommentsLoading: true,
    };
  },
  components: {
    // Loading,
  },
  created() {},
  watch: {},
  methods: {
    hideVideo() {
      console.log("执行关闭");
      this.$refs.video.src = "";
      this.$refs.video.pause();
      this.showVideo = false;
      this.showLoading = false;
      this.showPlayIcon = true;
    },
    pause() {
      this.showPlayIcon = true;
    },
    async selectPlay() {
      if (this.showFull) {
        this.togglePlay();
      } else {
        try {
          this.SET_PLAYING_STATE(false);

          this.$emit("setVideo", this.data.aid);
          this.showPlayIcon = false;
          this.showVideo = true;
          this.showLoading = true;
          this.showFull = true;
          let res = await Api.PlayerApi.getMv(this.data.vid);
          /*
        避免快速点击播放后点击关闭（请求已发出）
        而在 异步操作获取到真实地址play方法前 已将当前视频关闭
        所以加一个判断当前 this.showVideo
        */
          if (this.showVideo) {
            this.$refs.video.src = res.data[this.data.vid][0];
            this.$refs.video.play();
          }
          this.getComment(this.data.vid);
        } catch (error) {
          console.log(error);
        }
      }
    },
    async getComment() {
      let res = await Api.PlayerApi.getComments(this.data.vid);
      setTimeout(() => {
        this.showCommentsLoading = false;
        this.comments = res.data.comment.commentlist;
      }, 500);
    },
    waiting() {
      this.showLoading = true;
    },
    startPlay() {
      this.showLoading = false;
    },
    togglePlay() {
      if (this.$refs.video.paused) {
        this.showPlayIcon = false;
        this.$refs.video.play();
      } else {
        this.showPlayIcon = true;
        this.$refs.video.pause();
      }
    },
    close() {
      this.showPlayIcon = true;
      this.$refs.video.pause();
      this.showFull = false;
    },
    ...mapMutations({
      SET_PLAYING_STATE: "SET_PLAYING_STATE",
    }),
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/mixin';

.mv-item {
  transition: 0.2s all;
}

.img-wrapper {
  position: relative;
  width: calc(100% - 20px);
  height: 180px;
  margin: 0 auto;
  background-size: cover;
  border-radius: 10px;

  .video {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: #000;
  }

  .iconziyuan, .iconzanting {
    position: absolute;
    font-size: 18px;
    left: 0px;
    bottom: 0px;
    color: #ebecec;
    padding: 10px;
    z-index: 999;
  }

  .loadng {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.title {
  padding: 20px 0;
  box-sizing: border-box;
  no-wrap();
  padding-left: 10px;
  text-align: left;
}

.info-box {
  display: flex;
  justify-content: space-between;

  .info-l {
    display: flex;
    align-items: center;

    .avatar {
      width: 40px;
      height: 40px;
      padding-left: 10px;
      margin-right: 5px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }

  .info-r {
    display: flex;
    align-items: center;

    .item {
      width: 50px;
      position: relative;
      text-align: left;

      i {
        margin-right: 5px;
      }

      span {
        position: absolute;
        left: 20px;
        top: 0px;
        color: #999;
      }
    }
  }
}

.iconclose {
  position: absolute;
  font-size: 22px;
  top: 20px;
  right: 20px;
  color: #fff;
  font-weight: bold;
  z-index: 999;
  padding: 10px;
}

.showFull {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #fff;
  top: 0;
  left: 0;
  z-index: 9999;
  padding-top: 20px;
  background: #fff;

  .comment__title {
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
  }

  .comment__list {
    height: calc(100vh - 180px - 52px - 25px);
    padding-bottom: 120px;
    padding-top: 20px;
    box-sizing: border-box;
    overflow-y: auto;

    .comment__list_item {
      margin-bottom: 20px;

      .commont_user_info {
        display: flex;

        .name {
          display: flex;
          align-items: center;
        }

        .comment__avatar {
          img {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            padding-left: 10px;
            margin-right: 5px;
          }
        }
      }

      .comment__text {
        text-align: left;
        padding-left: 45px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
