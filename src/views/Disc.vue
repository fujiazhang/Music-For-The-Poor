<template>
  <transition appear name="slide">
    <music-list  :bg-image="bgImage" :discInfo="discInfo"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '@/components/music-list/music-list'
import { getSongList } from '@/api/disc'
import { mapGetters } from 'vuex'

export default {
  computed: {
    bgImage () {
      return this.disc.picUrl
    },
    ...mapGetters([
      'disc'
    ])
  },
  data () {
    return {
      discInfo: {
        picUrl: '',
        name: '',
        creator: {
          name: ''
        },
        playCount: '',
        list: []
      }
    }
  },
  created () {
    this._getSongList(this.$route.id)
  },
  methods: {
    _getSongList () {
      if (!this.disc.id) {
        this.$router.push('/home')
        return
      }
      getSongList(this.disc.id)
        .then((res) => {
          this.discInfo = res.data.data
        })
        .catch((err) => {
          if (err.message.includes('timeout')) {
            alert('这个歌单似乎出了一点问题，换个试试趴~')
            this.$router.back()
          }
        })
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
