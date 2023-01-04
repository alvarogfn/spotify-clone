<template>
  <div class="view">
    <component
      :is="header"
      :scroll-position="scrollPosition"
      :username="userStore.user.name ?? undefined"
      :avatar="userStore.user.image ?? undefined"
      class="view__header"
    />
    <main class="view__content" v-on:scroll="scroll">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { getScrollPosition } from "@/utils/getScrollPosition";
  import headerDefault from "../header/header-default.vue";
  import { useUserStore } from "@/stores/user";

  interface Props {
    header?: any;
  }

  withDefaults(defineProps<Props>(), {
    header: headerDefault,
  });

  const scrollPosition = ref(0);

  const userStore = useUserStore();

  function scroll(e: Event) {
    scrollPosition.value = getScrollPosition.byEvent(e);
  }
</script>

<style lang="scss" scoped>
  @use "../../styles/utils.scss" as *;

  .view {
    position: relative;

    height: 100%;
    width: 100%;

    &__content {
      background-color: #1f1f1f;
      @include scroll-bar-style;
      padding: 30px;
      padding-top: 100px;

      display: flex;
      flex-flow: column nowrap;
      row-gap: 35px;

      height: 100%;
    }
  }
</style>
