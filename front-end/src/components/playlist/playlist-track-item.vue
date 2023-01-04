<template>
  <button class="track">
    <colcheia-icon
      class="track__colcheia"
      :class="{ 'track__colcheia--playing': playing }"
    />
    <p class="track__name" :class="{ 'track__name--playing': playing }">
      {{ props.track.name }}
    </p>
    <div class="track__details">
      <explicit-card :explicit="props.track.explicit" />
      <p class="track__author">
        {{ props.track.artists && props.track.artists.join(", ") }}
      </p>
    </div>
    <p class="track__duration">
      {{ minutify(props.track.duration) }}
    </p>
  </button>
</template>

<script setup lang="ts">
  import { minutify } from "@/filters/minutify";
  import ColcheiaIcon from "../icons/colcheia-icon.vue";
  import ExplicitCard from "../utils/explicit-card.vue";

  interface Props {
    track: {
      id: string;
      name: string;
      explicit: boolean;
      artists: string[];
      duration: number;
      type: "track";
    };
    playing: boolean;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .track {
    display: grid;
    grid-template-columns: 30px 1fr 60px;
    grid-template-rows: 25px 20px;
    column-gap: 10px;
    width: 100%;

    &__colcheia {
      fill: #b2b2b2;
      scale: 0.65;

      &--playing {
        fill: #1ed760;
      }
    }

    &__name {
      white-space: nowrap;
      justify-self: start;
      color: #fff;

      grid-column: 2 / 3;
      grid-row: 1 / 2;

      font-size: 1rem;
      font-weight: 500;

      &--playing {
        color: #1ed760;
      }
    }

    &__icon {
      justify-self: center;
    }

    &__details {
      grid-column: 2 / 3;
      grid-row: 2 / 3;

      display: flex;

      flex-flow: row nowrap;
      align-items: center;
      column-gap: 5px;

      font-size: 0.75rem;

      color: #b2b2b2;
      font-weight: 500;
    }

    &__author {
      display: flex;
      flex-flow: row nowrap;
    }

    &__duration {
      font-size: 0.9rem;
      color: #b2b2b2;
      font-weight: 400;
      justify-self: flex-end;
    }
  }
</style>
