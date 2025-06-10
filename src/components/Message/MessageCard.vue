<template>
    <Card class="message-card">
        <div class="message-content">
            <slot></slot>
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/CardComponent.vue';

defineEmits(['close']);
</script>

<style scoped>
.message-card {
    position: fixed;
    bottom: 10%;
    left: 4%;
    z-index: 9999;
    min-width: 200px;
    max-width: 40%;
    padding: 10px 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    animation: fadeIn 0.3s ease-out;
}

.message-content {
    flex: 1;
    word-break: break-word;
    min-width: 0;
}


@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>