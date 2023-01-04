<template>
  <header class="menu">
    <app-logo class="menu__logo"></app-logo>
    <menu-lateral-nav :menu="firstMenu" />
    <menu-lateral-nav :menu="secondMenu" />
    <divider-bar class="menu__divider" />
    <menu-lateral-playlists
      class="menu__playlists"
      :playlists="props.playlists"
    />
  </header>
</template>

<script lang="ts" setup>
  import { shallowReactive } from "vue";

  import MenuLateralNav from "./menu-lateral-nav.vue";
  import DividerBar from "../utils/divider-bar.vue";
  import AppLogo from "../app-logo.vue";

  import HomeIcon from "../icons/home-icon.vue";
  import LibraryIcon from "../icons/library-icon.vue";
  import SearchIcon from "../icons/search-icon.vue";

  import PlusPlaylistIcon from "../icons/custom-icons/plus-playlist-icon.vue";
  import LikedSongsIcon from "../icons/custom-icons/liked-songs-icon.vue";
  import YourEpisodesIcon from "../icons/custom-icons/your-episodes-icon.vue";

  import MenuLateralPlaylists from "./menu-lateral-playlists.vue";

  interface Props {
    playlists: {
      name: string;
      id: string;
    }[];
  }

  const props = defineProps<Props>();

  interface MenuOptions {
    to: string;
    icon: any;
    label: string;
  }

  const firstMenu = shallowReactive<MenuOptions[]>([
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/search", label: "Search", icon: SearchIcon },
    { to: "/collection/playlists", label: "Your Library", icon: LibraryIcon },
  ]);

  const secondMenu = shallowReactive<MenuOptions[]>([
    { to: "/playlist", label: "Create Playlist", icon: PlusPlaylistIcon },
    { to: "/collection/tracks", label: "Liked Songs", icon: LikedSongsIcon },
    {
      to: "/collection/episodes",
      label: "Your Episodes",
      icon: YourEpisodesIcon,
    },
  ]);
</script>

<style lang="scss" scoped>
  .menu {
    display: flex;
    flex-flow: column nowrap;
    row-gap: 20px;

    padding: 5px;
    padding-left: 25px;

    height: 100%;
    width: 100%;

    background-color: #000;
    color: white;

    &__logo {
      margin-bottom: -5px;
      padding: 15px 0;
      width: 130px;
      height: 70px;
    }

    &__divider {
      width: 85%;
    }

    &__playlists {
      margin-top: -5px;
    }
  }
</style>
