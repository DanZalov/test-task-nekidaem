<script setup lang="ts">
const dragOptions: DragOptionsProps = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost',
}

const store = useTasksStore()
const titles = ['On hold', 'In progress', 'Need review', 'Approved']

onMounted(async () => {
  await store.getData()
})
</script>

<template>
  <div class="table">
    <Column
      title="On hold"
      :dragOptions="dragOptions"
      v-model="store.hold"
      :column="'0'"
    />
    <Column
      title="In progress"
      :dragOptions="dragOptions"
      v-model="store.progress"
      :column="'1'"
    />
    <Column
      title="Need review"
      :dragOptions="dragOptions"
      v-model="store.review"
      :column="'2'"
    />
    <Column
      title="Approved"
      :dragOptions="dragOptions"
      v-model="store.approved"
      :column="'3'"
    />

    <NewRawDisplayer
      v-for="(currentTitle, index) of titles"
      :value="store.getArrValues(index)"
      :title="currentTitle"
    />
  </div>
</template>

<style>
.table {
  display: grid;
  grid-template-columns: repeat(4, 85%);
  gap: 20px;
}

@media (min-width: 768px) {
  .table {
    grid-template-columns: repeat(4, calc(25% - 15px));
  }
}
</style>
