<template>
    <div >
      <div class="singer">
        <ListView :data="singers" @selct="selctSinger" ref="list"></ListView>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
import jsonp from 'jsonp'
import Singer from '@/common/js/singer'
import ListView from '@/base/listview/listview'
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  created () {
    this.getSingersList()
  },
  data () {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  methods: {
    getSingersList () {
      let _this = this
      jsonp(
        'https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=jp0',
        { prefix: 'jp' },
        (err, res) => {
          if (err) {
            console.log(err)
          }
          _this.singers = _this._normalizeSinger(res.data.list)
        }
      )
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        // 是否已存在该分类，没有则创建
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      // 为了得到有序列表，我们需要处理 map
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        if (a.title.charCodeAt(0) - b.title.charCodeAt(0) > 0) {
          return true
        }
      })
      return hot.concat(ret)
    },
    selctSinger (item) {
      console.log(item)
      this.$router.push({
        name: 'singerHome',
        params: item
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position fixed
  top 50px
  width 100%
  height calc(100vh - 100px)
</style>
