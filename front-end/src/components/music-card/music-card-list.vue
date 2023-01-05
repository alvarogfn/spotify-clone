<template>
  <section class="musics">
    <transition-group tag="ul" class="musics__list">
      <music-card-item
        class="musics__item"
        v-for="track in props.tracks"
        :key="track.id"
        v-bind="track"
      />
    </transition-group>
  </section>
</template>

<script setup lang="ts">
  import type { TrackResponse as Track } from "@/models/TrackResponse";
  import MusicCardItem from "./music-card-item.vue";
  interface Props {
    tracks?: Track[];
  }

  const props = withDefaults(defineProps<Props>(), {
    tracks: (): Track[] => [],
  });
</script>

<style lang="scss" scoped>
  .musics {
    &__list {
      width: 100%;

      display: flex;
      flex-flow: row wrap;
      column-gap: 15px;
      row-gap: 20px;

      max-height: 310px;

      overflow: hidden;
    }

    &__item {
      flex-grow: 0;

      width: 220px;
      max-width: 220px;
      min-width: 220px;

      height: 310px;
      min-height: 310px;
      max-height: 310px;
    }
  }
</style>
