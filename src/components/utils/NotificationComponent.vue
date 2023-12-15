<template>
  <div class="notification-content" :style="{ '--color': notificationStyle.color }">
    <IconComponent
      :path="notificationStyle.icon"
      :size="30"
      class="notification-icon"
    ></IconComponent>
    <p>{{ notification.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, useCssModule } from 'vue';
import { useAppStore } from '../../stores/appStore';
import IconComponent from './IconComponent.vue';
import { mdiAlert, mdiCancel, mdiCheck, mdiEmailFastOutline } from '@mdi/js';

const appStore = useAppStore();
const css = useCssModule();

export interface Notification {
  message: string;
  type: 'success' | 'send' | 'error' | 'warning';
}

type NotificationProps = {
  notification: Notification;
  index: number;
};

const props = defineProps<NotificationProps>();

const state = reactive({
  types: {
    success: () => ({
      color: css.success,
      icon: mdiCheck
    }),
    send: () => ({
      color: css.send,
      icon: mdiEmailFastOutline
    }),
    error: () => ({
      color: css.error,
      icon: mdiCancel
    }),
    warning: () => ({
      color: css.warning,
      icon: mdiAlert
    })
  }
});

const notificationStyle = computed(() => state.types[props.notification.type]());

onMounted(() => {
  const timer = 3000 + props.index * 1000;
  setTimeout(appStore.closeNotification, timer);
});
</script>

<style module>
:export {
  success: #27ae5f;
  send: #3498db;
  error: #ea2027;
  warning: #f79f1f;
}
</style>

<style scoped>
:is(.notification-content, .notification-content span) {
  display: flex;
  align-items: center;
}

.notification-content {
  --color: 0;

  min-width: 360px;
  padding: 10px 12px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.15);
  column-gap: 12px;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.75);
  border-left: 4px solid var(--color);
}

.notification-content span {
  padding: 2px;
  border-radius: 8px;
}

.notification-content p {
  font-weight: 500;
  font-size: 0.95em;
}

.notification-icon {
  color: var(--color);
}
</style>
