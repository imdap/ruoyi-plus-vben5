import { ref, onMounted, onUnmounted } from "vue";
function usePageInView() {
  const isInView = ref(true);
  const handleVisibilityChange = () => {
    isInView.value = !document.hidden;
  };
  onMounted(() => {
    if (document.hidden) {
      handleVisibilityChange();
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
  });
  onUnmounted(() => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  });
  return isInView;
}
export {
  usePageInView
};
