<template>
  <button class="profile">
    <img
      class="profile__avatar"
      :src="props.avatar || image"
      :alt="props.username"
    />
    <p class="profile__username">{{ props.username }}</p>
    <div class="profile__status">▲</div>
  </button>
</template>

<script setup lang="ts">
  import image from "@/assets/default-picture.jpg";

  interface Props {
    avatar?: string;
    username: string;
  }

  const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
  .profile {
    height: 35px;
    width: max-content;

    padding: 2.5px;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    column-gap: 10px;

    background-color: rgba(0, 0, 0, 0.589);

    border-radius: 25px;

    &:hover {
      background-color: #2d2d2d;
    }

    &__avatar {
      border-radius: 50%;
    }

    &__username {
      color: white;
      font-weight: 700;
    }

    &__status {
      color: #fff;
      font-weight: 900;

      height: 15px;
      width: 15px;
      margin-right: 7.5px;
      border-radius: 50%;
    }
  }
</style>
