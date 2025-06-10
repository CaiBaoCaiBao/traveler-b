<template>
    <div class="table-container">
        <div class="table-content">
            <div v-if="loading" class="loading">
                <span>数据正在加载......</span>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { provide, computed } from "vue";

interface Props {
    data: object;
    loading?: boolean;
}

const props = defineProps<Props>();

// 提供数据给列组件
provide("tableData", computed(() => props.data));
</script>

<style scoped>
.table-container {
    width: 100%;
}

.table-content {
    display: flex;
    justify-content: space-between;
}
</style>