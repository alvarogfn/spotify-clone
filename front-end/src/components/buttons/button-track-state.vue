<template>
  <button-pause v-if="props.playing" @click="emit('pause')" />
  <button-play v-else @click="emit('play')" />
</template>

<script setup lang="ts">
  import ButtonPlay from "./button-play.vue";
  import ButtonPause from "./button-pause.vue";

  interface Props {
    playing: boolean;
  }
  const props = defineProps<Props>();

  interface Emit {
    (e: "play"): void;
    (e: "pause"): void;
  }

  const emit = defineEmits<Emit>();
</script>

<style lang="scss" scoped></style>
