<template>
  <section class="player" v-if="playerStore.track">
    <player-music-name />
    <player-controls
      :progress="playerStore.position.progress"
      :playing="playerStore.controls.playing"
      :duration="playerStore.position.duration"
      @seek-to-position="seekToPosition"
    />
    <player-options />
  </section>
</template>

<script setup lang="ts">
  import PlayerMusicName from "./player-music-name.vue";
  import PlayerOptions from "./player-options.vue";
  import PlayerControls from "./player-controls.vue";
  import { usePlayerStore } from "@/stores/player";
  import { onMounted, ref, onUnmounted } from "vue";

  const playerStore = usePlayerStore();

  const interval = ref<number | undefined>();

  playerStore.$subscribe((_, state) => {
    const progress = state.position.progress;
    const duration = state.position.duration;
    const playing = state.controls.playing;

    if (playing && progress >= duration) {
      playerStore.init();
    }
  });

  playerStore.$subscribe((_, state) => {
    if (!state.controls.playing) pauseTrack();
    else startTrack();
  });

  playerStore.$onAction(({ name, after }) => {
    if (name === "play") {
      after(() => {
        playerStore.init();
      });
    }
  });

  function startTrack() {
    clearInterval(interval.value);
    interval.value = setInterval(() => {
      playerStore.position.progress += 1000;
    }, 1000);
  }

  function pauseTrack() {
    clearInterval(interval.value);
  }

  function seekToPosition(progress: number) {
    playerStore.position.progress = progress;
    playerStore.seekToPosition(progress);
  }

  onMounted(() => {
    playerStore.init();
    if (playerStore.controls.playing) startTrack();
    else pauseTrack();
  });

  onUnmounted(() => {
    clearInterval(interval.value);
  });
</script>

<style lang="scss" scoped>
  .player {
    background-color: #181818;
    border-top: 1px solid #282828;

    height: 100%;
    width: 100vw;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }
</style>
