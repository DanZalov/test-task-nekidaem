<script setup lang="ts">
import draggable from 'vuedraggable'
import { type DragOptionsProps } from './NewTable.vue'

interface ListItem {
  value: string
  id: number
}

const defaultList1: ListItem[] = [
  {
    value: 'vue.draggable',
    id: 0,
  },
  {
    value: 'draggable',
    id: 1,
  },
  {
    value: 'component',
    id: 2,
  },
  {
    value: 'for',
    id: 3,
  },
  {
    value: 'vue.js 2.0',
    id: 4,
  },
  {
    value: 'based',
    id: 5,
  },
  {
    value: 'on',
    id: 6,
  },
  {
    value: 'Sortablejs',
    id: 7,
  },
]

const defaultList2: ListItem[] = [
  {
    value: 'vue.draggable.next',
    id: 10,
  },
  {
    value: 'draggable',
    id: 11,
  },
  {
    value: 'component',
    id: 12,
  },
  {
    value: 'for',
    id: 13,
  },
  {
    value: 'next 3.0',
    id: 14,
  },
  {
    value: 'based',
    id: 15,
  },
  {
    value: 'on',
    id: 16,
  },
  {
    value: 'Sortablejs',
    id: 17,
  },
]

const props = defineProps<{
  title: string
  dragOptions: DragOptionsProps
}>()
const drag = ref(false)
const newItem = ref('')
const list = ref([...defaultList2])

function addItem() {
  if (newItem.value.trim() !== '') {
    list.value.push({ value: newItem.value, id: Date.now() })
    newItem.value = ''
  }
}
</script>

<template>
  <div class="column">
    <h3>{{ title }}</h3>
    <draggable
      class="list-group"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      v-model="list"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <template #item="{ element }">
        <li class="list-group-item">
          {{ element.value }}
        </li>
      </template>
    </draggable>
    <div class="add-item-form">
      <input type="text" v-model="newItem" placeholder="Добавить карточку" />
      <button @click="addItem">Добавить</button>
    </div>
  </div>
</template>

<style scoped>
.column {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
  height: fit-content;
}

.column h3 {
  margin: 0;
  margin-bottom: 10px;
}

.list-group {
  list-style-type: none;
  padding-left: 0;
}

.list-group-item {
  margin: 0;
  font-size: 14px;
  color: #333;
  padding: 8px;
  text-align: left;
  border: 1px solid #ccc;
  margin-bottom: 5px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.1;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

.add-item-form {
  display: flex;
}

.add-item-form input[type='text'] {
  flex: 1;
  margin-right: 10px;
}

.add-item-form button {
  padding: 8px 15px;
  background-color: #676768;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
