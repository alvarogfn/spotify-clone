<template>
  <header class="header" :style="styles">
    <section class="header__page-button">
      <button
        class="header__button"
        v-on:click="() => router.back()"
        :disabled="!canGoback"
      >
        <backwards-icon />
      </button>
      <button
        class="header__button"
        v-on:click="() => router.forward()"
        :disabled="!canGoForward"
      >
        <forwards-icon />
      </button>
    </section>
    <slot></slot>
    <profile-card :username="props.username" :avatar="props.avatar" />
  </header>
</template>

<script setup lang="ts">
  import { computed, watch, ref } from "vue";
  import { useRouter } from "vue-router";
  import BackwardsIcon from "../icons/backwards-icon.vue";
  import ForwardsIcon from "../icons/forwards-icon.vue";
  import ProfileCard from "../profile-card.vue";

  interface Props {
    scrollPosition: number;
    username?: string;
    avatar?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    scrollPosition: 0,
    username: "Spotify user",
    avatar: undefined,
  });

  const router = useRouter();

  const canGoback = ref(false);
  const canGoForward = ref(false);

  const styles = computed(() => ({
    backgroundColor: `rgba(0,0, 0, ${(props.scrollPosition * 7) / 100})`,
  }));

  watch(router.currentRoute, () => {
    canGoback.value = window.history.state.back !== null;
    canGoForward.value = window.history.state.forward !== null;
  });
</script>

<style lang="scss" scoped>
  .header {
    position: absolute;
    z-index: 3;

    top: 0;

    height: 65px;
    width: 100%;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;

    &__page-button {
      display: flex;
      column-gap: 10px;
    }

    &__button {
      display: flex;

      align-items: center;
      justify-content: center;

      fill: white;

      width: 40px;
      height: 40px;
      background-color: #000000a4;
      border-radius: 100%;

      &:disabled {
        opacity: 0.5;
        cursor: initial;
      }
    }
  }
</style>
