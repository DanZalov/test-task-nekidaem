<script setup lang="ts">
export interface DragOptionsProps {
  animation: number
  group: string
  disabled: boolean
  ghostClass: string
}

const dragOptions: DragOptionsProps = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}

const store = useTasksStore()
const titles = ['On hold', 'In progress', 'Need review', 'Approved']
</script>

<template>
  <div class="table">
    <!-- <Column
      v-for="(currentTitle, index) of titles"
      :title="currentTitle"
      :dragOptions="dragOptions"
      :order="index"
    /> -->
    <Column title="On hold" :dragOptions="dragOptions" v-model="store.hold" />
    <Column
      title="In progress"
      :dragOptions="dragOptions"
      v-model="store.progress"
    />
    <Column
      title="Need review"
      :dragOptions="dragOptions"
      v-model="store.review"
    />
    <Column
      title="Approved"
      :dragOptions="dragOptions"
      v-model="store.approved"
    />

    <NewRawDisplayer
      v-for="i of 4"
      :value="store.getArrValues(i - 1)"
      title="List"
    />
  </div>
</template>

<style>
.table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>
