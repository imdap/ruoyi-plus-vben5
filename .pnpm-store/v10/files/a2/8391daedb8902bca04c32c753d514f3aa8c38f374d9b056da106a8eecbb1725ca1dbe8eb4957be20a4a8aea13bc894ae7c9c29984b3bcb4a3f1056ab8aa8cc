import { createVNode } from "vue";
import { LeftOutlined, LoadingOutlined, RightOutlined } from "@antdv-next/icons";

//#region src/cascader/hooks/useIcons.tsx
const defaultLoadingIcon = createVNode(LoadingOutlined, { "spin": true }, null);
const defaultExpandIcon = createVNode(RightOutlined, null, null);
const defaultRtlExpandIcon = createVNode(LeftOutlined, null, null);
function useIcons({ contextExpandIcon, contextLoadingIcon, expandIcon, loadingIcon, isRtl }) {
	return {
		expandIcon: expandIcon ?? contextExpandIcon ?? (isRtl ? defaultRtlExpandIcon : defaultExpandIcon),
		loadingIcon: loadingIcon ?? contextLoadingIcon ?? defaultLoadingIcon
	};
}

//#endregion
export { useIcons as default };