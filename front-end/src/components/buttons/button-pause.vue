<template>
  <button class="button">pause</button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  @use "../../styles/utils.scss" as *;
  .button {
    background-color: #1ed760;
    text-transform: uppercase;
    font-weight: 600;

    padding: 12px 50px;

    border-radius: 40px;

    &:hover {
      scale: 1.05;
    }

    &:active {
      scale: 1;
    }
  }
</style>
