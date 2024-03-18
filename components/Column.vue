<script setup lang="ts">
import draggable from 'vuedraggable'
import { type DragOptionsProps } from './NewTable.vue'

const store = useTasksStore()
const model = defineModel<ListItem[]>()
const props = defineProps<{
  title: string
  dragOptions: DragOptionsProps
}>()
const drag = ref(false)
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
      v-model="model"
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
    <ItemForm :list="model || []" />
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
</style>
