import { createApp } from 'vue'
import Loading from './loading'

const loadingDirective = {
    mounted(el,binding) {
        const app = createApp(<Loading />)
        const instance = app.mount(document.createElement('div'))
        
        binding.value.title && instance.setTitle(binding.value.title)
        binding.value.color && instance.setColor(binding.value.color)

        el.instance = instance // 存一个

        if(binding.value.loading){
            append(el)
        }
    },
    updated(el,binding) {
        binding.value.title && el.instance.setTitle(binding.value.title)
        binding.value.color && el.instance.setColor(binding.value.color)

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
