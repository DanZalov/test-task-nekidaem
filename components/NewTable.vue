<script setup lang="ts">
import draggable from 'vuedraggable'

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

const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}

const list1 = ref([...defaultList1])
const list2 = ref([...defaultList2])
const list3 = ref([...defaultList1])
const list4 = ref([...defaultList2])
const drag = ref(false)
</script>

<template>
  <div class="table">
    <div class="column">
      <h3>On hold</h3>
      <draggable
        class="list-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="list1"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
      >
        <template #item="{ element }">
          <li class="list-group-item">
            <i
              :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
              @click="element.fixed = !element.fixed"
              aria-hidden="true"
            ></i>
            {{ element.value }}
          </li>
        </template>
      </draggable>
    </div>

    <div class="column">
      <h3>In progress</h3>
      <draggable
        class="list-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="list2"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
      >
        <template #item="{ element }">
          <li class="list-group-item">
            <i
              :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
              @click="element.fixed = !element.fixed"
              aria-hidden="true"
            ></i>
            {{ element.value }}
          </li>
        </template>
      </draggable>
    </div>

    <div class="column">
      <h3>Need review</h3>
      <draggable
        class="list-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="list3"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
      >
        <template #item="{ element }">
          <li class="list-group-item">
            <i
              :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
              @click="element.fixed = !element.fixed"
              aria-hidden="true"
            ></i>
            {{ element.value }}
          </li>
        </template>
      </draggable>
    </div>

    <div class="column">
      <h3>Approved</h3>
      <draggable
        class="list-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="list4"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
      >
        <template #item="{ element }">
          <li class="list-group-item">
            <i
              :class="
                element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'
              "
              @click="element.fixed = !element.fixed"
              aria-hidden="true"
            ></i>
            {{ element.value }}
          </li>
        </template>
      </draggable>
    </div>

    <NewRawDisplayer class="col-3" :value="list1" title="List" />

    <NewRawDisplayer class="col-3" :value="list2" title="List" />

    <NewRawDisplayer class="col-3" :value="list3" title="List" />

    <NewRawDisplayer class="col-3" :value="list4" title="List" />
  </div>
</template>

<style>
.table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
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
