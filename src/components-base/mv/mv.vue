<template>
    <!-- <Scroll
        class="list"
        :data="list"
        :probe-type="3"
        ref="scroll"
    > -->
        <div class="list">
            <ul class="mv-list">
                <li v-for="item in list" >
                    <MvItem :data="item" @setVideo="setVideo" :ref="'video'+item.aid"/>
                </li>
            </ul>
        </div>
    <!-- </Scroll> -->
</template>
<script>
import MvItem from "./mv-item";
import Scroll from "@/components-base/scroll/scroll";
export default {
  props: {
    list: {},
  },
  components: {
    Scroll,
    MvItem,
  },
  data() {
    return {
      nowAid: "",
    };
  },
  watch: {
    nowAid(newVal, oldVal) {
      // if (oldVal) {
      //   let key = "video" + oldVal;
      //   this.$refs[key][0].hideVideo();
      // }
    },
  },
  created() {},
  methods: {
    setVideo(aid) {
      this.nowAid = aid;
    },
  },
};
</script>
<style lang="stylus" scoped>
.list {
  position: relative;
  width: 100%;
  // height: 100%;
  // overflow: hidden;
  background: #fff;

  .mv-list {
    background: #fff;
    box-sizing: border-box;

    li {
      position: relative;
      width: 100%;
      margin: 0 auto;
      margin-bottom: 20px;

      &:after {
        content: '';
        position: absolute;
        display: block;
        width: 100%;
        height: 4px;
        bottom: -10px;
        background: #ebecec;
      }
    }
  }
}
</style>
