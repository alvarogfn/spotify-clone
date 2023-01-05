<template>
  <li
    class="music-card"
    @mouseleave="hovering = false"
    @mouseover="hovering = true"
  >
    <button class="music-card__content">
      <img class="music-card__poster" :src="props.image" :alt="props.name" />
      <div class="music-card__label">
        <p class="music-card__name">{{ props.name }}</p>
        <p class="music-card__description">
          {{ clamp(props.artists.join(", "), 50) }}
        </p>
      </div>
    </button>
    <appear-from>
      <!-- <button-icon-music-state
        v-show="hovering || playing"
        class="music-card__play"
        :playing="playing"
        color="#000"
        background="#1ed760"
      /> -->
    </appear-from>
  </li>
</template>

<script setup lang="ts">
  import clamp from "@/filters/clamp";
  import { ref } from "vue";
  import AppearFrom from "../utils/animations/appear-from.vue";

  interface Props {
    name: string;
    artists: string[];
    image: string;
  }
  const props = defineProps<Props>();

  const hovering = ref(false);
</script>

<style lang="scss" scoped>
  @keyframes appear_from_bottom {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
  .music-card {
    position: relative;

    height: 100%;
    width: 100%;

    &__play {
      position: absolute;
      top: 150px;
      right: 30px;
    }

    &__content {
      padding: 20px;

      width: 100%;
      height: 100%;

      display: flex;
      flex-flow: column nowrap;

      row-gap: 15px;

      background-color: #181818;

      transition: 200ms;

      border-radius: 5px;

      &:hover {
        background-color: lighten($color: #181818, $amount: 10%);
      }
      cursor: pointer;
    }

    &__poster {
      align-self: center;
      justify-self: center;

      width: fit-content;
      height: fit-content;

      object-fit: cover;

      border-radius: 5px;
    }

    &__label {
      flex-grow: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      row-gap: 5px;
    }

    &__name,
    &__description {
      text-align: left;
      overflow: hidden;
    }

    &__name {
      line-height: 1.4rem;

      white-space: nowrap;
      text-overflow: ellipsis;

      font-weight: 700;
      font-size: 1rem;

      color: #fff;
    }

    &__description {
      font-size: 0.8rem;
      font-weight: 500;

      line-height: 1.4rem;
      color: #b2b2b2;
    }
  }
</style>
