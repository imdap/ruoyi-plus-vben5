import { warning } from "@v-c/util/dist/warning";
//#region src/hooks/useAnimateConfig.ts
function useAnimateConfig(animated = {
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
		tabPane: false
	};
	else mergedAnimated = {
		inkBar: true,
		...typeof animated === "object" ? animated : {}
	};
	if (mergedAnimated.tabPaneMotion && mergedAnimated.tabPane === void 0) mergedAnimated.tabPane = true;
	if (!mergedAnimated.tabPaneMotion && mergedAnimated.tabPane) {
		if (process.env.NODE_ENV !== "production") warning(false, "`animated.tabPane` is true but `animated.tabPaneMotion` is not provided. Motion will not work.");
		mergedAnimated.tabPane = false;
	}
	return mergedAnimated;
}
//#endregion
export { useAnimateConfig as default };
