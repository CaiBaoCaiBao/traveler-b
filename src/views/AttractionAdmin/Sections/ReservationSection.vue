<template>
  <section id="reservation" class="section-group">
    <h1>Reservation</h1>
    <BinaryToggle v-model="isNeed" false-label="Not need" true-label="Need" />
    <TagBar :tags="uniqueDates" v-model="selectedDate">
      <TableComponent :data="filteredData">
        <TableColumn prop="name" label="Name" />
        <TableColumn prop="date" label="Date" />
        <TableColumn prop="address" label="Address" />
        <TableColumn prop="status" label="Status" />
      </TableComponent>
    </TagBar>
  </section>
</template>


<script setup lang="ts">
import BinaryToggle from '@/components/ToggleButton/BinaryToggle.vue';
import TableComponent from '@/components/Table/TableComponent.vue';
import TableColumn from '@/components/Table/TableColumn.vue';
import TagBar from '@/components/TagBar/TagBar.vue';
import { ref, computed } from 'vue';

const isNeed = ref(false);

const tableData = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom1',
    address: 'No. 189, Grove St, Los Angeles',
    status: 'Active',
  }, {
    id: 2,
    date: '2016-05-02',
    name: 'Tom2',
    address: 'No. 189, Grove St, Los Angeles',
    status: 'Inactive',
  }, {
    id: 3,
    date: '2016-05-04',
    name: 'Tom3',
    address: 'No. 189, Grove St, Los Angeles',
    status: 'Pending',
  }, {
    id: 4,
    date: '2016-05-01',
    name: 'Tom4',
    address: 'No. 189, Grove St, Los Angeles',
    status: 'Active',
  }, {
    id: 5,
    date: '2016-05-04',
    name: 'Tom3-2',
    address: 'No. 189, Grove St, Los Angeles',
    status: 'Pending',
  },
];

// 使用计算属性获取唯一日期
const uniqueDates = computed(() => {
  return Array.from(new Set(tableData.map(item => item.date)));
});

// 默认选中第一个日期
const selectedDate = ref(uniqueDates.value[0] || '');

const filteredData = computed(() => {
  if (!selectedDate.value) return [];
  return tableData.filter(item => item.date === selectedDate.value);
});
</script>

<style scoped>
.section-group {
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #1e293b;
  color: white;
}
</style>