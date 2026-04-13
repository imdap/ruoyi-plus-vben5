import { useId } from "vue";
function getUseId() {
	return useId;
}
var useOriginalId = getUseId();
function useId_default(id) {
	const vueId = useOriginalId();
	if (id) return id;
	if (process.env.NODE_ENV === "test") return "test-id";
	return vueId;
}
function getId(prefix, key) {
	return `${prefix}-${String(key).replace(/[^a-zA-Z0-9_.:-]/g, "-")}`;
}
export { useId_default as default, getId };
