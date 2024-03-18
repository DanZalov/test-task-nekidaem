<script setup lang="ts">
const props = defineProps<{
  removeItem: (element: ListItem) => void
  element: ListItem
}>()
</script>

<template>
  <li class="list-group-item">
    <span>{{ element.value }}</span>
    <span>
      <IconClose :size="22" @click="removeItem(element)" />
    </span>
  </li>
</template>

<style scoped>
.list-group-item {
  margin: 0;
  font-size: 14px;
  color: #333;
  padding: 0px 8px;
  text-align: left;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-group-item span:first-child {
  padding: 6px 0px;
}

.list-group-item span:last-child {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.list-group-item {
  cursor: move;
}
</style>
