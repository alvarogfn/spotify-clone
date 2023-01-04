<template>
  <section class="buttons">
    <button-shuffle @click="shuffle" :shuffle="playerStore.controls.shuffle" />
    <button-icon @click="previous" :icon="prevIcon" />
    <button-icon-pause v-if="playerStore.controls.playing" @click="pause" />
    <button-icon-play v-else @click="play" />
    <button-icon @click="next" :icon="nextIcon" />
    <button-icon-togglable @click="repeat" :active="true" :icon="repeatIcon" />
  </section>
</template>

<script setup lang="ts">
  import prevIcon from "../icons/prev-icon.vue";
  import nextIcon from "../icons/next-icon.vue";
  import repeatIcon from "../icons/repeat-icon.vue";
  import ButtonIcon from "../buttons/button-icon.vue";
  import ButtonIconPlay from "../buttons/button-icon-play.vue";
  import ButtonIconPause from "../buttons/button-icon-pause.vue";
  import ButtonIconTogglable from "../buttons/button-icon-togglable.vue";
  import ButtonShuffle from "../buttons/button-shuffle.vue";
  import { usePlayerStore } from "@/stores/player";

  const playerStore = usePlayerStore();

  function shuffle() {
    playerStore.shuffle();
  }

  function previous() {
    playerStore.skipPrev();
  }

  function play() {
    if (!playerStore.controls.playing) playerStore.play();
  }
  function pause() {
    if (playerStore.controls.playing) playerStore.pause();
  }

  function next() {
    playerStore.skipNext();
  }

  function repeat() {
    console.log("repeat");
  }
</script>

<style scoped>
  .buttons {
    margin: 0 auto;
    width: 200px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
</style>
