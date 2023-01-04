<template>
  <nav class="container">
    <ul class="list">
      <menu-lateral-item
        v-for="item in props.menu"
        v-bind="item"
        :key="item.label"
      />
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import MenuLateralItem from "./menu-lateral-item.vue";

  interface Props {
    menu: {
      to: string;
      label: string;
      icon: any;
    }[];
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
  }

  .list {
    display: flex;
    row-gap: 2.5px;
    width: 100%;
  }
</style>
