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
                  <img v-lazy='item.picUrl' >
                  <h3 class="item-title">{{item.name}}</h3>
                  <p class="item-desc">{{item.intro.name}}</p>
              </li>
            </ul>
          </div>
          <div class="newSongs">
            <div class="new-title">
              新歌首发
            </div>
            <ul class="new-list">
              <li v-for="(item,index) in newSongList" :key="item.cid" @click="selectSongItem(index)" >
                <img v-lazy="item.picUrlBig" @load="loadImg(newSongList,index)">
                <img :src="item.picUrlBig">
                <h3 class="item-title">{{item.musicName}}</h3>
                <p class="item-desc">{{item.singerName}}</p>
              </li>
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import Slider from '@/components-base/slider/slider'
import Scroll from '@/components-base/scroll/scroll'
import { createSong } from '@/common/js/song'
import { getNewSong, getDiscList } from '@/api/home'
import { mapMutations, mapActions } from 'vuex'

export default {
  components: {
    Slider,
    Scroll
  },
  created () {
    this._getNewSong()
    // this.getSongList()
  },
  computed: {
  },
  activated () {
  },
  data () {
    return {
      newSongList: [],
      songList: [],
      sliders:['http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1965101.jpg',
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1958924.jpg',
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1958238.jpg'
      ]
    }
  },
  methods: {
    getBaner () {
      // get baner 暂未爬接口 临时数据
    },
    selectSongItem (index) {
      let list = []
      this.newSongList.forEach((e) => {
        list.push(createSong(e.musicId, e.cid, e.singerName, e.musicName, e.picUrlBig, null))
      })
      this.selectPlay({ list: list, index: index }) 
    },
    async _getNewSong () { 
      try {
        let data = await getNewSong()
        let list = data.data.data.total.list.splice(0, 15).map((e) => {
          return e.music
        })
        this.newSongList = list
      } catch (error) {
        console.log(error)
      }
    },
    async getSongList () {
      try {
        let data = await getDiscList()
        this.songList = data.data.data.list
      } catch (error) {
        console.log(error)
      }
    },
    navDisc (item) {
      this.SET_DISC(item)
      this.$router.push({
        path: `/home/${item.id}`
      })
    },
    loadImg (list, index) {
      if (index === list.length - 1) {
        if (!this.checkLoaded) {
          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
          this.checkLoaded = true
        }
      }
    },
    ...mapMutations({
      'SET_DISC': 'SET_DISC',
      'SET_FULLSCREEN': 'SET_FULLSCREEN'
    }),
    ...mapActions({
      'selectPlay': 'selectPlay'
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/mixin'
.home-warpper
  position: fixed;
  width: calc(100% - 20px);
  left 10px;
  top: 49px;
  bottom: 50px;
  .recommend-content
    height: 100%;
    overflow: hidden;
    .banner
      padding-top 10px
      padding-bottom 10px
    .newSongs
      .new-title
        color: #333;
        font-size: 16px;
        padding: 0 5px;
        margin-top: 20px;
        position: relative;
        &:before
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform translateY(-50%);
          width: 2px;
          height: 12px;
          background-color: #e20077;
      .new-list
        display flex
        flex-wrap wrap
        padding-top 15px
        li
          width 33.333%
          padding: 0 5px;
          margin-bottom 10px
          box-sizing: border-box;
          img
            width 100%
          .item-title
            font-size 14px
            margin-bottom 5px
            margin-top 5px
            no-wrap()
          .item-desc
            font-size 12px
            color  #999
            no-wrap()

</style>
