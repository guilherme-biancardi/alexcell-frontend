import { pinia } from '@/stores';
import { useAppStore } from '@/stores/appStore';
import type { RouteRecordRaw } from 'vue-router';

export const adminMiddleware: RouteRecordRaw['beforeEnter'] = (to, from, next) => {
  const appStore = useAppStore(pinia);
  
  if (appStore.getUser?.isOwner) {
    return next();
  }

  return next({ name: 'devices' });
};
