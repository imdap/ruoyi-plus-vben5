import { toPropsRefs } from "../_util/tools.js";
import { cloneElement } from "../_util/vueNode.js";
import TextArea_default from "../input/TextArea.js";
import style_default from "./style/index.js";
import { createVNode, defineComponent, mergeDefaults, onMounted, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { EnterOutlined } from "@antdv-next/icons";
import KeyCode from "@v-c/util/dist/KeyCode";

//#region src/typography/Editable.tsx
const defaults = { autoSize: true };
const Editable = /* @__PURE__ */ defineComponent((props) => {
	const { prefixCls, direction, maxLength, autoSize } = toPropsRefs(props, "prefixCls", "direction", "maxLength", "autoSize");
	const ref = shallowRef();
	const inComposition = shallowRef(false);
	const lastKeyCode = shallowRef(null);
	const current = shallowRef(props.value);
	watch(() => props.value, (val) => {
		current.value = val;
	});
	onMounted(() => {
		if (ref.value?.resizableTextArea) {
			const { textArea } = ref.value.resizableTextArea;
			textArea.focus();
			const { length } = textArea.value;
			textArea.setSelectionRange(length, length);
		}
	});
	const onChange = ({ target }) => {
		current.value = target.value.replace(/[\n\r]/g, "");
	};
	const onCompositionStart = () => {
		inComposition.value = true;
	};
	const onCompositionEnd = () => {
		inComposition.value = false;
	};
	const onKeyDown = ({ keyCode }) => {
		if (inComposition.value) return;
		lastKeyCode.value = keyCode;
	};
	const confirmChange = () => {
		props?.onSave?.(current.value.trim());
	};
	const onKeyUp = ({ keyCode, ctrlKey, altKey, metaKey, shiftKey }) => {
		if (lastKeyCode.value !== keyCode || inComposition.value || ctrlKey || altKey || metaKey || shiftKey) return;
		if (keyCode === KeyCode.ENTER) {
			confirmChange();
			props?.onEnd?.();
		} else if (keyCode === KeyCode.ESC) props?.onCancel?.();
	};
	const onBlur = () => {
		confirmChange();
	};
	const [hashId, cssVarCls] = style_default(prefixCls);
	const icon = props.enterIcon === void 0 ? createVNode(EnterOutlined, null, null) : props.enterIcon;
	return () => {
		const { component, className } = props;
		const textAreaClassName = clsx(prefixCls.value, `${prefixCls.value}-edit-content`, {
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-${component}`]: !!component
		}, className, hashId.value, cssVarCls.value);
		return createVNode("div", {
			"class": textAreaClassName,
			"style": props.style
		}, [createVNode(TextArea_default, {
			"ref": ref,
			"maxlength": maxLength.value,
			"value": current.value,
			"onChange": onChange,
			"onKeydown": onKeyDown,
			"onKeyup": onKeyUp,
			"onCompositionstart": onCompositionStart,
			"onCompositionend": onCompositionEnd,
			"onBlur": onBlur,
			"aria-label": props["aria-label"],
			"rows": 1,
			"autoSize": autoSize.value
		}, null), icon !== null ? cloneElement(icon, { class: `${prefixCls.value}-edit-content-confirm` }) : null]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: true
		},
		value: {
			type: String,
			required: true
		},
		"aria-label": {
			type: String,
			required: false
		},
		onSave: {
			type: Function,
			required: true
		},
		onCancel: {
			type: Function,
			required: true
		},
		onEnd: {
			type: Function,
			required: false
		},
		className: {
			type: String,
			required: false
		},
		style: {
			type: Object,
			required: false
		},
		direction: {
			type: [String, null],
			required: false
		},
		maxLength: {
			type: Number,
			required: false
		},
		autoSize: { required: false },
		enterIcon: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		component: {
			type: String,
			required: false
		}
	}, defaults),
	name: "TypographyEditable",
	inheritAttrs: false
});
var Editable_default = Editable;

//#endregion
export { Editable_default as default };