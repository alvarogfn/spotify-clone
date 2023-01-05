<template>
  <header class="playlist">
    <image-playable
      class="playlist__poster"
      :image="props.image"
      :alt="`Poster of ${name}`"
      :playing="props.playing"
      @play="$emit('play')"
      @pause="$emit('pause')"
    >
      <liked-songs-icon
        class="playlist__poster-liked"
        :size="5"
        v-if="props.type === 'favorites'"
      />
    </image-playable>
    <p class="playlist__name">{{ props.name }}</p>
    <p class="playlist__owner">{{ props.owner }}</p>
    <button-track-state
      @play="$emit('play')"
      @pause="$emit('pause')"
      :playing="props.playing"
    />
    <div class="playlist__info">
      <favorite-song-icon v-if="props.type !== 'favorites'" :favorite="true" />
      <three-dots-icon />
    </div>
    <div class="playlist__description">
      <slot name="description" :description="props.description">
        <p>{{ props.description }}</p>
      </slot>
    </div>
  </header>
</template>

<script setup lang="ts">
  import ImagePlayable from "../utils/image-playable.vue";
  import ButtonTrackState from "../buttons/button-track-state.vue";
  import LikedSongsIcon from "../icons/custom-icons/liked-songs-icon.vue";
  import ThreeDotsIcon from "../icons/three-dots-icon.vue";
  import FavoriteSongIcon from "../icons/custom-icons/favorite-song-icon.vue";

  interface Props {
    image?: string;
    name: string;
    owner: string;
    playing: boolean;
    description: string;
    type?: "favorites" | "playlist" | "album";
  }

  const props = withDefaults(defineProps<Props>(), {
    type: "playlist",
    image: "",
  });
</script>

<style lang="scss" scoped>
  .playlist {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    row-gap: 25px;
    max-width: 280px;

    color: #fff;

    &__name {
      font-size: 1.2rem;
      font-weight: 700;
    }

    &__owner {
      font-size: 0.8rem;
      font-weight: 600;
      color: #b2b2b2;
    }

    &__description {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      column-gap: 5px;

      margin-top: 5px;
      margin-inline: 10px;

      color: #b2b2b2;
      font-size: 0.7rem;

      font-weight: 600;
    }

    &__poster {
      width: 220px;
      height: 220px;
    }

    &__poster-liked {
      width: 100%;
      height: 100%;
    }

    &__info {
      fill: #fff;
      display: flex;
      flex-flow: row nowrap;
      column-gap: 10px;
    }
  }
</style>
