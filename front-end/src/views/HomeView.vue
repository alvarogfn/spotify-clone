<template>
  <view-with-header>
    <main class="categories">
      <loading-component :loading="loading" class="categories__loading">
        <section class="categories__item" v-for="category in categories">
          <header class="categories__header">
            <h1 class="categories__title">{{ category.title }}</h1>
            <router-link class="categories__open-all" to="/"
              >See All</router-link
            >
          </header>
          <category-card-list
            :tracks="category.tracks"
            :playing-id="playerStore.track.id"
            :is-playing="playerStore.controls.playing"
            @pause="playerStore.pause()"
            @play="play"
          />
        </section>
      </loading-component>
    </main>
  </view-with-header>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from "vue";
  import ViewWithHeader from "../components/utils/view-with-header.vue";
  import { useUserStore } from "@/stores/user";
  import { usePlayerStore } from "@/stores/player";
  import CategoryCardList from "../components/category/category-card-list.vue";
  import type { TrackResponse } from "@/models/TrackResponse";
  import LoadingComponent from "../components/utils/loading-component.vue";

  const userStore = useUserStore();
  const playerStore = usePlayerStore();

  interface Category {
    title: string;
    tracks: { context: string; track: TrackResponse }[];
  }

  const categories = ref<Category[]>([]);

  const loading = ref<boolean>(true);

  async function fetchRecentlyPlayed() {
    const response = await userStore.getRecentlyPlayed();
    if (response.length > 0)
      categories.value = [{ title: "Recently Played", tracks: response }];
    loading.value = false;
  }

  function play(context: string, trackURI: string, trackNumber?: number) {
    if (trackNumber) playerStore.play(context, { position: trackNumber });
    playerStore.play(context, { uri: trackURI });
  }

  playerStore.$onAction(({ name, after }) => {
    if (name === "play") after(() => fetchRecentlyPlayed());
  });

  onMounted(() => {
    loading.value = true;
    fetchRecentlyPlayed();
  });
</script>

<style lang="scss" scoped>
  @use "../styles/utils.scss" as *;

  .categories {
    &__loading {
      margin: 100px;
    }

    &__item {
      display: flex;
      flex-flow: column nowrap;
      row-gap: 25px;
    }

    &__header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }

    &__open-all {
      font-weight: 700;
      font-size: 0.8rem;
      text-transform: uppercase;
      color: #b2b2b2;
      &:hover {
        text-decoration: underline;
      }
    }

    &__title {
      color: white;
      text-transform: lowercase;

      font-weight: 700;
      font-size: 1.8rem;

      &::first-letter {
        text-transform: uppercase;
      }
    }
  }
</style>
