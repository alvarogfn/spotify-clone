<template>
  <template v-if="props.loading">
    <div class="loading" :class="props.class">
      <div class="loading__dot"></div>
      <div class="loading__dot"></div>
      <div class="loading__dot"></div>
    </div>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</template>

<script setup lang="ts">
  interface Props {
    loading: boolean;
    class?: string;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .loading {
    background-color: transparent;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    &__dot {
      margin-inline: 3px;
      height: max-content;

      display: block;

      width: 40px;
      height: 40px;

      background-color: #fff;

      border-radius: 50%;

      animation-name: fade;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      animation-direction: alternate;

      &:nth-child(1) {
        animation-delay: 0s;
      }

      &:nth-child(2) {
        animation-delay: 200ms;
      }

      &:nth-child(3) {
        animation-delay: 400ms;
      }
    }
  }
</style>
