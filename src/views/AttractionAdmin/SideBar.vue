<template>
  <!-- 桌面版侧边栏 -->
  <aside id="sidebar" :class="{ 'collapsed': isCollapsed, 'mobile-hidden': isMobile }">
    <ul>
      <li class="logo">
        <div>
          <h1 v-if="!isCollapsed">PAFTL</h1>
        </div>
        <div class="expend_arrow" :class="{ expend: isExpand }" @click="handleExpand">
          <ChevronRightIcon />
        </div>
      </li>
      <li v-for="item in AsideItem" :key="item.id" :class="{ active: ActiveItem === item.link }">
        <a :href="item.link" @click="handleActice(item.link)">
          <component :is="item.icons" />
          <span v-if="!isCollapsed">{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </aside>

  <!-- 移动版底部导航栏 -->
  <nav id="mobile-nav" v-if="isMobile">
    <ul>
      <li v-for="item in AsideItem" :key="item.id" :class="{ active: ActiveItem === item.link }">
        <a :href="item.link" @click="handleActice(item.link)">
          <component :is="item.icons" />
          <span>{{ item.name }}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import DescriptionIncon from '@/components/icons/DescriptionIcon.vue'
import PersonIcon from '@/components/icons/PersonIcon.vue'
import ShoppingModeIcon from '@/components/icons/ShoppingModeIcon.vue'
import ReservationIcon from '@/components/icons/ReservationIcon.vue'
import GroupIcon from '@/components/icons/GroupIcon.vue'
import ChevronRightIcon from '@/components/icons/ChevronRightIcon.vue'
import ReceiptLongIcon from '@/components/icons/ReceiptLongIcon.vue'
import { ref, markRaw, onMounted, onBeforeUnmount } from 'vue'

const AsideItem = ref([
  { id: 1, name: '基本信息', icons: markRaw(DescriptionIncon), link: '#base-info' },
  { id: 2, name: '票务管理', icons: markRaw(ShoppingModeIcon), link: '#ticket' },
  { id: 3, name: '预约管理', icons: markRaw(ReservationIcon), link: '#reservation' },
  { id: 4, name: '订单管理', icons: markRaw(ReceiptLongIcon), link: '#order-list' },
  { id: 5, name: '成员信息', icons: markRaw(GroupIcon), link: '#personnel' },
  { id: 6, name: '个人信息', icons: markRaw(PersonIcon), link: '#personal-info' },
])

let ActiveItem = ref('#base-info')
let isExpand = ref(false)
let isCollapsed = ref(false)
let isMobile = ref(false)

const handleActice = (link: string) => {
  ActiveItem.value = link
}

const handleExpand = () => {
  isExpand.value = !isExpand.value
  isCollapsed.value = !isCollapsed.value
}

// 修改后的响应式处理
const checkScreenSize = () => {
  const width = window.innerWidth
  isMobile.value = width <= 768

  // 当宽度小于992px时默认折叠
  if (width < 992) {
    isCollapsed.value = true
    isExpand.value = false
  } else {
    // 大于992px时保持展开
    isCollapsed.value = false
    isExpand.value = false
  }
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style scoped>
/* 桌面版侧边栏样式 */
#sidebar {
  position: sticky;
  width: 200px;
  height: 100dvh;
  border-right: 1px solid #2a3a5a;
  top: 0;
  z-index: 100;
  box-shadow: 2px 0 8px 1px rgba(0, 0, 0, 0.3);
  transition: width 0.3s ease;
  background-color: #0a192f;
  color: #e2e8f0;
}

#sidebar.collapsed {
  width: 60px;
}

#sidebar ul {
  padding: 10px 8px;
}

#sidebar.collapsed ul {
  padding: 10px 4px;
}

#sidebar ul li {
  list-style: none;
  margin-bottom: 8px;
}

#sidebar ul li a {
  font-weight: 500;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  gap: 12px;
  white-space: nowrap;
}

#sidebar ul li.active a {
  background-color: rgba(56, 128, 255, 0.2);
  box-shadow: 0 2px 4px rgba(56, 128, 255, 0.1);
  transition: all 0.3s ease-in-out;
  color: #60a5fa;
}

#sidebar ul li a:hover {
  background-color: rgba(56, 128, 255, 0.1);
  transform: translateX(2px);
  transition: all 0.4s ease-in-out;
}


.logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  padding: 16px 8px;
  margin-bottom: 16px;
}

#sidebar.collapsed .logo {
  justify-content: center;
  padding: 16px 0;
}

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

#sidebar ul li.active a {
  background-color: rgba(41, 108, 208, 0.35);
  box-shadow: 0 2px 4px rgba(41, 108, 208, 0.1);
  transition: all 0.3s ease-in-out;
}

#sidebar ul li a {
  font-weight: 500;
  color: var(--primary-text-clr);
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  gap: 12px;
  white-space: nowrap;
}

#sidebar.collapsed ul li a {
  padding: 12px;
  justify-content: center;
}

#sidebar ul li a:hover {
  background-color: var(--hover-bg-clr);
  transform: translateX(2px);
  transition: all 0.4s ease-in-out;
}

#sidebar ul li a svg {
  fill: currentColor;
  min-width: 24px;
}

/* 移动版底部导航栏样式 */
#mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #0a192f;
  border-top: 1px solid #2a3a5a;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
  z-index: 100;
}

#mobile-nav ul {
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  margin: 0;
}

#mobile-nav ul li {
  list-style: none;
  flex: 1;
  text-align: center;
}

#mobile-nav ul li a {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  text-decoration: none;
  color: var(--primary-text-clr);
  font-size: 12px;
  gap: 4px;
}

#mobile-nav ul li.active a {
  color: #60a5fa;
}

#mobile-nav ul li a svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

/* 响应式设计 */
@media (max-width: 992px) {
  #sidebar {
    width: 60px;
    background-color: #0a192f;
    /* 添加过渡效果 */
    transition: width 0.3s ease;
  }

  #sidebar:not(.collapsed) {
    width: 200px;
  }

  #sidebar .logo h1,
  #sidebar.collapsed ul li a span {
    display: none;
  }

  #sidebar:not(.collapsed) .logo h1,
  #sidebar:not(.collapsed) ul li a span {
    display: block;
  }

  #sidebar .logo .expend_arrow {
    transform: rotate(90deg);
  }

  #sidebar .logo .expend_arrow.expend {
    transform: rotate(0deg);
  }

  #sidebar ul {
    padding: 10px 4px;
  }

  #sidebar.collapsed ul li a {
    padding: 12px;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  #sidebar {
    display: none;
  }

  #sidebar.mobile-hidden {
    display: none;
  }

  #mobile-nav {
    display: block;
  }
}

@media (max-width: 480px) {
  #mobile-nav ul li a {
    font-size: 10px;
    padding: 6px 2px;
  }

  #mobile-nav ul li a svg {
    width: 20px;
    height: 20px;
  }
}
</style>