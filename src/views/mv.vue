<template>
    <div class="mv">
        <Mv :list = "mv"></Mv>
    </div>
</template>
<script>
import Mv from "@/components-base/mv/mv";
import { Api } from "@/api";
export default {
  data() {
    return {
      mv: [],
    };
  },
  created() {
    this.getMv();
  },
  methods: {
    async getMv() {
      let res = await Api.PlayerApi.getMvList();
      this.mv = res.data.list;
    },
  },
  components: {
    Mv,
  },
};
</script>

<style lang="stylus" scoped>
.mv {
  height: calc(100vh - 100px);
  width: 100%;
  overflow-y: auto;
  text-align: center;
  font-size: 12px;
}
</style>
