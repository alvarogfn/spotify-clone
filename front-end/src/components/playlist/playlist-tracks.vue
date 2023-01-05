<template>
  <section class="tracks">
    <ul class="tracks__list">
      <li class="tracks__item" v-for="track in props.tracks" :key="track.id">
        <button
          class="tracks__button"
          @click="
            track.id !== playingId || !isPlaying
              ? emit('play', track.uri, track.id)
              : emit('pause')
          "
        >
          <playlist-track-item
            :track="track"
            :playing="track.id === playingId"
          />
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import PlaylistTrackItem from "./playlist-track-item.vue";
  import type { TrackResponse as TrackResponseProp } from "@/models/TrackResponse";
  interface Props {
    tracks: TrackResponseProp[];
    uri?: string;
    playingId?: string;
    isPlaying?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    isPlaying: false,
  });

  interface Emit {
    (e: "play", uri: string, id: string): void;
    (e: "pause"): void;
  }
  const emit = defineEmits<Emit>();
</script>

<style lang="scss" scoped>
  .tracks {
    &__list {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 20px;
    }

    &__item {
      padding: 2.5px;
    }

    &__button {
      width: 100%;
    }
  }
</style>
