<script lang="ts" setup>
  interface Props {
    label: string;
    icon: any;
    to: string;
  }

  const props = defineProps<Props>();
</script>
<template>
  <li class="menu-item">
    <router-link
      active-class="menu-item__anchor--active"
      class="menu-item__anchor"
      :to="props.to"
    >
      <component :is="props.icon" />
      <p>{{ props.label }}</p>
    </router-link>
  </li>
</template>

<style lang="scss" scoped>
  .menu-item {
    width: 100%;

    &__anchor {
      width: 100%;
      height: 100%;

      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      column-gap: 15px;

      padding: 7.5px 0;

      border-radius: 2.5px;

      font-weight: 700;
      font-size: 0.75rem;

      text-decoration: none;

      color: darken($color: #fff, $amount: 15%);
      fill: darken($color: #fff, $amount: 15%);

      &:hover,
      &--active {
        color: #fff;
        fill: #fff;
      }
    }
  }
</style>
