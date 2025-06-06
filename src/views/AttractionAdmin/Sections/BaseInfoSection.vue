<template>
    <section id="base-info" class="section-group">
        <h1>{{ data.name }}</h1>
        <div class="tagList">
            <div class="tag">
                <span>TAG</span>
            </div>
        </div>

        <p class="DescriptionText">
            {{ data.description }}
        </p>
        <div class="btn-group">
            <button class="edit-btn" @click="handleMask">Edit</button>
        </div>
    </section>
    <Mask :is-mask="isMask" @click="handleMask">
        <div class="edit-form" @click.stop>
            <div class="form-header">
                <h2>Edit Attraction Information</h2>
            </div>
            <div class="form-content">
                <form @submit.prevent="saveChanges">
                    <div class="form-group">
                        <label for="attraction-name">Attraction Name</label>
                        <input type="text" id="attraction-name" v-model="data.name" placeholder="Enter attraction name"
                            required>
                    </div>

                    <div class="form-group">
                        <label>Tags</label>
                        <div class="tags-input">
                            <input type="text" v-model="newTag" placeholder="Add a tag" @keydown.enter.prevent="addTag">
                            <button type="button" class="add-tag-btn" @click="addTag">+</button>
                        </div>
                        <div class="tags-list">
                            <span v-for="(tag, index) in data.tags" :key="index" class="tag">
                                {{ tag }}
                                <span class="remove-tag" @click="removeTag(index)">×</span>
                            </span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" v-model="data.description" rows="5"
                            placeholder="Enter attraction description" required></textarea>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="cancel-btn" @click="handleMask">Cancel</button>
                        <button type="submit" class="save-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </Mask>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Mask from "@/components/Mask.vue";
const isMask = ref(false)
const newTag = ref('')
/**只读数据 */
const props = defineProps({
    isMask: {
        type: Boolean,
        default: false
    }
})
/** 定义数据 */
const data = reactive({
    name: 'XXXX',
    description: 'DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptiom',
    tags: ['TAG']
})
/** 状态开关 */
const handleMask = () => {
    isMask.value = !isMask.value
}

const saveChanges = () => {// 保存更改
    handleMask() // 关闭弹窗
}

const stopPropagation = (e: Event) => { // 阻止事件冒泡
    e.stopPropagation()
}

const addTag = () => {  // 添加标签
    if (newTag.value.trim() && !data.tags.includes(newTag.value.trim())) {
        data.tags.push(newTag.value.trim())
        newTag.value = ''
    }
}

const removeTag = (index: number) => {// 删除标签
    data.tags.splice(index, 1)
}
</script>

<style scoped>
.section-group {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #2a3a5a;
    border-radius: 10px;
    background-color: #1e293b;
}

.tagList {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
    margin: 10px 0;
}

.tag {
    padding: 5px 10px;
    background-color: rgba(35, 194, 133, 0.2);
    border: 1.5px solid rgba(88, 237, 180, 0.3);
    border-radius: 8px;
    color: #5eead4;
    font-size: 14px;
    font-weight: 500;
    user-select: none;
}

.DescriptionText {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    line-height: 1.6;
    margin: 15px 0;
}

.btn-group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 15px;
}

.edit-btn {
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    background-color: #334155;
    border: 2px solid #60a5fa;
    color: #60a5fa;
    font-weight: 600;
    border-radius: 50px;
    transition: all 0.3s ease-in-out;
}

.edit-btn:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
}

/**base-info form */
.edit-form {
    width: 90%;
    max-width: 600px;
    background-color: #1e293b;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.form-header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #2a3a5a;
}

.form-header h2 {
    color: #e2e8f0;
    font-size: 1.5rem;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #94a3b8;
    font-size: 14px;
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px 12px;
    background-color: #334155;
    border: 1px solid #475569;
    border-radius: 6px;
    color: #e2e8f0;
    font-size: 14px;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #60a5fa;
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

.tags-input {
    display: flex;
    margin-bottom: 8px;
}

.tags-input input {
    flex: 1;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.add-tag-btn {
    padding: 0 12px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.add-tag-btn:hover {
    background-color: #1d4ed8;
}

.tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tags-list .tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    background-color: rgba(35, 194, 133, 0.2);
    border: 1.5px solid rgba(88, 237, 180, 0.3);
    border-radius: 8px;
    color: #5eead4;
    font-size: 14px;
}

.remove-tag {
    margin-left: 6px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
}

.remove-tag:hover {
    color: #ef4444;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid #2a3a5a;
}

.cancel-btn,
.save-btn {
    padding: 10px 20px;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.cancel-btn {
    background-color: #334155;
    border: 1px solid #475569;
    color: #e2e8f0;
}

.cancel-btn:hover {
    background-color: #3e4a61;
}

.save-btn {
    background-color: #2563eb;
    border: 1px solid #2563eb;
    color: white;
}

.save-btn:hover {
    background-color: #1d4ed8;
}

/**响应式设计 */
@media (max-width: 992px) {
    .section-group {
        padding: 15px;
    }

    .DescriptionText {
        font-size: 15px;
    }
}

@media (max-width: 768px) {

    .section-group {
        padding: 12px;
    }

    .edit-btn {
        padding: 6px 12px;
        font-size: 14px;
    }

    .edit-form {
        width: 95%;
        padding: 16px;
    }

    .form-actions {
        flex-direction: column;
        gap: 10px;
    }

    .cancel-btn,
    .save-btn {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .section-group {
        padding: 10px;
        margin-bottom: 12px;
    }

    h1 {
        font-size: 1.5rem;
    }

    .tag {
        font-size: 12px;
        padding: 3px 8px;
    }

    #ticket-switch label {
        font-size: 14px;
    }
}
</style>