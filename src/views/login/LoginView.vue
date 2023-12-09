<template>
  <RootContent :width="500">
    <RouterView name="login"></RouterView>
  </RootContent>
  <WavesSvg class="waves"></WavesSvg>
</template>

<script setup lang="ts">
import RootContent from '@/components/contents/RootContent.vue'
import WavesSvg from '@/components/svg/WavesSvg.vue'
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
