import { shallowRef, watchEffect } from "vue";
function toArray(val) {
	return val ? Array.isArray(val) ? val : [val] : [];
}
function normalizeAction(action) {
	if (typeof action === "string") return action.toLowerCase();
	return action;
}
function useAction(action, showAction, hideAction) {
	const _showAction = shallowRef(/* @__PURE__ */ new Set());
	const _hideAction = shallowRef(/* @__PURE__ */ new Set());
	watchEffect(() => {
		const mergedShowAction = toArray(showAction?.value ?? action.value).map(normalizeAction);
		const mergedHideAction = toArray(hideAction?.value ?? action.value).map(normalizeAction);
		const showActionSet = new Set(mergedShowAction);
		const hideActionSet = new Set(mergedHideAction);
		if (showActionSet.has("hover") && !showActionSet.has("click")) showActionSet.add("touch");
		if (hideActionSet.has("hover") && !hideActionSet.has("click")) hideActionSet.add("touch");
		_showAction.value = showActionSet;
		_hideAction.value = hideActionSet;
	});
	return [_showAction, _hideAction];
}
export { useAction as default };
