import { createApp } from 'vue'
import Loading from './loading'

const loadingDirective = {
    mounted(el,binding) {
        //根据自定义指令参数 渲染对应loading的颜色 无法组件哪儿v-bind pros传值，所以这里修改
        Loading.props.color.default = binding.value.color 
        const app = createApp(<Loading />)

        const instance = app.mount(document.createElement('div'))
        el.instance = instance

        if(binding.value.loading){
            append(el)
        }
    },
    updated(el,binding) {
        if(binding.value.loading !== binding.oldValue.loading){
            binding.value.loading? append(el) : remove(el)
        }
    },
}

function append(el){
    el.appendChild(el.instance.$el)
}

function remove(el){
    el.removeChild(el.instance.$el)
}

export default loadingDirective
