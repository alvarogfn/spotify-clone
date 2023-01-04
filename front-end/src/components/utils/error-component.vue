<template>
  <template v-if="error">
    <div class="error">
      <h1 class="error__title">
        Something went wrong. Please reload the page.
      </h1>
      <button class="error__reload" @click="reload">reload</button>
    </div>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
  interface Props {
    error: boolean;
  }

  const props = defineProps<Props>();

  function reload() {
    location.reload();
  }
</script>

<style lang="scss" scoped>
  .error {
    color: #f1f1f1;
    text-align: center;

    &__title {
      font-size: 1.6rem;

      margin: 20px 0;
    }

    &__reload {
      text-transform: capitalize;
      font-weight: 500;
      font-size: 0.9rem;

      background-color: #1ed760;
      color: #000;
      padding: 10px 20px;

      border-radius: 5px;

      transition: 200ms ease-in-out;

      &:active {
        background-color: darken($color: #1ed760, $amount: 10%);
      }
    }
  }
</style>
