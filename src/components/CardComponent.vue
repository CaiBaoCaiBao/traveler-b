<template>
    <div class="card">
        <div class="card__header" v-if="Title">
            <Mate :title=props.Title />
        </div>
        <div class="card__body" v-if="Content">
            <Mate :contnet=props.Content />
        </div>
        <div class="card__footer">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import Mate from '@/components/MateComponent.vue';
const props = defineProps({
    Title: {
        type: String,
        default: ''
    },
    Content: {
        type: String,
        default: ''
    }
})
</script>

<style scoped>
.card {
    padding: 20px;
    border: 2px solid rgba(42, 88, 187, 0.571);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(6, 4, 71, 0.571);
}

.card__header {
    font-weight: bolder;
    margin-bottom: 10px;
}

.card__body {
    margin-bottom: 10px;
}

.card__footer {
    width: 100%;
}
</style>