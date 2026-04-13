import { getTransitionName, getTransitionProps } from "@v-c/util/dist/utils/transition";

//#region src/tabs/hooks/useAnimateConfig.ts
function useAnimateConfig(prefixCls, animated = {
	inkBar: true,
	tabPane: false
}) {
	let mergedAnimated;
	if (animated === false) mergedAnimated = {
		inkBar: false,
		tabPane: false
	};
	else if (animated === true) mergedAnimated = {
		inkBar: true,
		tabPane: true
	};
	else mergedAnimated = {
		inkBar: true,
		...typeof animated === "object" ? animated : {}
	};
	if (mergedAnimated.tabPane) mergedAnimated.tabPaneMotion = getTransitionProps(getTransitionName(prefixCls, "switch"), { appear: false });
	return mergedAnimated;
}

//#endregion
export { useAnimateConfig as default };