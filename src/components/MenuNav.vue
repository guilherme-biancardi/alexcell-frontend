<template>
  <nav class="menu-content">
    <menu>
      <template v-for="(item, index) in visibleMenuItens" :key="index">
        <li class="menu-item" :class="{ 'item-selected': route.name === item.to }">
          <RouterLink :to="{ name: item.to }">
            <IconComponent :="item.icon"></IconComponent>
          </RouterLink>
          <span class="menu-tooltip">{{ item.tooltip }}</span>
        </li>
      </template>
      <li>
        <ButtonTextComponent :="buttonLogout" class="btn-logout"></ButtonTextComponent>
      </li>
    </menu>
  </nav>
</template>

<script setup lang="ts">
import type { Routes } from '@/ts/createRoute';
import type { Icon } from './utils/IconComponent.vue';
import { useAppStore } from '@/stores/appStore';
import { computed, shallowRef, useCssModule } from 'vue';
import { mdiAccountCogOutline, mdiCellphone, mdiLogoutVariant } from '@mdi/js';
import IconComponent from './utils/IconComponent.vue';
import ButtonTextComponent from './utils/ButtonTextComponent.vue';
import { useUtil } from '@/ts/utils';
import { logoutRequest } from '@/requests/auth/request';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

type CssModule = 'logoutBackground' | 'logoutColor' | 'logoutBackgroundHover' | 'logoutColorHover';
const css = useCssModule() as Record<CssModule, string>;

const { useButton } = useUtil();

const buttonLogout = computed(() => {
  const button = useButton();
  button.setIcon({ path: mdiLogoutVariant, size: 30 });
  button.setStyle({ backgroundColor: css.logoutBackground, color: css.logoutColor });
  button.setHover({ backgroundColor: css.logoutBackgroundHover, color: css.logoutColorHover });
  button.setAttributes({ title: 'Sair do Sistema' });
  button.setClick(() => {
    const request = logoutRequest(null);

    request.execute().then((res) => {
      appStore.$reset();
      router.replace({ name: 'signIn' });

      appStore.notify({ message: res.data.message, type: 'success' });
    });
  });

  return button.get();
});

const appStore = useAppStore();
const isOwner = computed(() => appStore.getUser?.isOwner || false);

interface MenuItem {
  to: Routes;
  tooltip: string;
  icon: Icon;
  visible: boolean;
}

const menuItens = shallowRef<MenuItem[]>([
  {
    to: 'admin',
    tooltip: 'administração',
    icon: {
      path: mdiAccountCogOutline,
      size: 30
    },
    visible: isOwner.value
  },
  {
    to: 'devices',
    tooltip: 'celulares',
    icon: {
      path: mdiCellphone,
      size: 28
    },
    visible: true
  }
]);

const visibleMenuItens = computed(() => menuItens.value.filter((item) => item.visible));
</script>

<style module>
:export {
  logoutBackground: var(--gray-light);
  logoutColor: var(--gray-darkness);
  logoutBackgroundHover: var(--primary-light);
  logoutColorHover: #fff;
}
</style>

<style scoped>
.menu-content {
  width: 100%;
  height: 100%;
  padding: 12px 8px;
  background-color: var(--light);
  border-right: 1px solid var(--light-dark);
  z-index: 1;
}

.menu-content menu {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  row-gap: 12px;
}

.menu-item,
.menu-item a,
.btn-logout {
  display: grid;
  place-items: center;
  transition: all 150ms ease;
}

.menu-item, .btn-logout{
  border-radius: 8px;
  overflow: hidden;
}

.menu-item a,
.btn-logout {
  width: 100%;
  padding: 10px;
}

.menu-content li:last-of-type {
  margin-top: auto;
}

.menu-item:hover {
  background-color: var(--primary-light);
}

.menu-item:hover a {
  color: #fff;
}

.menu-item a {
  color: var(--primary);
}

.item-selected {
  background-color: var(--primary);
}

.item-selected a {
  color: #fff;
}

.menu-tooltip {
  opacity: 0;
  position: absolute;
  background-color: var(--primary-light);
  color: #fff;
  left: calc(100% + 8px);
  padding: 6px 16px;
  text-transform: capitalize;
  border-radius: 5px;
  transition: all 150ms ease;
  font-weight: 500;
}

.menu-item:hover .menu-tooltip {
  opacity: 1;
  transform: translateX(10px);
}
</style>
