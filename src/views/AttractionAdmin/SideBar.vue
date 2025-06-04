<template>
    <aside class="sidebar">
        <ul>
            <li>
                <div>
                    <span>PAFTL</span>
                </div>
            </li>
            <li v-for="item in AsideItem" :key="item.id">
                <a :href="item.link" :class="{ active: ActiveItem }" @click="handleActice(item.link)">
                    <component :is="item.icons" />
                    <span>{{ item.name }}</span>
                </a>
            </li>
        </ul>
    </aside>
</template>

<script setup lang="ts">
import DescriptionIncon from '@/components/icons/DescriptionIcon.vue'
import PersonIcon from '@/components/icons/PersonIcon.vue'
import ShoppingModeIcon from '@/components/icons/ShoppingModeIcon.vue'
import ReservationIcon from '@/components/icons/ReservationIcon.vue'
import GroupIcon from '@/components/icons/GroupIcon.vue'

import { ref } from 'vue'

const AsideItem = ref([
    { id: 1, name: '基本信息管理', icons: DescriptionIncon, link: '#base-info' },
    { id: 2, name: '票务管理', icons: ShoppingModeIcon, link: '#ticket' },
    { id: 3, name: '预约管理', icons: ReservationIcon, link: '#reservation' },
    { id: 4, name: '成员信息管理', icons: GroupIcon, link: '#personnel' },
    { id: 5, name: '个人信息', icons: PersonIcon, link: '#personal-info' },
])

let ActiveItem = ref('#base-info')
const handleActice = (link: string) => {
    ActiveItem.value = link;
    console.log(ActiveItem)
}
</script>

<style scoped>
.sidebar {
    position: sticky;
    height: 100vh;
    width: 200px;
    background-color: rgb(5, 0, 44);
    padding: 10px;
}

.sidebar ul li {
    list-style: none;
}

.sidebar ul li a {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 10px;
    border-radius: 10px;
}

.sidebar ul li a:hover {
    background-color: var(--hover-bg-clr);
}

.sidebar ul li a.active {
    color: blue;
}
</style>