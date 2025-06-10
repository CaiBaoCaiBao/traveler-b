<template>
    <div class="column">
        <div class="label">{{ label }}</div>
        <div class="test">
            <template v-for="(item, index) in tableData" :key="index">
                <div class="content">
                    {{ item[props.prop] }}
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';

const props = defineProps({
    prop: { type: String, required: true },
    label: { type: String, required: true },
    width: { type: String, default: '' },
    textAlign: { type: String, default: 'left' }
});

const tableData = inject("tableData", []);
</script>

<style scoped>
/* 原有样式不变 */
.column {
    width: 100%;
}

.label,
.content {
    border-bottom: 1px solid #ccc;
    padding: 10px;
}

.test {
    background-color: #2d2020;
}
</style>