<template>
    <div class="column">
        <div class="label">{{ label }}</div>
        <div class="content" v-for="item in tableData">
            {{ item[prop] }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
const props = defineProps({
    prop: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    width: {
        type: String,
        default: ''
    },
    textAlign: {
        type: String,
        default: 'left'
    }
});

const tableData = inject('columnProps', []);

// 暴露列配置给父组件TableComponent
defineExpose({
    columnProps: props
});
</script>

<style scoped>
.column {
    flex: 1;
    min-width: 0;
}

.label {
    font-weight: bold;
    margin-bottom: 8px;
}

.content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>