<template>
  <TransitionGroup tag="ul" class="notifications-list" name="notification">
    <li v-for="(notification, index) in appStore.getNotifications" :key="index">
      <NotificationComponent :notification="notification" :index="index"></NotificationComponent>
    </li>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useAppStore } from '../stores/appStore'
import NotificationComponent from './utils/NotificationComponent.vue';

const appStore = useAppStore()
</script>

<style scoped>
.notifications-list {
  position: fixed;
  top: 24px;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 8px;
  z-index: 2;
}

.notification-move,
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(25px);
}
</style>
