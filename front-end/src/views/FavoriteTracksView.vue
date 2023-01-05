<template>
  <view-with-header>
    <main class="loved">
      <playlist-header
        class="loved__header"
        name="Loved Tracks"
        description=""
        type="favorites"
        :owner="userStore.user.name ?? ''"
        :playing="isPlaylistPlaying"
        @play="play"
        @pause="pause"
      />
      <playlist-tracks
        class="loved__tracks"
        :playing-id="playingTrack ?? undefined"
        :tracks="userStore.favorites"
        :is-playing="playerStore.controls.playing"
        @play="play"
        @pause="pause"
      />
    </main>
  </view-with-header>
</template>

<script setup lang="ts">
  import { usePlayerStore } from "@/stores/player";
  import { computed } from "vue";

  import PlaylistHeader from "../components/playlist/playlist-header.vue";
  import ViewWithHeader from "../components/utils/view-with-header.vue";
  import PlaylistTracks from "../components/playlist/playlist-tracks.vue";
  import { useUserStore } from "@/stores/user";

  const playerStore = usePlayerStore();
  const userStore = useUserStore();

  const isPlaylistPlaying = computed(() => {
    return (
      playerStore.controls.playing &&
      playerStore.context?.type === "user" &&
      playerStore.context?.id === "alvarogfn"
    );
  });

  const playingTrack = computed(() => {
    if (!isPlaylistPlaying.value) return null;
    return playerStore.track.id;
  });

  function play(uri: string, id: string) {
    if (id === playerStore.track.id) return;
    playerStore.play(`spotify:user:${userStore.user.name}:collection`, {
      uri: uri,
    });
  }
  function pause() {
    playerStore.pause();
  }
</script>

<style lang="scss" scoped>
  .loved {
    background-color: #1f1f1f;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;

    column-gap: 40px;

    &__header {
      flex-basis: 220px;
    }

    &__tracks {
      flex-grow: 1;
    }
  }
</style>
