<template>
  <view-with-header>
    <main
      class="view-playlist"
      :class="{ 'view-playlist--centralize': loading || error }"
    >
      <loading-component :loading="loading" class="view-playlist__loading">
        <error-component :error="error">
          <playlist-header
            class="view-playlist__header"
            :name="playlist!.name"
            :description="playlist!.description"
            :image="playlist!.image"
            :owner="playlist!.owner"
            :playing="isPlaylistPlaying && playerStore.controls.playing"
            :type="playlist!.type"
            :total-tracks="playlist!.total_tracks"
            @play="play"
            @pause="pause"
          />
          <playlist-tracks
            class="view-playlist__tracks"
            :tracks="playlist!.tracks"
            :playing-id="trackPlayingId"
            :is-playing="playerStore.controls.playing"
            @play="play"
            @pause="pause"
          />
        </error-component>
      </loading-component>
    </main>
  </view-with-header>
</template>

<script setup lang="ts">
  import { useAuthStore } from "@/stores/auth";
  import { usePlayerStore } from "@/stores/player";
  import { onMounted, ref, computed } from "vue";
  import { useRoute } from "vue-router";
  import PlaylistHeader from "../components/playlist/playlist-header.vue";
  import ViewWithHeader from "../components/utils/view-with-header.vue";
  import PlaylistTracks from "../components/playlist/playlist-tracks.vue";
  import type { PlaylistDataResponse } from "@/models/PlaylistDataResponse";
  import LoadingComponent from "../components/utils/loading-component.vue";
  import ErrorComponent from "../components/utils/error-component.vue";

  const route = useRoute();
  const authStore = useAuthStore();
  const playerStore = usePlayerStore();

  const id = ref<string | undefined>(route.params.id as string);

  const loading = ref<boolean>(true);

  const error = ref<boolean>(false);

  onMounted(async () => {
    if (id.value) {
      try {
        playlist.value = await authStore.request(`/playlist/${id.value}`);
      } catch (e) {
        error.value = true;
      } finally {
        loading.value = false;
      }
    } else {
      error.value = true;
    }
  });

  const playlist = ref<PlaylistDataResponse | null>(null);

  const isPlaylistPlaying = computed(() => {
    return id.value === playerStore.context?.id;
  });

  const trackPlayingId = computed(() => {
    if (id.value === playerStore.context?.id) return playerStore.track.id;
  });

  function play(uri?: string, id?: string) {
    if (id === playerStore.track.id) return playerStore.play();
    if (!playlist.value?.uri) return playerStore.play();

    if (!uri) playerStore.play(playlist.value?.uri, { position: 0 });
    else playerStore.play(playlist.value?.uri, { uri });
  }
  function pause() {
    playerStore.pause();
  }
</script>

<style lang="scss" scoped>
  .view-playlist {
    background-color: #1f1f1f;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;

    column-gap: 40px;

    &--centralize {
      align-items: center;
      justify-content: center;
      min-height: 450px;
    }

    &__header {
      flex-basis: 220px;
    }

    &__tracks {
      flex-grow: 1;
    }
  }
</style>
