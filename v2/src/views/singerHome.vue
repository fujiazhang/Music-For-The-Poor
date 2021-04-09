<template>
    <transition appear name="slide" >
      <singer-music-list  :info="info" :list="list" @pullingUp="pullingUp" ref="singerMusicList"></singer-music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
import SingerMusicList from '@/components/singer-music-list/singer-music-list'
import { getSongList } from '@/api/singer'

export default {
  data () {
    return {
      info: {},
      list: [],
      total: -1
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.total / 20)
    }
  },
  created () {
    this.info = this.$route.params
    this.list = []
    this._getSongList(1)
  },
  methods: {
    _getSongList (page) {
      if (!this.$route.params.name) {
        this.$router.push('/singer')
        return
      }
      getSongList(this.info.name, page)
        .then((res) => {
          if (res.data.result === 100) {
            this.list = this.list.concat(res.data.data.list)
            this.total = res.data.data.total
          }
        })
        .catch((err) => {
          if (err.message.includes('timeout')) {
          }
        })
    },
    _getSongListMore (page) {
      let _this = this
      if (page > this.totalPage) {
        _this.$refs.singerMusicList.noMoreText()
        return
      }
      getSongList(this.info.name, page)
        .then((res) => {
          if (res.data.result === 100) {
            this.list = this.list.concat(res.data.data.list)
            this.total = res.data.data.total
          }
        })
        .catch((err) => {
          if (err.message.includes('timeout')) {
          }
        })
    },
    pullingUp (page) {
      this._getSongListMore(Number(page) + 1)
    }
  },
  components: {
    SingerMusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
