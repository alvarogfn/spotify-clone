<template>
  <transition name="fade-appear">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
  interface Props {
    to?: "bottom" | "top" | "left" | "right";
  }
  withDefaults(defineProps<Props>(), {
    to: "top",
  });
</script>

<style lang="scss" scoped>
  @keyframes toTop {
    0% {
      opacity: 0;
      transform: translateY(5px);
    }
    100% {
      opacity: 1;
      opacity: translateY(0);
    }
  }

  .fade-appear {
    &-enter-active,
    &-leave-active {
      animation-name: toTop;
      animation-duration: 300ms;
      animation-fill-mode: forwards;
      animation-timing-function: linear;
    }

    &-enter-active {
      animation-direction: normal;
    }
    &-leave-active {
      animation-direction: reverse;
    }
  }
</style>
