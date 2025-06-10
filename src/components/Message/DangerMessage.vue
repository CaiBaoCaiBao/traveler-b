<template>
    <transition name="fade">
        <MessageCard class="success" v-if="showSuccess">
            <div class="success-message">
                <span>{{ props.dangerMessage }}</span>
                <CloseIcon width="20" height="20" class="close-icon" @click="showSuccess = false" />
            </div>
        </MessageCard>
    </transition>
</template>

<script setup lang="ts">
import MessageCard from '@/components/Message/MessageCard.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { ref } from 'vue';
const showSuccess = ref(true);

const props = defineProps({
    dangerMessage: {
        type: String,
        default: 'Danger!'
    }
})

setTimeout(() => {
    showSuccess.value = false;
}, 3000)
</script>

<style scoped>
.success {
    border: 2px solid #8a4f4fb4;
    background-color: #7f1111cf;
}

/** 消息卡片关闭按钮 */
.success-message {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;

    .close-icon {
        cursor: pointer;
    }

    .close-icon:hover {
        transform: scale(1.1);
    }
}

/* 添加动画效果 */
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}
</style>