<template>
  <div class="your-episodes">
    <bookmark-icon class="your-episodes__icon" />
  </div>
</template>

<script setup lang="ts">
  import BookmarkIcon from "../bookmark-icon.vue";
</script>

<style lang="scss" scoped>
  @use "../../../styles/utils.scss" as *;

  .your-episodes {
    @include centralize-with-flex;
    padding: 5px;
    background-color: #006450;
    border-radius: 2px;

    &__icon {
      fill: #1ed760;
      scale: 0.8;
    }
  }
</style>
