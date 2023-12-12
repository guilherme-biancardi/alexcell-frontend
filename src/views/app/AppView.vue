<template>
  <div>{{ user }}</div>
</template>

<script setup lang="ts">
import { getMeRequest } from '@/requests/user/request'
import { onMounted, ref } from 'vue'

const user = ref()

onMounted(() => {
  getMeRequest(null)
    .execute()
    .then((res) => {
      if (res.data) {
        user.value = res.data.data
      }
    })
})
</script>

<style scoped></style>
