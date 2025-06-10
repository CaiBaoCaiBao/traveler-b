<template>
    <TagBarContainer>
        <section class="tag-bar-tags">
            <TagItem v-for="(tag, index) in props.tags" :key="`${tag}-${index}`" :label="tag" :active="isTagActive(tag)"
                @click="handleTagClick(tag)" />
        </section>
        <section class="tag-bar-content">
            <slot></slot>
        </section>
    </TagBarContainer>
</template>

<script setup lang="ts">
import TagItem from '@/components/TagBar/TagItem.vue';
import TagBarContainer from '@/components/TagBar/TagBarContainer.vue';

interface Props {
    tags: Array<string>;
    modelValue?: string; // 添加双向绑定支持
}

interface Emits {
    (e: 'update:modelValue', tag: string): void;
    (e: 'tag-click', tag: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleTagClick = (tag: string) => {
    emit('update:modelValue', tag);
    emit('tag-click', tag);
};

const isTagActive = (tag: string) => {
    return props.modelValue === tag;
};
</script>

<style scoped>
.tag-bar-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 16px 0 0 0;
    background: #1c1c1d7e;
    border-radius: 4px;
}

.tag-bar-content {
    background-color: #466099;
    padding: 15px;
}
</style>