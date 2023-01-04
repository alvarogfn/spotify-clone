<template>
  <form class="form">
    <label class="form__label">
      <input
        class="form__input"
        @input="emit('update:value', getValue($event))"
        @mouseup="emit('newPosition', getValue($event))"
        min="0"
        max="100"
        step="1"
        type="range"
      />
      <div :style="progressBar" class="form__input-progress"></div>
      <div class="form__input-track"></div>
      <div class="form__input-thumb" :style="thumb"></div>
    </label>
  </form>
</template>

<script setup lang="ts">
  import { computed } from "vue";

  interface Props {
    value: number;
    min?: number;
    max?: number;
  }

  interface Emit {
    (e: "newPosition", value: number): void;
    (e: "update:value", value: number): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    min: 0,
    max: 100,
  });

  const emit = defineEmits<Emit>();

  const progressBar = computed(() => ({
    width: `${props.value}%`,
  }));

  const thumb = computed(() => ({
    left: `${props.value}%`,
    transform: `translate(-${props.value}%, -50%)`,
  }));

  function getValue(event: Event): number {
    const target = event.target as HTMLInputElement;
    return parseInt(target.value);
  }
</script>

<style lang="scss" scoped>
  .form {
    display: flex;
    width: 100%;

    &__label {
      flex: 1;
      display: flex;
      width: 100%;

      position: relative;
      height: 5px;

      &:hover .form__input-progress {
        background-color: #1ed760;
      }

      &:hover .form__input-thumb {
        display: block;
      }
    }

    &__input {
      z-index: 4;
      width: 100%;
      flex: 1;

      height: 5px;

      appearance: none;
      background-color: transparent;

      &::-webkit-slider-thumb {
        appearance: none;

        height: 13px;
        width: 13px;
      }

      &::-moz-range-thumb {
        appearance: none;

        height: 13px;
        width: 13px;

        background-color: transparent;
        border: none;
      }

      &::-moz-range-track {
        appearance: none;
        display: none;
      }

      &::-webkit-slider-runnable-track {
        appearance: none;
      }
    }

    &__input-track,
    &__input-progress,
    &__input-thumb {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

    &__input-track,
    &__input-progress {
      left: 0;
      height: 4px;
      border-radius: 5px;
    }

    &__input-progress {
      z-index: 2;
      background-color: #fff;
    }

    &__input-track {
      z-index: 1;
      width: 100%;
      background-color: #b2b2b2;
    }

    &__input-thumb {
      display: none;

      transform: translate(-50px, -50%);

      z-index: 3;

      background-color: #fff;
      border-radius: 50%;

      height: 13px;
      width: 13px;

      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.158);
    }
  }
</style>
