<template>
    <div class="table-container">
        <div class="table-header">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { provide, readonly } from "vue";
interface Props<T> {
    data: Array<T>
}
const props = defineProps<Props<any>>();
// 将传入的data通过provide传递给子组件
provide("columnProps", readonly(props.data))

</script>

<style scoped>
.table-container {
    width: 100%;
}

.table-header {
    display: flex;
    justify-content: space-around;
}
</style>