<template>
  <RootContent :width="CONTENT_WIDTH">
    <RouterView v-slot="{ Component }" name="login">
      <Transition name="slide-x" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </RootContent>
  <WavesSvg class="waves" v-if="isLargeScreen"></WavesSvg>
</template>

<script setup lang="ts">
import RootContent from '@/components/contents/RootContent.vue';
import WavesSvg from '@/components/svg/WavesSvg.vue';
import { useMediaQuery } from '@vueuse/core';

const CONTENT_WIDTH = 475 as const;
const isLargeScreen = useMediaQuery(`(min-width: ${CONTENT_WIDTH}px)`);
</script>

<style scoped>
.waves {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 0;
}
</style>
