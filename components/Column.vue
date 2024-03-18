<script setup lang="ts">
import draggable from 'vuedraggable'
import { type DragOptionsProps } from './NewTable.vue'

const model = defineModel<ListItem[]>()
const props = defineProps<{
  title: string
  dragOptions: DragOptionsProps
}>()
const drag = ref(false)
function removeItem(item: ListItem) {
  const index = model.value?.indexOf(item)
  if (index) {
    model.value?.splice(index, 1)
  }
}
</script>

<template>
  <div class="column">
    <h3>{{ title }} ({{ model?.length }})</h3>
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
          <span>{{ element.value }}</span>
          <span>
            <IconClose :size="22" @click="removeItem(element)" />
          </span>
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
