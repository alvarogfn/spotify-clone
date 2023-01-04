<template>
  <section class="playlists">
    <ul class="playlists__list">
      <li
        class="playlists__item"
        v-for="playlist in props.playlists"
        :key="playlist.id"
      >
        <router-link
          class="playlists__anchor"
          active-class="playlists__anchor--active"
          :to="{ name: 'playlist', params: { id: playlist.id } }"
        >
          {{ playlist.name }}
        </router-link>
      </li>
    </ul>
    <div class="playlists__scroll"></div>
  </section>
</template>

<script setup lang="ts">
  interface Props {
    playlists: {
      name: string;
      id: string;
    }[];
  }

  const props = withDefaults(defineProps<Props>(), {
    playlists: () => [],
  });
</script>

<style lang="scss" scoped>
  @use "../../styles/utils.scss" as *;
  .playlists {
    flex-grow: 1;
    height: 1px;

    overflow: hidden;

    position: relative;

    &__list {
      width: 100%;
      height: 100%;

      @include scroll-bar-style;
    }

    &__anchor {
      display: block;
      height: 100%;
      width: 100%;

      font-weight: 500;
      font-size: 0.8rem;
      color: #b2b2b2;

      padding: 10px 0;

      &:hover,
      &--active {
        color: #fff;
      }
    }
  }
</style>
