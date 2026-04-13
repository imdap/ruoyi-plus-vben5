import { devUseWarning, isDev } from "../_util/warning.js";
import Base_default from "./Base/index.js";
import { computed, createVNode, defineComponent, mergeProps, watchEffect } from "vue";
import { omit } from "es-toolkit";

//#region src/typography/Text.tsx
const Text$1 = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	const mergedEllipsis = computed(() => {
		const ellipsis = props.ellipsis;
		if (ellipsis && typeof ellipsis === "object") return omit(ellipsis, ["expandable", "rows"]);
		return ellipsis;
	});
	if (isDev) {
		const warning = devUseWarning("Typography.Text");
		watchEffect(() => {
			const ellipsis = props.ellipsis;
			warning(typeof ellipsis !== "object" || !ellipsis || !("expandable" in ellipsis) && !("rows" in ellipsis), "usage", "`ellipsis` do not support `expandable` or `rows` props.");
		});
	}
	const listeners = {
		"onClick": (e) => emit("click", e),
		"onCopy": (e) => emit("copy", e),
		"onExpand": (expanded, e) => emit("expand", expanded, e),
		"onEditStart": () => emit("edit:start"),
		"onEditChange": (val) => emit("edit:change", val),
		"onEditCancel": () => emit("edit:cancel"),
		"onEditEnd": () => emit("edit:end"),
		"onUpdate:expanded": (val) => emit("update:expanded", val),
		"onUpdate:editing": (val) => emit("update:editing", val)
	};
	return () => {
		return createVNode(Base_default, mergeProps(omit(attrs, [
			"onClick",
			"onCopy",
			"onExpand",
			"onEditStart",
			"onEditChange",
			"onEditCancel",
			"onEditEnd",
			"onUpdate:expanded",
			"onUpdate:editing"
		]), props, {
			"ellipsis": mergedEllipsis.value,
			"component": "span"
		}, listeners), slots);
	};
}, {
	props: {
		ellipsis: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		title: {
			type: String,
			required: false
		},
		editable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		copyable: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		type: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		code: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mark: {
			type: Boolean,
			required: false,
			default: void 0
		},
		underline: {
			type: Boolean,
			required: false,
			default: void 0
		},
		delete: {
			type: Boolean,
			required: false,
			default: void 0
		},
		strong: {
			type: Boolean,
			required: false,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		italic: {
			type: Boolean,
			required: false,
			default: void 0
		},
		component: { required: false },
		direction: {
			type: [String, null],
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		id: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	},
	emits: [
		"click",
		"expand",
		"copy",
		"edit:start",
		"edit:change",
		"edit:cancel",
		"edit:end",
		"update:expanded",
		"update:editing"
	],
	name: "ATypographyText",
	inheritAttrs: false
});
var Text_default = Text$1;

//#endregion
export { Text_default as default };