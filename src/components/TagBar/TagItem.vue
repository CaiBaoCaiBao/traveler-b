<template>
    <span class="tag-item" :class="{ 'active': active }" @click="$emit('click')">
        {{ label }}
    </span>
</template>

<script setup lang="ts">
interface Props {
    label: string;
    active?: boolean;
}

defineProps<Props>();
defineEmits(['click']);
</script>

<style scoped>
.tag-item {
    user-select: none;
    display: inline-block;
    padding: 8px 8px 4px 8px;
    border-top: 2px solid #a7afc2cb;
    cursor: pointer;
    background-color: #091e4b;
    transition: background-color 0.2s ease-in-out;
}

.tag-item.active {
    background: #466099;
    border: none;
    transition: background-color 0.2s ease-in-out;
}

.tag-item:hover {
    background: #052f88c2;
}
</style>