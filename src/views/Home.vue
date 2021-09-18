<template>
  <div class="home">
    <div class="home-warpper">
      <Scroll class="recommend-content">
        <div>
          <div class="banner">
            <Slider :sliders="sliders"></Slider>
          </div>
          <div class="newSongs">
            <div class="new-title">
              推荐歌单
            </div>
            <ul class="new-list">
              <li v-for="item in songList" :key="item.id" @click="navDisc(item)">
                  <img v-lazy='item.cover_url_medium' >
                  <h3 class="item-title">{{item.title}}</h3>
              </li>
            </ul>
          </div>
          <div class="newSongs" v-loading="{loading:loading,color:'red',title:'加载中...'}">
            <div class="new-title">
              最新
            </div>
            <ul class="new-list">
              <li v-for="(item,index) in newSongList" :key="item.cid" @click="navDisc(item)" >
                <img v-lazy="item.imgurl" >
                <h3 class="item-title">{{item.dissname}}</h3>
                <!-- <p class="item-desc">{{item.name}}</p> -->
              </li>
            </ul>
          </div>
          <div class="copyright">
            开发仅作为学习，非商业营利性目的。
          </div>
        </div>
      </Scroll>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Slider from "@/components-base/slider/slider";
import Scroll from "@/components-base/scroll/scroll";
import { createSong } from "@/common/js/song";
import { Api } from "@/api";
import { mapMutations, mapActions } from "vuex";

export default {
  components: {
    Slider,
    Scroll,
  },
  created() {
    this.getNewSong();
    this.getSongList();
  },
  computed: {
    loading() {
      return this.newSongList.length > 0 ? false : true;
    },
  },
  activated() {},
  data() {
    return {
      newSongList: [],
      songList: [],
      sliders: [
        "http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1965101.jpg",
        "http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1958924.jpg",
        "http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1958238.jpg",
      ],
    };
  },
  methods: {
    selectSongItem(index) {
      let list = [];
      this.newSongList.forEach((e) => {
        list.push(
          createSong(
            e.musicId,
            e.cid,
            e.singerName,
            e.musicName,
            e.picUrlBig,
            null
          )
        );
      });
      this.selectPlay({ list: list, index: index });
    },
    async getNewSong() {
      try {
        let data = await Api.HomeApi.getNewSong();
        this.newSongList = data.data.list;
      } catch (error) {
        console.log(error);
      }
    },
    async getSongList() {
      try {
        let data = await Api.HomeApi.getRecommendList();
        this.songList = data.data.list;
      } catch (error) {
        console.log(error);
      }
    },
    navDisc(item) {
      this.SET_DISC(item);
      this.$router.push({
        path: `/home/disc/${item.tid || item.dissid}`,
      });
    },
    ...mapMutations({
      SET_DISC: "SET_DISC",
      SET_FULLSCREEN: "SET_FULLSCREEN",
    }),
    ...mapActions({
      selectPlay: "selectPlay",
    }),
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/mixin';

.home-warpper {
  position: absolute;
  width: calc(100% - 20px);
  left: 10px;
  top: 49px;
  bottom: 50px;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .banner {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    .newSongs {
      .new-title {
        color: #333;
        font-size: 16px;
        padding: 0 5px;
        margin-top: 20px;
        text-align: left;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 2px;
          height: 12px;
          background-color: #e20077;
        }
      }

      .new-list {
        display: flex;
        flex-wrap: wrap;
        padding-top: 15px;

        li {
          width: 33.333%;
          padding: 0 5px;
          margin-bottom: 10px;
          box-sizing: border-box;

          img {
            width: 100%;
          }

          .item-title {
            font-size: 14px;
            margin-bottom: 5px;
            margin-top: 5px;
            no-wrap();
          }

          .item-desc {
            font-size: 12px;
            color: #999;
            no-wrap();
          }
        }
      }
    }
  }

  .copyright {
    padding-top: 10px;
    padding-bottom: 40px;
    font-size: 12px;
    color: #b1a7a7;
  }
}
</style>
