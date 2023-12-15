<template>
  <div>{{ appStore.getUser }}</div>
</template>

<script setup lang="ts">
import type { ApiError } from '@/requests';
import { getMeRequest } from '@/requests/user/request';
import { useAppStore } from '@/stores/appStore';
import { useRouter } from 'vue-router';

const appStore = useAppStore();
const requestUser = getMeRequest(null);
const router = useRouter();

try {
  const { data } = await requestUser.execute();
  appStore.setUser(data.data);

} catch (err) {
  const error = err as ApiError;

  if (error.response) {
    appStore.notify({ message: error.response.data.message, type: 'error' });
  }

  appStore.setToken(null);
  appStore.setUser(null);
  router.replace({ name: 'signIn' });
}
</script>

<style scoped></style>
