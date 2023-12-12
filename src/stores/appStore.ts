import type { Notification } from '@/components/utils/NotificationComponent.vue'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

interface AppStoreStorage {
  token: string | null
}

interface AppStoreState {
  notifications: Notification[]
}

export const useAppStore = defineStore('app', () => {
  const storage = useLocalStorage('app', <AppStoreStorage>{
    token: null
  })

  const state = reactive<AppStoreState>({
    notifications: []
  })

  const getToken = computed(() => storage.value.token)
  const isAuthenticated = computed(() => !!storage.value.token)

  const getNotifications = computed(() => state.notifications)

  const setToken = (token: AppStoreStorage['token']) => (storage.value.token = token)

  const notify = (notification: Notification) => state.notifications.unshift(notification)
  const closeNotification = () => state.notifications.pop()

  return {
    getToken,
    isAuthenticated,
    getNotifications,
    setToken,
    notify,
    closeNotification
  }
})
