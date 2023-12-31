import type { Notification } from '@/components/utils/NotificationComponent.vue';
import type { User } from '@/requests/user/types';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, reactive } from 'vue';

interface AppStoreStorage {
  token: string | null;
}

interface AppStoreState {
  notifications: Notification[];
  user: User | null;
}

export const useAppStore = defineStore('app', () => {
  const storage = useLocalStorage('app', <AppStoreStorage>{
    token: null
  });

  const state = reactive<AppStoreState>({
    notifications: [],
    user: null
  });

  const getToken = computed(() => storage.value.token);
  const getUser = computed(() => state.user);
  const isAuthenticated = computed(() => !!storage.value.token);

  const getNotifications = computed(() => state.notifications);

  const setToken = (token: AppStoreStorage['token']) => (storage.value.token = token);
  const setUser = (user: AppStoreState['user']) => (state.user = user);

  const notify = (notification: Notification) => state.notifications.unshift(notification);
  const closeNotification = () => state.notifications.pop();

  function $reset() {
    setToken(null);
    setUser(null);
  }

  return {
    getToken,
    getUser,
    isAuthenticated,
    getNotifications,
    $reset,
    setToken,
    setUser,
    notify,
    closeNotification
  };
});
