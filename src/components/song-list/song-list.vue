<template>
    <div>
        <ul  class="list">
            <li v-for="(item, index) in list" :key="item.id" @click="selectSongItem(index)">
                <div class="num">{{index + 1}}</div>
                <div class="song-box">
                    <h2>{{item.name}}</h2>
                    <h3><span v-if="item.artists.length > 0">{{item.artists[0].name}}-</span>{{item.album.name}}</h3>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { createSong, filterSinger } from '@/common/js/song'
import { mapActions } from 'vuex'
export default {
  props: {
    list: {
      type: Array
    }
  },
  created () {
  },
  methods: {
    selectSongItem (index) {
      let list = []
      this.list.forEach((e) => {
        list.push(createSong(e.id, e.cid, filterSinger(e.singerName), e.name, null, null))
      })
      this.selectPlay({ list: list, index: index })
    },
    ...mapActions({
      'selectPlay': 'selectPlay'
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/mixin';
.list
    li
        display flex
        align-items center
        margin-bottom 20px
        .num
            margin-right 20px
            font-size 14px
            color #666
        h2
            font-size 14px
            margin-bottom 5px
            no-wrap()
        h3
            color #666
            font-size 12px
            no-wrap()
</style>
