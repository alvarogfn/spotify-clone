<template>
  <button class="button">{{ props.label }}</button>
</template>

<script setup lang="ts">
  interface Props {
    label: string;
  }
  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .button {
  }
</style>
