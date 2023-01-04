<template>
  <section class="options">
    <button-icon class="options__volume-icon" :icon="volumeIcon" />
    <input-scroll-bar
      class="options__volume-percentage"
      :value="playerStore.device.volume"
    />
  </section>
</template>

<script setup lang="ts">
  import volumeIcon from "../icons/volume-icon.vue";
  import InputScrollBar from "../utils/input-scroll-bar.vue";
  import ButtonIcon from "../buttons/button-icon.vue";
  import { usePlayerStore } from "@/stores/player";

  const playerStore = usePlayerStore();
</script>

<style lang="scss" scoped>
  .options {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    column-gap: 10px;
    width: 100px;
    height: 100%;
  }
</style>
