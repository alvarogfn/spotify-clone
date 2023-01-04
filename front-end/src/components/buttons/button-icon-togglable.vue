<template>
  <button class="button" :class="{ 'button--active': active }" style="">
    <component :is="icon" />
  </button>
</template>

<script setup lang="ts">
  interface props {
    icon: any;
    active: boolean;
  }

  defineProps<props>();
</script>

<style lang="scss" scoped>
  @use "../../styles/utils.scss" as *;
  .button {
    fill: #b2b2b2;

    @include centralize-with-flex;

    &:hover {
      filter: brightness(130%);
    }

    &--active {
      fill: #1ed760;
    }
  }
</style>
