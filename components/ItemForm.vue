<script setup lang="ts">
import type { ColumnRow, ListItem } from '~/stores/tasks'

const props = defineProps<{
  list: ListItem[]
  column: ColumnRow
}>()
const newItem = ref('')
const store = useTasksStore()

function addItem() {
  const tempValue = newItem.value.trim()
  if (tempValue !== '') {
    props.list.push({ value: tempValue, id: Date.now() })
    newItem.value = ''
  }
  store.addTask(props.column, tempValue)
}
</script>

<template>
  <div class="add-item-form">
    <input
      type="text"
      v-model="newItem"
      placeholder="Добавить карточку"
      @keydown.enter="addItem"
    />
    <button @click="addItem">Добавить</button>
  </div>
</template>

<style scoped>
.add-item-form {
  display: flex;
}

.add-item-form input[type='text'] {
  flex: 1;
  margin-right: 10px;
  padding-left: 5px;
}

.add-item-form button {
  padding: 8px 15px;
  background-color: #676768;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
