<template>
  <div class="authorize">
    <p class="authorize__paragraph">
      To use, you need to allow the app on your Spotify account:
    </p>
    <div class="authorize__redirect">
      <login-auth-button />
    </div>
    <div class="authorize__error">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LoginAuthButton from "./login-auth-button.vue";
</script>

<style lang="scss" scoped>
  .authorize {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;

    &__redirect {
      flex-grow: 1;
      display: flex;
      align-items: center;
    }

    &__error {
      font-size: 0.85rem;
      color: red;
    }
  }
</style>
