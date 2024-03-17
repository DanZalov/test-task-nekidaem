<script setup lang="ts">
import draggable from 'vuedraggable'

const message1 = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs',
]

const message2 = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs',
]

const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}

const list1 = ref(
  message1.map((name, index) => {
    return { name, order: index + 1 }
  }),
)
const list2 = ref(
  message2.map((name, index) => {
    return { name, order: index + 1 }
  }),
)
const drag = ref(false)

function sortList() {
  list.value.sort((a, b) => a.order - b.order)
}
</script>

<template>
  <div class="row">
    <div class="col-2">
      <button class="btn btn-secondary button" @click="sortList">
        To original order
      </button>
    </div>

    <div class="col-6">
      <h3>Transition1</h3>
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
            {{ element.name }}
          </li>
        </template>
      </draggable>
    </div>

    <div class="col-6">
      <h3>Transition2</h3>
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
            {{ element.name }}
          </li>
        </template>
      </draggable>
    </div>

    <rawDisplayer class="col-3" :value="list1" title="List" />

    <rawDisplayer class="col-3" :value="list2" title="List" />
  </div>
</template>

<style>
.button {
  margin-top: 35px;
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
