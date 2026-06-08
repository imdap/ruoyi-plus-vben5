import { ref } from 'vue';

import { defineStore } from 'pinia';

export const useGlobalLoadingStore = defineStore('app-global-loading', () => {
  const globalLoading = ref(false);

  function $reset() {
    globalLoading.value = false;
  }

  return {
    globalLoading,
    $reset,
  };
});
