<template>
  <div class="error">
    <p class="error__title">Something went wrong, possible causes:</p>
    <ul class="error__list">
      <li
        class="error__item"
        v-for="(cause, index) in props.causes"
        :key="index"
      >
        • {{ cause }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    causes: string[];
  }
  const props = withDefaults(defineProps<Props>(), {});
</script>

<style lang="scss" scoped>
  .error {
    font-size: 0.8rem;
    opacity: 1;
    color: red;
    &__title {
      font-size: 1.1em;
      margin-bottom: 10px;
    }
    &__list {
      font-size: 0.9em;
      display: flex;
      flex-flow: column nowrap;
      row-gap: 5px;
    }
    &__item {
      text-transform: capitalize;
    }
  }
</style>
