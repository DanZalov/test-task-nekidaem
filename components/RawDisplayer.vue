<script setup lang="ts">
const props = defineProps<{
  title: string
  value: { name: string; order: number }[]
}>()
let valueString = ''
computed(() => (valueString = JSON.stringify(props.value, null, 2)))
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <pre>{{ JSON.stringify(props.value, null, 2) }}</pre>
  </div>
</template>

<style scoped>
pre {
  text-align: start;
}
</style>
