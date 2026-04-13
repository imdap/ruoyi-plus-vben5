import { triggerFocus as triggerFocus$1 } from "@v-c/util/dist/Dom/focus";
//#region src/utils/commonUtils.ts
function createPatchedTarget(target, value) {
	const patched = target.cloneNode(true);
	patched.value = value;
	if (typeof target.selectionStart === "number" && typeof target.selectionEnd === "number") {
		patched.selectionStart = target.selectionStart;
		patched.selectionEnd = target.selectionEnd;
	}
	patched.setSelectionRange = (start, end, direction) => {
		target.setSelectionRange(start, end, direction);
	};
	return patched;
}
function cloneEvent(event, target, value) {
	const patchedTarget = createPatchedTarget(target, value);
	return {
		type: event?.type,
		timeStamp: event?.timeStamp,
		bubbles: event?.bubbles,
		cancelable: event?.cancelable,
		composed: event?.composed,
		target: patchedTarget,
		currentTarget: patchedTarget,
		preventDefault: event?.preventDefault ? event.preventDefault.bind(event) : void 0,
		stopPropagation: event?.stopPropagation ? event.stopPropagation.bind(event) : void 0,
		stopImmediatePropagation: event?.stopImmediatePropagation ? event.stopImmediatePropagation.bind(event) : void 0,
		nativeEvent: event
	};
}
function hasAddon(props) {
	return !!(props.addonBefore || props.addonAfter);
}
function hasPrefixSuffix(props) {
	return !!(props.prefix || props.suffix || props.allowClear);
}
function resolveOnChange(target, e, onChange, targetValue) {
	if (!onChange) return;
	if (e?.type === "click") {
		onChange(cloneEvent(e, target, ""));
		return;
	}
	if (target.type !== "file" && targetValue !== void 0) {
		onChange(cloneEvent(e, target, targetValue));
		return;
	}
	onChange(e);
}
var triggerFocus = triggerFocus$1;
//#endregion
export { hasAddon, hasPrefixSuffix, resolveOnChange, triggerFocus };
