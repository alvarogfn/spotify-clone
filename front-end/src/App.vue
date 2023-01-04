<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, onUnmounted } from "vue";
  import { useAuthStore } from "./stores/auth";
  const authStore = useAuthStore();

  const timeout = ref<number | undefined>();

  authStore.$subscribe((_, state) => {
    if (state.token && state.expiration) {
      localStorage.setItem("token", state.token);
      localStorage.setItem("expiration", state.expiration.toString());
    }
  });

  onMounted(() => {
    authStore.$patch({
      token: localStorage.getItem("token"),
      expiration: parseInt(localStorage.getItem("expiration") ?? "0"),
    });
  });

  onUnmounted(() => {
    clearTimeout(timeout.value);
  });
</script>

<style lang="scss">
  .app {
    background-color: #181818;
  }
</style>
