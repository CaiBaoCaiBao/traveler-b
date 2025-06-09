<template>
    <section id="base-info" class="section-group">
        <h1>{{ data.name }}</h1>
        <div class="tagList">
            <Tag v-for="tag in data.tags" :key="tag" v-text="tag" />
        </div>

        <p class="DescriptionText">
            {{ data.description }}
        </p>
        <div class="btn-group">
            <button class="edit-btn" @click="openEditForm">Edit</button>
        </div>
    </section>
    <Mask :is-mask="showMask" @click="handleMaskClick">
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
                        <button type="button" class="cancel-btn" @click="handleMaskClick">Cancel</button>
                        <button type="submit" class="save-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
        <Card v-if="showCard" :Title="'你确定关闭表单吗？'" class="confirmation-card" :class="{ show: showCard }">
            <button class="card-button cancel" @click="cancelCloseCard($event)">Cancel</button>
            <button class="card-button confirm" @click="confirmClose">Confirm</button>
        </Card>
    </Mask>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Mask from "@/components/Mask.vue";
import Tag from '@/components/Tag.vue';
import Card from '@/components/Card.vue';
const showMask = ref(false);
const showCard = ref(false);
const newTag = ref('');

/**只读数据 */
const props = defineProps({
    isMask: {
        type: Boolean,
        default: false
    }
})
/** 定义数据 */
const originalData = reactive({
    name: 'XXXX',
    description: '很长的描述文本...',
    tags: ['TAG1', 'TAG2']
});
const data = reactive({ ...originalData });
// 点击编辑按钮 - 打开表单
const openEditForm = () => {
    showMask.value = true;
    // 重置为原始数据
    Object.assign(data, originalData);
};
/** 状态开关 */
// 点击遮罩层 - 显示确认卡片
const handleMaskClick = () => {
    showCard.value = true;
};

// 取消关闭 - 隐藏卡片继续编辑
const cancelCloseCard = (e: Event) => {
    stopPropagation(e);
    showCard.value = false;
};

// 确认关闭 - 关闭卡片和表单
const confirmClose = () => {
    showCard.value = false;
    showMask.value = false;
};

// 保存更改
const saveChanges = () => {
    // 更新原始数据
    Object.assign(originalData, data);
    showMask.value = false;
    showCard.value = false;
};

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

/** 添加卡片样式 */
.confirmation-card {
    /* 原有的样式保持不变 */
    position: absolute;
    z-index: 1000;
    background-color: #1e293b;
    border: 2px solid #60a5fa;

    /* 新增动画相关样式 */
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.5s ease-in-out;
}

.confirmation-card.show {
    opacity: 1;
    transform: scale(1);
    transition: all 0.5s ease-in-out;
}

.confirmation-card button {
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
}

/* 卡片按钮容器 */
.card-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
}

/* 基础按钮样式 */
.card-button {
    padding: 8px 20px;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    min-width: 80px;
    text-align: center;
}

/* 取消按钮样式 */
.card-button.cancel {
    background-color: #334155;
    color: #e2e8f0;
    border: 1px solid #475569;
}

.card-button.cancel:hover {
    background-color: #3e4a61;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 确认按钮样式 */
.card-button.confirm {
    background-color: #2563eb;
    color: white;
    border: 1px solid #2563eb;
}

.card-button.confirm:hover {
    background-color: #1d4ed8;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(29, 78, 216, 0.3);
}

/* 按钮点击效果 */
.card-button:active {
    transform: translateY(0);
    transition: all 0.1s ease;
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

    .card-buttons {
        flex-direction: column;
        gap: 10px;
    }

    .card-button {
        width: 100%;
        padding: 10px;
    }
}
</style>