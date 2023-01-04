<template>
  <div class="plus-playlist">
    <plus-icon class="plus-playlist__icon" />
  </div>
</template>

<script setup lang="ts">
  import PlusIcon from "../plus-icon.vue";
</script>

<style lang="scss" scoped>
  @use "../../../styles/utils.scss" as *;

  .plus-playlist {
    @include centralize-with-flex;
    padding: 5px;
    background-color: #b3b3b3;
    border-radius: 2px;

    &__icon {
      fill: #000;
      scale: 0.8;
    }
  }
</style>
