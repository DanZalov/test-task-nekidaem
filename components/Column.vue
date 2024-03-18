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
        <ListItem :element="element" :removeItem="removeItem" />
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
</style>
