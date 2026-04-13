import { getTextByNode } from "../../_util/vueNode.js";
import toList_default from "../../_util/toList.js";
import copy_default from "../../_util/copy.js";
import { onBeforeUnmount, shallowRef, unref } from "vue";

//#region src/typography/hooks/useCopyClick.ts
function useCopyClick({ copyConfig, getText }) {
	const copied = shallowRef(false);
	const copyLoading = shallowRef(false);
	const copyIdRef = shallowRef(null);
	const cleanCopyId = () => {
		if (copyIdRef.value) {
			clearTimeout(copyIdRef.value);
			copyIdRef.value = null;
		}
	};
	const getClipboardText = async () => {
		const config = unref(copyConfig);
		if (typeof config?.text === "function") return config.text();
		if (config?.text !== void 0) return config.text;
		const origin = getText?.();
		return toList_default(origin, true).map((item) => {
			item = getTextByNode(item);
			if (typeof item === "string" || typeof item === "number") return String(item);
			return "";
		}).join("");
	};
	onBeforeUnmount(cleanCopyId);
	const onClick = async (e) => {
		e?.preventDefault();
		e?.stopPropagation();
		copyLoading.value = true;
		try {
			const text = await getClipboardText();
			const config = unref(copyConfig);
			const copyOptions = {};
			if (config?.format) copyOptions.format = config.format;
			await copy_default(text == null ? "" : String(text), copyOptions);
			copyLoading.value = false;
			copied.value = true;
			cleanCopyId();
			copyIdRef.value = setTimeout(() => {
				copied.value = false;
			}, 3e3);
			unref(copyConfig)?.onCopy?.(e);
		} catch (error) {
			copyLoading.value = false;
			throw error;
		}
	};
	return {
		copied,
		copyLoading,
		onClick
	};
}
var useCopyClick_default = useCopyClick;

//#endregion
export { useCopyClick_default as default };