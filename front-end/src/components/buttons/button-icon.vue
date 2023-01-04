<template>
  <button class="button" :disabled="props.disabled">
    <component :is="icon" />
  </button>
</template>

<script setup lang="ts">
  interface Props {
    icon: any;
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
  });
</script>

<style lang="scss" scoped>
  @use "../../styles/utils.scss" as *;
  .button {
    fill: #b2b2b2;
    @include centralize-with-flex;

    &:hover {
      fill: white;
    }
    &:active {
      fill: #b2b2b2;
    }
  }
</style>
