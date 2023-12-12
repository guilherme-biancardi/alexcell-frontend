<template>
  <article class="login-content">
    <ButtonTextComponent :="backToSignButton" class="back-to-sign">{{
      backToSignButton.text
    }}</ButtonTextComponent>
    <div :style="{ gap: `${gap}px` }">
      <slot></slot>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useUtil } from '@/ts/utils'
import { mdiArrowLeft } from '@mdi/js'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ButtonTextComponent from '../utils/ButtonTextComponent.vue'

const { useButton } = useUtil()
const router = useRouter()

interface LoginContent {
  gap: number
}

withDefaults(defineProps<LoginContent>(), {
  gap: 8
})

const backToSignButton = computed(() => {
  const button = useButton('button', 'Voltar')
  button.setIcon({ path: mdiArrowLeft })
  button.setClick(() => router.push({ name: 'signIn' }))
  button.invertIcon()

  return button.get()
})
</script>

<style scoped>
.login-content,
.login-content div {
  width: 100%;
  display: grid;
  place-items: center;
  gap: 6px;
}

.back-to-sign {
  justify-self: flex-start;
}
</style>
