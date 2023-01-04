<template>
  <div class="liked-songs">
    <love-icon class="liked-songs__icon" :style="transform" />
  </div>
</template>

<script setup lang="ts">
  import LoveIcon from "../love-icon.vue";
  import { computed } from "vue";

  interface Props {
    size?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 0.8,
  });

  const transform = computed(() => ({
    transform: `scale(${props.size})`,
  }));
</script>

<style lang="scss" scoped>
  @use "../../../styles/utils.scss" as *;
  .liked-songs {
    @include centralize-with-flex;

    padding: 5px;
    background-image: linear-gradient(149.46deg, #450af5, #8e8ee5 99.16%);
    background-color: white;
    border-radius: 2px;
    fill: white;

    &__icon {
      transform: scale(0.8);
    }
  }
</style>
