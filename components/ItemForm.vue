<script setup lang="ts">
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
    store.addTask(props.column, tempValue)
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
    <button class="desktop" @click="addItem">Добавить</button>
    <button class="mobile" @click="addItem">
      <IconPlus :size="22" />
    </button>
  </div>
</template>

<style scoped>
.add-item-form {
  display: flex;
  max-width: 100%;
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

.add-item-form button.mobile {
  padding: 2px 4px;
  background-color: #c1c1c8;
  border: 1px solid #676768;
}

.mobile {
  display: flex;
}

.desktop {
  display: none;
}

@media (min-width: 768px) {
  .mobile {
    display: none;
  }

  .desktop {
    display: flex;
  }
}
</style>
