import { pinia } from '@/stores';
import { useAppStore } from '@/stores/appStore';
import type { RouteRecordRaw } from 'vue-router';

const appStore = useAppStore(pinia);

export const authenticatedMiddleware: RouteRecordRaw['beforeEnter'] = (to, from, next) => {
  if (appStore.isAuthenticated && !to.fullPath.match('app')) return next({ name: 'app' });

  if (!appStore.isAuthenticated && !to.fullPath.match('login')) return next({ name: 'login' });

  return next();
};
