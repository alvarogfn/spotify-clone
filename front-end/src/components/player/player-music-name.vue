<template>
  <section class="music-card">
    <img
      class="music-card__img"
      :src="playerStore.track.image"
      :alt="playerStore.track.name"
    />
    <div class="music-card__details">
      <h1 class="music-card__artist">
        <router-link to="/"> {{ artist }} </router-link>
      </h1>
      <p class="music-card__name">
        <router-link to="/">{{ playerStore.track.name }}</router-link>
      </p>
    </div>
    <button @click="favorite = !favorite" class="music-card__love">
      <favorite-song-icon :favorite="favorite" />
    </button>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed } from "vue";
  import FavoriteSongIcon from "../icons/custom-icons/favorite-song-icon.vue";
  import { usePlayerStore } from "@/stores/player";

  const playerStore = usePlayerStore();

  const artist = computed(() => playerStore.track.artists.join(", "));

  const favorite = ref(true);
</script>

<style lang="scss" scoped>
  .music-card {
    display: flex;
    flex-flow: row nowrap;
    column-gap: 20px;

    &__details {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      row-gap: 6px;
    }

    &__name,
    &__artist {
      transition: 200ms ease-in;
      &:hover {
        color: white;
        text-decoration: underline;
        text-decoration-color: inherit;
      }
    }

    &__name {
      max-width: 200px;
      overflow-x: hidden;
      color: white;
      white-space: nowrap;

      font-weight: 600;

      width: 100%;

      font-size: 0.9rem;
    }

    &__artist {
      order: 2;

      font-weight: 500;
      font-size: 0.65rem;

      color: #b3b3b3;
    }

    &__love {
      align-self: center;
      justify-self: center;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 40px;
      height: 40px;
    }

    &__img {
      width: 70px;
    }
  }
</style>
