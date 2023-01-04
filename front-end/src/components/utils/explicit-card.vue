<template>
  <p v-if="props.explicit">explicit</p>
</template>

<script setup lang="ts">
  interface Props {
    explicit: boolean;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  p {
    padding: 3px;

    background-color: #b2b2b2;
    color: black;

    font-weight: 700;
    font-size: 0.75rem;

    text-transform: uppercase;

    border-radius: 2px;
  }
</style>
