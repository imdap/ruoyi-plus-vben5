import { onUnmounted } from "vue";
function useMotionValueEvent(value, event, callback) {
  const unlisten = value.on(event, callback);
  onUnmounted(() => {
    unlisten();
  });
  return unlisten;
}
export {
  useMotionValueEvent
};
