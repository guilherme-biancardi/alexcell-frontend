<template>
  <section class="app-view-content">
    <MenuNav></MenuNav>
    <article>
      <UserText></UserText>
      <RouterView v-slot="{ Component }" name="app">
        <Transition name="slide-y" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </article>
  </section>
</template>

<script setup lang="ts">
import MenuNav from '@/components/MenuNav.vue';
import UserText from '@/components/UserText.vue';
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

  router.push({ name: 'admin' });
} catch (err) {
  const error = err as ApiError;

  if (error.response) {
    appStore.notify({ message: error.response.data.message, type: 'error' });
  }

  appStore.$reset();
  router.replace({ name: 'signIn' });
}
</script>

<style scoped>
.app-view-content {
  --menu-width: 70px;
  --article-width: calc(100vw - var(--menu-width));

  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: var(--menu-width) var(--article-width);
}

.app-view-content > article {
  position: relative;
}
</style>
