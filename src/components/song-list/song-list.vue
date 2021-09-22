<template>
    <div>
        <ul  class="list">
            <li v-for="(item, index) in list" :key="item.id" @click="selectSongItem(item)">
                <div class="num">{{index + 1}}</div>
                <div class="song-box">
                    <h2>{{item.songname}}</h2>
                    <h3><span v-if="item.singer.length > 0">{{item.singer[0].name}}-</span>{{item.albumname}}</h3>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { createSong, filterSinger } from "@/common/js/song";
import { mapActions } from "vuex";
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  created() {},
  methods: {
    selectSongItem(item) {
      // let list = [];
      // this.list.forEach((e) => {
      //   list.push(
      //     createSong(
      //       e.id,
      //       e.cid,
      //       filterSinger(e.singerName),
      //       e.name,
      //       null,
      //       null
      //     )
      //   );
      // });
      this.selectPlay({ item });
    },
    ...mapActions({
      selectPlay: "selectPlay",
    }),
  },
};
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/mixin';

.list {
  li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    text-align: left;

    .num {
      margin-right: 20px;
      font-size: 14px;
      color: #666;
    }

    h2 {
      font-size: 14px;
      margin-bottom: 5px;
      no-wrap();
    }

    h3 {
      color: #666;
      font-size: 12px;
      no-wrap();
    }
  }
}
</style>
