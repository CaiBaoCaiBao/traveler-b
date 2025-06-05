<template>
    <aside id="sidebar">
        <ul>
            <li class="logo">
                <div>
                    <h1>PAFTL</h1>
                </div>

                <div class="expend_arrow" :class="{ expend: isExpand }" @click="handleExpand">
                    <ChevronRightIcon />
                </div>

            </li>
            <li v-for="item in AsideItem" :key="item.id" :class="{ active: ActiveItem === item.link }">
                <a :href="item.link" @click="handleActice(item.link)">
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
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'

import { ref, markRaw } from 'vue'

const AsideItem = ref([
    { id: 1, name: '基本信息管理', icons: markRaw(DescriptionIncon), link: '#base-info' },
    { id: 2, name: '票务管理', icons: markRaw(ShoppingModeIcon), link: '#ticket' },
    { id: 3, name: '预约管理', icons: markRaw(ReservationIcon), link: '#reservation' },
    { id: 4, name: '成员信息管理', icons: markRaw(GroupIcon), link: '#personnel' },
    { id: 5, name: '个人信息', icons: markRaw(PersonIcon), link: '#personal-info' },
])


let ActiveItem = ref('#base-info')
let isExpand = ref(false)

const handleActice = (link: string) => {
    ActiveItem.value = link;
    console.log(ActiveItem)
}
const handleExpand = () => {
    isExpand.value = !isExpand.value
}
</script>

<style scoped>
#sidebar {
    position: sticky;
    width: 200px;

    height: 100vh;
    border-right: 1px solid var(--primary-border-clr);
    top: 0;
    z-index: 999;
    box-shadow: 2px 0 8px 1px rgba(193, 193, 193, 0.2);
}

#sidebar ul {
    padding: 10px 16px;
}

#sidebar ul li {
    list-style: none;
    margin-bottom: 8px;
}

.logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    padding: 16px 12px;
    margin-bottom: 16px;

    .expend_arrow {
        transition: all 0.3s ease;
        cursor: pointer;
        padding: 2px;
        border-radius: 10px;
    }

    .expend_arrow:hover {
        background-color: var(--hover-bg-clr, #f3f4f6);
    }

    .expend {
        transform: rotate(180deg);

    }

    svg {
        cursor: pointer;
    }
}

#sidebar ul li.active a {
    background-color: rgba(41, 108, 208, 0.35);
    box-shadow: 0 2px 4px rgba(41, 108, 208, 0.1);
    transform: calc(1.5);
    transition: all 0.3s ease-in-out;
}

#sidebar ul li a {
    font-weight: 500;
    color: var(--primary-text-clr);
    /* 默认字体颜色 */
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 12px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    gap: 12px;
}

#sidebar ul li a:hover {
    background-color: var(--hover-bg-clr);
    transform: translateX(2px);
    /* 悬停微移动效果 */
    transition: all 0.4s ease-in-out;
}

#sidebar ul li a svg {
    fill: currentColor;
    /* 图标颜色跟随文字颜色 */
}
</style>