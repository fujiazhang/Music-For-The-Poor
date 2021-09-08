<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import useScroll from './use-scroll'
import {ref} from 'vue'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    scrollEnd: {
      type: Boolean,
      default: false
    },
    pullingUp: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const rootRef = ref(null)
    useScroll(rootRef,props)
    return {
      rootRef
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
