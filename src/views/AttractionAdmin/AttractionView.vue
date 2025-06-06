<template>
    <Container>
        <div class="attraction-view">
            <SideBar />
            <section id="main-content">
                <BaseInfoSection />
                <TicketSection />
            </section>
        </div>
    </Container>
</template>

<script setup lang="ts">
import Container from "@/components/Container.vue";
import SideBar from "./SideBar.vue";
import { reactive, ref, onUnmounted } from "vue";
import BaseInfoSection from "./Sections/BaseInfoSection.vue";
import TicketSection from "./Sections/TicketSection.vue";
onUnmounted(() => {
    document.body.style.overflow = ''
})

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

/* 响应式设计 */
@media (max-width: 1200px) {
    #main-content {
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
}

@media (max-width: 768px) {
    .attraction-view {
        grid-template-columns: 1fr;
    }

    #main-content {
        margin-top: 0;
        padding: 12px;
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