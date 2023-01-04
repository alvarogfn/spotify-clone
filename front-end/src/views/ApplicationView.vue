<template>
  <div class="container" :class="{ 'container--loading': loading }">
    <loading-component :loading="loading">
      <menu-lateral
        class="container__menu-lateral"
        :playlists="userStore.playlists"
      />
      <main class="container__page">
        <router-view :key="$route.fullPath"></router-view>
      </main>
      <player-music class="container__music-player" />
    </loading-component>
  </div>
</template>

<script setup lang="ts">
  import { AuthExpiredError } from "@/errors/Errors";
  import router from "@/router";
  import { useUserStore } from "@/stores/user";
  import { useAuthStore } from "@/stores/auth";
  import { onMounted, ref } from "vue";
  import MenuLateral from "../components/menu-lateral/menu-lateral.vue";
  import PlayerMusic from "../components/player/player-music.vue";
  import LoadingComponent from "../components/utils/loading-component.vue";

  const userStore = useUserStore();
  const authStore = useAuthStore();

  const loading = ref<boolean>(true);

  onMounted(async () => {
    try {
      await userStore.fetchUserData();
    } catch (e) {
      if (e instanceof AuthExpiredError) {
        localStorage.clear();
        authStore.$reset();
        router.push("/login?error=expired_session");
      }
    } finally {
      loading.value = false;
    }
  });
</script>

<style lang="scss" scoped>
  @use "../styles/utils.scss" as *;

  .container {
    @include fullscreen;

    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: repeat(20, 1fr);

    &--loading {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__menu-lateral {
      z-index: 2;

      grid-column: 1 / 2;
      grid-row: 1 / 18;
    }

    &__page {
      z-index: 1;

      grid-column: 2 / 3;
      grid-row: 1 / 18;
    }

    &__music-player {
      z-index: 3;
      grid-column: 1 / main-end;
      grid-row: 18 / main-end;
    }
  }
</style>
