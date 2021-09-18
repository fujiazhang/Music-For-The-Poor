<template>
  <transition appear name="slide">
    <disc-list :bg-image="bgImage" :discInfo="discInfo"></disc-list>
  </transition>
</template>

<script type="text/ecmascript-6">
import DiscList from "@/components/disc-list/disc-list";
import { Api } from "@/api";
import { mapGetters } from "vuex";

export default {
  computed: {
    bgImage() {
      return this.disc.imgurl || this.disc.cover_url_big;
    },
    ...mapGetters(["disc"]),
  },
  data() {
    return {
      discInfo: {
        headurl: "",
        dissname: "",
        desc: "",
        nickname: "",
        visitnum: "",
        songlist: [],
        tags: [{ id: "", name: "" }],
      },
    };
  },
  created() {
    this._getSongList(this.$route.id);
  },
  methods: {
    _getSongList() {
      if (!(this.disc.tid || this.disc.dissid)) {
        this.$router.push("/home");
        return;
      }
      Api.HomeApi.getSongList(this.disc.tid || this.disc.dissid)
        .then((res) => {
          this.discInfo = res.data;
        })
        .catch((err) => {
          if (err.message.includes("timeout")) {
            alert("这个歌单似乎出了一点问题，换个试试趴~");
            this.$router.back();
          }
        });
    },
  },
  components: {
    DiscList,
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
