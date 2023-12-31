import { shallowRef } from 'vue';

export const useModal = () => {
  const active = shallowRef<boolean>(false);

  const closeModal = () => (active.value = false);
  const showModal = () => (active.value = true);

  return {
    closeModal,
    showModal,
    active
  };
};
