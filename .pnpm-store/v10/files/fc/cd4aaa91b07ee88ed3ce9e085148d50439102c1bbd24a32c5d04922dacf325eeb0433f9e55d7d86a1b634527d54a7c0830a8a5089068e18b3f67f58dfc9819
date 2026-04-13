import { ref } from "vue";
function useForceUpdate() {
  const key = ref(0);
  function forceUpdate() {
    key.value++;
  }
  return [forceUpdate, key];
}
export {
  useForceUpdate
};
