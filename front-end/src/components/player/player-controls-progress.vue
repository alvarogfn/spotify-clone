<template>
  <section class="progress">
    <p class="progress__time progress__time--elapsed">
      {{ minutify(elapsed) }}
    </p>
    <input-scroll-bar
      class="progress__bar"
      v-model:value="position"
      @new-position="emitPosition"
    />
    <p class="progress__time progress__time--remain">-{{ minutify(remain) }}</p>
  </section>
</template>

<script setup lang="ts">
  import { minutify } from "@/filters/minutify";
  import { ref, computed, watch } from "vue";
  import InputScrollBar from "../utils/input-scroll-bar.vue";
  interface Props {
    duration?: number;
    progress?: number;
    playing?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    duration: 0,
    progress: 0,
    playing: true,
  });
  const emit = defineEmits<{ (e: "new-position", value: number): void }>();

  const position = ref(props.progress);

  const remain = computed(() => {
    return props.duration - elapsed.value;
  });

  const elapsed = computed(() => {
    return (props.duration * position.value) / 100;
  });

  watch(props, ({ progress }) => {
    position.value = (progress * 100) / props.duration;
  });

  function emitPosition(newPosition: number) {
    emit("new-position", (newPosition * props.duration) / 100);
  }
</script>

<style lang="scss" scoped>
  .progress {
    flex: 1;
    display: flex;
    align-items: center;
    column-gap: 7.5px;

    position: relative;

    &__bar {
      margin-inline: 39px;
    }

    &__time {
      position: absolute;
      font-size: 0.65rem;
      color: #b2b2b2;

      &--elapsed {
        left: 0;
      }

      &--remain {
        right: 0;
      }
    }
  }
</style>
