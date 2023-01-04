<template>
  <div class="image">
    <slot>
      <img class="image__img" :src="props.image" :alt="props.alt" />
    </slot>
    <div
      class="image__button-container"
      :style="playing ? showButton : undefined"
    >
      <button-icon-track-state
        class="image__button"
        @play="$emit('play')"
        @pause="$emit('pause')"
        :playing="playing"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import ButtonIconTrackState from "../buttons/button-icon-track-state.vue";

  interface Props {
    image?: string;
    alt?: string;
    playing?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    alt: "Album Poster",
    playing: false,
  });

  const showButton = computed(() => ({
    display: props.playing ? "flex" : "none",
  }));
</script>

<style lang="scss" scoped>
  .image {
    position: relative;

    display: flex;

    &:hover {
      .image__button-container {
        display: flex;
      }
    }

    &__button-container {
      display: none;
      justify-content: center;
      align-items: center;
      position: absolute;

      top: 0;
      left: 0;

      height: 100%;
      width: 100%;

      background-color: rgba(0, 0, 0, 0.445);
    }

    &__button {
      height: 50px;
      width: 50px;
    }

    &__img {
      flex: 1;
      object-fit: contain;
    }
  }
</style>
