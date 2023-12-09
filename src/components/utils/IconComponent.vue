<template>
  <SvgIcon type="mdi" :path="path" :size="size" v-if="path"></SvgIcon>
</template>

<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'

export interface Icon {
  path: string
  size?: number
}

defineProps<Icon>()
</script>

<style scoped></style>
