<template>
    <div >
        <div class="m-input" >
            <div class="inputcover" :class="searchBoxFocue ? 'focus':''">
                <i class="u-svg u-svg-srch"></i>
                <input type="text" name="search" v-model="searchValue" class="input" placeholder="搜索歌曲如：周杰伦/晴天" autocomplete="off" @focus="focus">
                <figure class="close" v-show="searchValue.length > 0" @click="cancelText"><i class="u-svg u-svg-empty"></i></figure>
            </div>
            <transition appear name="slide">
                <div  class="cancel" v-show="searchBoxFocue" @click="cancel">
                    取消
                </div>
            </transition>
        </div>
        <transition appear name="slideFadeIn">
            <div class="search-box-wrapper" v-show="searchBoxFocue">
                <div class="hot-words" v-show="searchValue === ''">
                    <h3>热搜排行</h3>
                    <ul class="words-list">
                        <li v-for="(item,index) in hotWords" :key="index" :class="highlightColor(index)" @click="quickSelect(item)">
                            <span class="num">{{index + 1}}</span>
                            <div class="name">
                                {{item}}
                            </div>
                        </li>
                    </ul>
                </div>
                <ul class="search-result-List" v-show="searchResult.length > 0 && searchValue">
                    <SongList :list="searchResult" />
                </ul>
                <!-- <div v-show="loadingState" class="loading">
                    <Loading :playerIconColor="'red'"/>
                </div> -->
            </div>
        </transition>
    </div>
</template>
<script>
// import Loading from '@/components-base/loading/loading'
import { mapGetters, mapMutations } from 'vuex'
import SongList from '@/components/song-list/song-list'
import { getHotWords, getHotWordsSearch } from '@/api/home'
import { debounce } from '@/common/js/util'
export default {
  computed: {
    ...mapGetters(['searchBoxFocue'])
  },
  created () {
    this.getHotWords()
    this.$watch('searchValue', debounce((newWords) => {
      if (newWords !== '') {
        this.getSearchResult()
      }
    }, 200))
  },
  data () {
    return {
      searchValue: '',
      loadingState: false,
      hotWords: [],
      searchResult: []
    }
  },
  watch: {
  },
  methods: {
    ...mapMutations({
      'SET_SEARCHBOX_FOCUS': 'SET_SEARCHBOX_FOCUS'
    }),
    async getSearchResult () {
      try {
        this.loadingState = true
        let res = await getHotWordsSearch(this.searchValue)
        this.loadingState = false
        this.searchResult = res.data.data.list.splice(0, 8)
      } catch (error) {
        this.loadingState = false
        console.log(error)
      }
    //   console.log(list)
    },
    async getHotWords () {
      let res = await getHotWords()
      this.hotWords = res.data.data.total.list
    },
    focus () {
      this.SET_SEARCHBOX_FOCUS(true)
    },
    cancel () {
      this.searchValue = ''
      this.SET_SEARCHBOX_FOCUS(false)
    },
    cancelText () {
      this.searchValue = ''
    },
    highlightColor (index) {
      if (index <= 3) {
        return 'highlightColor'
      } else {
        return null
      }
    },
    quickSelect (text) {
      this.searchValue = text
    }
  },
  components: {
    // Loading,
    SongList
  }
}
</script>
<style lang="stylus" scoped>
    //该组件样式复制与网易云，或许会有些混乱，请不用care
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #999;
}

input:-moz-placeholder, textarea:-moz-placeholder {
  color: #999;
}

input::-moz-placeholder, textarea::-moz-placeholder {
  color: #999;
}

input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #999;
}
    @import '~@/common/stylus/variable'
    @import '~@/common/stylus/mixin'
    .m-input
        display flex
        position: fixed;
        width 100%
        left 0
        top 0
        padding: 10px 10px;
        padding-bottom 4px
        background #fff
        .inputcover
            position: relative;
            width: 100%;
            height: 35px;
            padding: 0 30px;
            box-sizing: border-box;
            background: #ebecec;
            border-radius: 30px;
            margin-right 60px
            transition all 0.5s
            .u-svg-srch
                position: absolute;
                left: 0;
                top: 11.5px;
                margin: 0 8px;
                vertical-align: middle;
                width: 13px;
                height: 13px;
                background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==');
                display: inline-block;
                vertical-align: middle;
                background-position: 0 0;
                background-size: contain;
                background-repeat: no-repeat;
            .input
                width: 100%;
                height: 35px;
                line-height: 18px;
                background: rgba(0,0,0,0);
                font-size: 14px;
                color: #333;
                outline none
            .holder
                position: absolute;
                left: 30px;
                top 50%;
                transform translateY(-50%);
                font-size: 14px;
                color: #c9c9c9;
                background: rgba(0,0,0,0);
                pointer-events: none;
            .close
                position: absolute;
                right: 0;
                top: 2px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                .u-svg-empty
                    display: none;
                    vertical-align: middle;
                    display: inline-block;
                    vertical-align: middle;
                    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==')
                    background-position: 0 0;
                    background-size: contain;
                    background-repeat: no-repeat;
                    width: 14px;
                    height: 14px;
        .cancel
            position fixed
            right 0px
            top 0px
            width 75px
            height 49px
            line-height 55px
            text-align center
            background #fff
            z-index 160
            font-size: 14px;
.focus
    margin-right 90px!important

.slide-enter-active, .slide-leave-active
    transition: all 0.5s

.slide-enter, .slide-leave-to
    opacity 0

.slideFadeIn-enter-active, .slideFadeIn-leave-active
    transition: all 0.5s

.slideFadeIn-enter, .slideFadeIn-leave-to
    opacity 0

.search-box-wrapper
    position fixed
    top 49px
    width 100%
    height calc(100vh - 50px)
    padding 0 20px
    box-sizing border-box
    background #fff
    z-index 160
    padding-top 20px
    .hot-words
        h3
            font-size 12px
            color #333
            margin-bottom 20px
        .words-list
            display flex
            flex-wrap wrap
            li
                display flex
                width 50%
                margin-bottom 20px
                padding-right 20px
                font-size 14px
                color #666
                box-sizing border-box
                .name
                    no-wrap()
                .num
                    margin-right 5px
            .highlightColor
                .num
                    color red
                .name
                    color #333
    .loading
        margin 0 auto
        text-align center
        padding-top 10px

</style>
