<template>
  <button class="button" :style="styles">
    <pause-icon />
  </button>
</template>

<script setup lang="ts">
  import PauseIcon from "../icons/pause-icon.vue";
  import { computed } from "vue";

  interface Props {
    background?: string;
    color?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    background: "#fff",
    color: "#000",
  });

  const styles = computed(() => ({
    fill: props.color,
    background: props.background,
  }));
</script>

<style lang="scss" scoped>
  @use "../../styles/utils.scss" as *;
  .button {
    fill: #000;
    background-color: #fff;
    border-radius: 50%;
    height: 40px;
    width: 40px;

    @include centralize-with-flex;

    &:hover {
      scale: 1.1;
    }
    &:active {
      scale: 1;
    }
  }
</style>
