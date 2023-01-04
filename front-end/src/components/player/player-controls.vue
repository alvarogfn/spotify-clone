<template>
  <section class="music">
    <player-controls-buttons />
    <player-controls-progress
      :duration="props.duration"
      :progress="props.progress"
      :playing="props.playing"
      @new-position="emit('seekToPosition', $event)"
    />
  </section>
</template>

<script setup lang="ts">
  import PlayerControlsButtons from "./player-controls-buttons.vue";
  import PlayerControlsProgress from "./player-controls-progress.vue";

  interface Props {
    duration: number;
    progress: number;
    playing: boolean;
  }

  const props = defineProps<Props>();

  interface Emit {
    (e: "seekToPosition", progress: number): void;
  }

  const emit = defineEmits<Emit>();
</script>

<style lang="scss" scoped>
  .music {
    width: 500px;
    display: flex;
    flex-flow: column nowrap;
    row-gap: 10px;
  }
</style>
