import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import {ref, onMounted, onUnmounted} from 'vue';

BScroll.use(ObserveDOM)  //使用响应式dom插件 检测内部变化自动refresh

export default function useScroll(wrapperRef,options){
    const scroll = ref(null)
    onMounted(()=>{
        scroll.value = new BScroll(wrapperRef.value,{
            observeDOM: true, 
            ...options
        })
    })
    onUnmounted(() => {
        scroll.value.destroy()
    })
}
