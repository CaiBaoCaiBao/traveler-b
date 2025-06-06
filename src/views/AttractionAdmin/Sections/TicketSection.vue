<template>
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
            <div class="accordion-wrapper" v-for="(ticket, index) in data.Ticket.list" :key="index">
                <div class="accordion" :class="{ 'is-active': ticket.active }" @click="toggleAccordion(ticket)">
                    <div class="accordion-head">
                        <span>{{ ticket.name }} - ${{ ticket.price }}</span>
                        <div class="accordion-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div class="accordion-content">
                        <div class="accordion-body">
                            <p>{{ ticket.description }}</p>
                            <div class="ticket-meta">
                                <span><strong>Type:</strong> {{ ticket.type }}</span>
                                <span><strong>Availability:</strong> {{ ticket.availability }}</span>
                            </div>
                        </div>
                        <div class="accordion-footer">
                            <div class="accordion-actions">
                                <button class="edit-btn small" @click.stop="editTicket(index)">Edit</button>
                                <button class="delete-btn small" @click.stop="deleteTicket(index)">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button class="add-ticket-btn" @click="showAddTicketForm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
                Add Ticket
            </button>
        </section>
    </section>
    <!-- 票务表单弹窗 -->
    <Mask :is-mask="showTicketForm" @click="closeTicketForm">
        <div class="ticket-form" @click.stop>
            <div class="form-header">
                <h2>{{ isEditingTicket ? 'Edit Ticket' : 'Add New Ticket' }}</h2>
            </div>
            <div class="form-content">
                <form @submit.prevent="submitTicketForm">
                    <div class="form-group">
                        <label for="ticket-name">Ticket Name</label>
                        <input type="text" id="ticket-name" v-model="ticketForm.name" placeholder="Enter ticket name"
                            required>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="ticket-price">Price ($)</label>
                            <input type="number" id="ticket-price" v-model.number="ticketForm.price" placeholder="0.00"
                                min="0" step="0.01" required>
                        </div>

                        <div class="form-group">
                            <label for="ticket-type">Type</label>
                            <select id="ticket-type" v-model="ticketForm.type" required>
                                <option value="">Select type</option>
                                <option value="Adult">Adult</option>
                                <option value="Child">Child</option>
                                <option value="Senior">Senior</option>
                                <option value="Student">Student</option>
                                <option value="Family">Family</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="ticket-availability">Availability</label>
                        <select id="ticket-availability" v-model="ticketForm.availability" required>
                            <option value="">Select availability</option>
                            <option value="Available">Available</option>
                            <option value="Limited">Limited</option>
                            <option value="Sold Out">Sold Out</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="ticket-description">Description</label>
                        <textarea id="ticket-description" v-model="ticketForm.description" rows="4"
                            placeholder="Enter ticket description"></textarea>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="cancel-btn" @click="closeTicketForm">Cancel</button>
                        <button type="submit" class="save-btn">{{ isEditingTicket ? 'Update' : 'Save' }}</button>
                    </div>
                </form>
            </div>
        </div>
    </Mask>
</template>

<script setup lang="ts">
import Mask from "@/components/Mask.vue";
import { ref, reactive } from "vue";
const isFree = ref(false)
const showTicketForm = ref(false)
const isEditingTicket = ref(false)
const currentTicketIndex = ref(-1)
const isMask = ref(false)

const ticketForm = reactive({
    name: '',
    price: 0,
    type: '',
    availability: '',
    description: ''
})
const data = reactive({
    Ticket: {
        list: [
            {
                name: 'Standard Ticket',
                price: 25.99,
                type: 'Adult',
                availability: 'Available',
                description: 'Standard admission ticket with full access to all attractions.',
                active: false
            },
            {
                name: 'Child Ticket',
                price: 12.99,
                type: 'Child',
                availability: 'Available',
                description: 'Discounted ticket for children under 12 years old.',
                active: false
            }
        ]
    },
})
const handleMask = () => {
    isMask.value = !isMask.value
}


const handleFreeTicket = () => {
    isFree.value = !isFree.value;
    console.log("Free ticket status:", isFree.value);
}

const toggleAccordion = (ticket: any) => {
    ticket.active = !ticket.active
}

const saveChanges = () => {
    // 保存逻辑
    handleMask() // 关闭弹窗
}

// 阻止事件冒泡
const stopPropagation = (e: Event) => {
    e.stopPropagation()
}

const showAddTicketForm = () => {
    resetTicketForm()
    isEditingTicket.value = false
    showTicketForm.value = true
}

const editTicket = (index: number) => {
    const ticket = data.Ticket.list[index]
    Object.assign(ticketForm, {
        name: ticket.name,
        price: ticket.price,
        type: ticket.type,
        availability: ticket.availability,
        description: ticket.description
    })
    currentTicketIndex.value = index
    isEditingTicket.value = true
    showTicketForm.value = true
}

const deleteTicket = (index: number) => {
    data.Ticket.list.splice(index, 1)
}

const submitTicketForm = () => {
    const ticketData = { ...ticketForm, active: false }

    if (isEditingTicket.value) {
        data.Ticket.list[currentTicketIndex.value] = ticketData
    } else {
        data.Ticket.list.push(ticketData)
    }

    closeTicketForm()
}

const closeTicketForm = () => {
    showTicketForm.value = false
    resetTicketForm()
}

const resetTicketForm = () => {
    Object.assign(ticketForm, {
        name: '',
        price: 0,
        type: '',
        availability: '',
        description: ''
    })
    currentTicketIndex.value = -1
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

#ticket {
    position: relative;
}

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

.add-ticket-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px;
    margin-top: 16px;
    background-color: rgba(56, 128, 255, 0.1);
    border: 1px dashed #3b82f6;
    border-radius: 8px;
    color: #60a5fa;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
}

.add-ticket-btn:hover {
    background-color: rgba(56, 128, 255, 0.2);
    border-color: #60a5fa;
}

.add-ticket-btn svg {
    stroke: currentColor;
}

.ticket-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
    font-size: 14px;
    color: #94a3b8;
}

.ticket-meta span {
    display: flex;
    align-items: center;
    gap: 4px;
}

.ticket-meta strong {
    color: #e2e8f0;
    font-weight: 500;
}

/* 票务表单样式 */
.ticket-form {
    width: 90%;
    max-width: 600px;
    background-color: #1e293b;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.form-row {
    display: flex;
    gap: 16px;
}

.form-row .form-group {
    flex: 1;
}

select {
    width: 100%;
    padding: 10px 12px;
    background-color: #334155;
    border: 1px solid #475569;
    border-radius: 6px;
    color: #e2e8f0;
    font-size: 14px;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 16px;
}

select:focus {
    outline: none;
    border-color: #60a5fa;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* 响应式调整 */
@media (max-width: 1200px) {
    .section-group {
        padding: 18px;
    }
}

@media (max-width: 992px) {
    .section-group {
        padding: 15px;
    }
}

@media (max-width: 768px) {
    .section-group {
        padding: 12px;
    }

    .form-row {
        flex-direction: column;
        gap: 16px;
    }

    .ticket-form {
        width: 95%;
        padding: 16px;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 1.5rem;
    }

    .section-group {
        padding: 10px;
        margin-bottom: 12px;
    }

    #ticket-switch label {
        font-size: 14px;
    }
}
</style>