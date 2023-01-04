<template>
  <a class="redirect" :href="authStore.endpointForAuth">
    {{ props.label }}
  </a>
</template>

<script setup lang="ts">
  import { useAuthStore } from "@/stores/auth";

  interface Props {
    label?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    label: "Authorize",
  });

  const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
  .redirect {
    padding: 15px 40px;
    border-radius: 2.5px;
    font-weight: 600;

    background-color: #1ed760;
    color: #000;

    transition: 200ms ease-in-out;

    &:hover {
      scale: 1.1;
    }
    &:active {
      scale: 0.95;
    }
  }
</style>
