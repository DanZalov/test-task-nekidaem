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

const titles = ['On hold', 'In progress', 'Need review', 'Approved']
</script>

<template>
  <div class="table">
    <Column
      v-for="currentTitle of titles"
      :title="currentTitle"
      :dragOptions="dragOptions"
    />

    <!-- <NewRawDisplayer :value="list1" title="List" />

    <NewRawDisplayer :value="list2" title="List" />

    <NewRawDisplayer :value="list3" title="List" />

    <NewRawDisplayer :value="list4" title="List" /> -->
  </div>
</template>

<style>
.table {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>
