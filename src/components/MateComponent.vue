<template>
    <div class="mate">
        <div class="title">
            {{ props.title }}
        </div>
        <div class="content">
            {{ props.contnet }}
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    title: {
        type: String,
    },
    contnet: {
        type: String,
    }
})
</script>

<style scoped>
.title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
}

.content {
    font-size: 16px;
}
</style>