<template>
    <div class="mv">
        <Mv :list = "mv"></Mv>
    </div>
</template>
<script>
import Mv from '@/base/mv/mv'
import { getMv } from '@/api/mv'
export default {
  data () {
    return {
      mv: []
    }
  },
  created () {
    this.getMv()
  },
  methods: {
    async getMv () {
      let res = await getMv()
      let str = res.data.split('jqueryCallback_bili_7203004195181286(')[1]
      this.mv = JSON.parse(str.substr(0, str.length - 1)).data.archives
    }
  },
  components: {
    Mv
  }
}
</script>

<style lang="stylus" scoped>
.mv
    position fixed
    top 50px
    bottom 50px
    height: calc(100vh - 100px);
    width 100%
    text-align center
    font-size 12px
</style>
