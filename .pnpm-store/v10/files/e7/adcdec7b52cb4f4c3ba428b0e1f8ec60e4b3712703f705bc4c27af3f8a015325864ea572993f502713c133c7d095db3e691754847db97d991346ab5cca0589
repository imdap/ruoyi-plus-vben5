import { devUseWarning, isDev } from "../_util/warning.js";
import Base_default from "./Base/index.js";
import { computed, createVNode, defineComponent, mergeProps, watchEffect } from "vue";
import { omit } from "es-toolkit";

//#region src/typography/Title.tsx
const TITLE_ELE_LIST = [
	1,
	2,
	3,
	4,
	5
];
const Title = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	const level = computed(() => props.level ?? 1);
	if (isDev) {
		const warning = devUseWarning("Typography.Title");
		watchEffect(() => {
			warning(TITLE_ELE_LIST.includes(level.value), "usage", "Title only accept `1 | 2 | 3 | 4 | 5` as `level` value.");
		});
	}
	const component = computed(() => TITLE_ELE_LIST.includes(level.value) ? `h${level.value}` : "h1");
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
		]), omit(props, ["level"]), { "component": component.value }, listeners), slots);
	};
}, {
	props: {
		level: {
			type: Number,
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
		ellipsis: {
			type: [Boolean, Object],
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
	name: "ATypographyTitle",
	inheritAttrs: false
});
var Title_default = Title;

//#endregion
export { Title_default as default };