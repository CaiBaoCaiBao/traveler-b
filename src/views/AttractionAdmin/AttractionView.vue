<template>
    <Container>
        <div class="attraction-view">
            <SideBar />
            <section id="main-content">
                <section id="base-info" class="section-group">
                    <h1>XXXX</h1>
                    <div class="tagList">
                        <div class="tag">
                            <span>TAG</span>
                        </div>
                    </div>

                    <p class="DescriptionText">
                        DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptiom
                    </p>
                    <div class="btn-group">
                        <button class="edit-btn">Edit</button>
                    </div>
                </section>
                <section id="ticket" class="section-group">
                    <h1>Ticket</h1>
                    <div id="ticket-switch">
                        <input type="checkbox" id="ticket-checkbox" class="checkbox-input" @change="handleFreeTicket"
                            :checked="isFree" />
                        <label for="ticket-checkbox" v-if="!isFree">Paid Ticket</label>
                        <label for="ticket-checkbox" v-else>Free Ticket</label>
                    </div>
                    <!-- 手风琴 -->
                    <section v-if="!isFree" class="accordion-section">
                        <div class="accordion-wrapper">
                            <div class="accordion" :class="{ 'is-active': accordionActive }" @click="toggleAccordion">
                                <div class="accordion-head">
                                    <span>Ticket Details</span>
                                    <div class="accordion-icon">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="accordion-content">
                                    <div class="accordion-body">
                                        <p>Detailed ticket description and information goes here. This can include
                                            pricing,
                                            availability, and other relevant details.</p>
                                    </div>
                                    <div class="accordion-footer">
                                        <div class="accordion-actions">
                                            <button class="edit-btn small">Edit</button>
                                            <button class="delete-btn small">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </div>
    </Container>
</template>

<script setup lang="ts">
import Container from "@/components/Container.vue";
import SideBar from "./SideBar.vue";
import { reactive, ref } from "vue";

const isFree = ref(false)
const accordionActive = ref(false)

const data = reactive({
    BaseInfo: {},
    Ticket: {},
    Reservation: {},
    Personnel: {},
    Personal: {}
})

const handleFreeTicket = () => {
    isFree.value = !isFree.value;
    console.log("Free ticket status:", isFree.value);
}

const toggleAccordion = () => {
    accordionActive.value = !accordionActive.value
}
</script>

<style scoped>
.attraction-view {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 20px;
    width: 100%;
    background-color: #0f172a;
    min-height: 100vh;
}

#main-content {
    padding: 20px;
    overflow: auto;
    background-color: #0f172a;
    color: #e2e8f0;
}

.section-group {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #2a3a5a;
    border-radius: 10px;
    background-color: #1e293b;
}

/* base-info */
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

/* ticket */
#ticket-switch {
    display: flex;
    align-items: center;
    margin: 15px 0;
    gap: 10px;
}

input[type="checkbox"].checkbox-input {
    opacity: 0;
    position: absolute;
}

input[type="checkbox"].checkbox-input+label {
    position: relative;
    user-select: none;
    cursor: pointer;
    padding-left: 50px;
    /* 为开关留出空间 */
    min-height: 24px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: #e2e8f0;
}

/* 开关轨道 - ::before */
input[type="checkbox"].checkbox-input+label::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 20px;
    background-color: #3e6396;
    border: 1px solid #475569;
    border-radius: 20px;
    transition: background-color 0.3s;
}

/* 开关按钮 - ::after */
input[type="checkbox"].checkbox-input+label::after {
    content: "";
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-color: #94a3b8;
    border-radius: 50%;
    transition: all 0.3s;
}

/* 选中状态 */
input[type="checkbox"].checkbox-input:checked+label::before {
    background-color: #2563eb;
}

input[type="checkbox"].checkbox-input:checked+label::after {
    background-color: #e2e8f0;
    left: 22px;
    /* 40px宽度 - 16px按钮 - 2px边距 */
}

/* 手风琴样式 */
.accordion-wrapper {
    margin-top: 16px;
}

.accordion {
    background-color: #1e293b;
    border: 1px solid #2a3a5a;
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.accordion.is-active {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.accordion-head {
    padding: 14px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background-color: rgba(56, 128, 255, 0.1);
    transition: background-color 0.3s ease;
}

.accordion:hover .accordion-head {
    background-color: rgba(56, 128, 255, 0.15);
}

.accordion-icon {
    transition: transform 0.3s ease;
}

.accordion.is-active .accordion-icon {
    transform: rotate(180deg);
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
}

.accordion.is-active .accordion-content {
    max-height: 500px;
    /* 根据内容调整 */
}

.accordion-body {
    padding: 16px;
    color: #cbd5e1;
    line-height: 1.6;
    border-top: 1px solid #2a3a5a;
}

.accordion-footer {
    padding: 12px 16px;
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #2a3a5a;
    background-color: rgba(0, 0, 0, 0.1);
}

.accordion-actions {
    display: flex;
    gap: 10px;
}

.edit-btn.small {
    padding: 6px 12px;
    font-size: 14px;
}

.delete-btn.small {
    padding: 6px 12px;
    font-size: 14px;
    background-color: rgba(239, 68, 68, 0.2);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #ef4444;
}

.delete-btn.small:hover {
    background-color: rgba(239, 68, 68, 0.3);
}

/* 响应式设计 */
@media (max-width: 1200px) {
    #main-content {
        padding: 18px;
    }

    .section-group {
        padding: 18px;
    }
}

@media (max-width: 992px) {
    .attraction-view {
        grid-template-columns: 60px 1fr;
    }

    #main-content {
        padding: 15px;
    }

    .section-group {
        padding: 15px;
    }

    .DescriptionText {
        font-size: 15px;
    }
}

@media (max-width: 768px) {
    .attraction-view {
        grid-template-columns: 1fr;
    }

    #main-content {
        margin-top: 0;
        padding: 12px;
    }

    .section-group {
        padding: 12px;
    }

    .edit-btn {
        padding: 6px 12px;
        font-size: 14px;
    }
}

@media (max-width: 480px) {
    .attraction-view {
        gap: 8px;
    }

    #main-content {
        padding: 10px;
    }

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