<template>
  <button-icon-pause
    v-if="props.playing"
    @click="emit('pause')"
    :color="props.color"
    :background="props.background"
  />
  <button-icon-play
    v-else
    @click="emit('play')"
    :color="props.color"
    :background="props.background"
  ></button-icon-play>
</template>

<script setup lang="ts">
  import ButtonIconPlay from "./button-icon-play.vue";
  import ButtonIconPause from "./button-icon-pause.vue";

  interface Props {
    playing: boolean;
    color?: string;
    background?: string;
  }
  const props = defineProps<Props>();

  interface Emit {
    (e: "play"): void;
    (e: "pause"): void;
  }

  const emit = defineEmits<Emit>();
</script>

<style scoped></style>
