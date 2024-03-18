<script setup lang="ts">
import type { ListItem } from '~/stores/tasks'

const props = defineProps<{
  list: ListItem[]
}>()
const newItem = ref('')

function addItem() {
  if (newItem.value.trim() !== '') {
    props.list.push({ value: newItem.value, id: Date.now() })
    newItem.value = ''
  }
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
