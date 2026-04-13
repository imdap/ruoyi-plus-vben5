import { devUseWarning, isDev } from "../_util/warning.js";
import Base_default from "./Base/index.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { omit } from "es-toolkit";

//#region src/typography/Link.tsx
const Link = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	if (isDev) devUseWarning("Typography.Link")(typeof props.ellipsis !== "object", "usage", "`ellipsis` only supports boolean value.");
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
		const rel = props.rel === void 0 && (props.target || attrs.target) === "_blank" ? "noopener noreferrer" : props.rel;
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
			"rel": rel,
			"ellipsis": !!props.ellipsis,
			"component": "a"
		}, listeners), slots);
	};
}, {
	props: {
		ellipsis: {
			type: Boolean,
			required: false,
			default: void 0
		},
		href: {
			type: String,
			required: false
		},
		target: {
			type: String,
			required: false
		},
		rel: {
			type: String,
			required: false
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
	name: "ATypographyLink",
	inheritAttrs: false
});
var Link_default = Link;

//#endregion
export { Link_default as default };