<template>
  <svg v-if="favorite" role="img" class="love-icon" height="16" width="16">
    <path
      d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"
    ></path>
  </svg>
  <svg v-else role="img" height="16" width="16" fill="#fff">
    <path
      d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"
    ></path>
  </svg>
</template>

<script lang="ts" setup>
  interface props {
    favorite: boolean;
  }

  defineProps<props>();
</script>

<style lang="scss" scoped>
  @keyframes love-animation {
    0% {
      fill: #1ed760;
    }

    70% {
      fill: #1ed760;
    }

    100% {
      fill: #fff;
    }
  }

  .love-icon {
    animation: love-animation 300ms linear forwards;
  }
</style>
