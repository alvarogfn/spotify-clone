<template>
  <button-icon-wrapper class="shuffle">
    <random-icon :class="{ 'shuffle--on': shuffle }" />
  </button-icon-wrapper>
</template>

<script setup lang="ts">
  import ButtonIconWrapper from "./button-icon-wrapper.vue";
  import RandomIcon from "../icons/random-icon.vue";

  interface Props {
    disabled?: boolean;
    shuffle: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: true,
  });
</script>

<style lang="scss" scoped>
  .shuffle {
    &--on {
      fill: #1ed760;
    }
  }
</style>
