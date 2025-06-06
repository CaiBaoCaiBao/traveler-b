<template>
    <div class="mask-layer" :class="{ mask: isMask, 'pointer-events-none': !isMask }" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps({
    isMask: {
        type: Boolean,
        default: false
    }
})

// 监听isMask变化，控制body滚动
watch(() => props.isMask, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})


const emit = defineEmits(['click'])

const handleClick = () => {
    emit('click')
}

</script>

<style scoped>
.mask-layer {
    display: none;
}

.mask-layer.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
}

.pointer-events-none {
    pointer-events: none;
}
</style>