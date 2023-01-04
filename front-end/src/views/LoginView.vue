<template>
  <div class="login">
    <section class="login__card">
      <h1 class="login__title">
        This Project is an attempt to clone the spotify experience.
      </h1>
      <app-logo class="login__spotify-logo" />
      <login-authorize>
        <p v-if="authStore.error">{{ authStore.error }}</p>
      </login-authorize>
      <p class="login__alert">No data is stored by our servers.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
  import AppLogo from "../components/app-logo.vue";
  import LoginAuthorize from "../components/login/login-authorize.vue";
  import { useAuthStore } from "@/stores/auth";

  const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
  @use "../styles/utils.scss" as *;
  .login {
    @include fullscreen;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    min-height: 500px;
    min-width: 300px;

    color: #fff;
    background-color: #1f1f1f;

    &__card {
      position: relative;

      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      row-gap: 20px;

      max-height: 450px;
      height: calc(100% - 20px);

      max-width: 500px;
      width: calc(100% - 20px);

      background-color: #181818;

      border-radius: 5px;

      padding: 40px;
    }

    &__title {
      font-size: 1.5rem;
      text-align: center;
    }

    &__spotify-logo {
      margin: 20px 0;
    }

    &__alert {
      position: absolute;
      font-weight: 300;
      font-size: 0.75rem;
      opacity: 0.7;
      bottom: 10px;
    }
  }
</style>
