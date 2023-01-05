<template>
  <section class="musics">
    <transition-group tag="ul" class="musics__list" name="cards">
      <category-card-item
        class="musics__item"
        v-for="item in props.tracks"
        :key="item.track.id"
        :track="item.track"
        :context="item.context"
        :playing="props.isPlaying && props.playingId === item.track.id"
        @play="play"
        @pause="emit('pause')"
      />
    </transition-group>
  </section>
</template>

<script setup lang="ts">
  import type { TrackResponse } from "@/models/TrackResponse";
  import CategoryCardItem from "./category-card-item.vue";

  interface Props {
    tracks?: {
      track: TrackResponse;
      context: string;
    }[];
    playingId: string;
    isPlaying: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    tracks: () => [],
  });

  interface Emit {
    (e: "play", context: string, trackUri: string, trackNumber?: number): void;
    (e: "pause"): void;
  }

  const emit = defineEmits<Emit>();

  function play(context: string, trackUri: string, trackNumber: number) {
    if (context.split(":")[1] === "album")
      emit("play", context, trackUri, trackNumber);
    else emit("play", context, trackUri);
  }
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

  .cards {
    &-enter-active,
    &-leave-active {
      transition: all 0.5s ease;
    }
    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
  }
</style>
