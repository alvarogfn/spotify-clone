<template>
  <router-link class="logo" to="/">
    <img
      class="logo__img"
      src="../assets/spotify-logo.png"
      alt="Spotify Logo"
    />
  </router-link>
</template>

<script lang="ts">
  export default {};
</script>
<style lang="scss" scoped>
  .logo {
    width: fit-content;
    height: fit-content;

    max-width: 170px;

    display: block;
    &__img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
</style>
