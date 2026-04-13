import useBaseProps from "../hooks/useBaseProps.js";
import { useSelectInputContext } from "./context.js";
import { createVNode, defineComponent, isVNode, nextTick, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { KeyCodeStr } from "@v-c/util/dist/KeyCode";
var Input_default = /* @__PURE__ */ defineComponent((props, { expose, attrs }) => {
	const selectInputContext = useSelectInputContext();
	const baseProps = useBaseProps();
	const compositionStatusRef = shallowRef(false);
	const pastedTextRef = shallowRef(null);
	const inputRef = shallowRef();
	expose({ input: inputRef });
	const handleChange = (event) => {
		const { tokenWithEnter, onSearch } = selectInputContext.value ?? {};
		let { value: nextVal } = event.target;
		if (tokenWithEnter && pastedTextRef.value && /[\r\n]/.test(pastedTextRef.value)) {
			const replacedText = pastedTextRef.value.replace(/[\r\n]+$/, "").replace(/\r\n/g, " ").replace(/[\r\n]/g, " ");
			nextVal = nextVal.replace(replacedText, pastedTextRef.value);
		}
		pastedTextRef.value = null;
		if (onSearch) onSearch(nextVal, true, compositionStatusRef.value);
		props?.onChange?.(event);
	};
	const handleKeyDown = (event) => {
		const { mode, onSearchSubmit } = selectInputContext.value ?? {};
		const { key } = event;
		const { value: nextVal } = event.currentTarget;
		const isOpen = !!baseProps.value?.open;
		if (key === KeyCodeStr.Enter && mode === "tags" && !isOpen && !compositionStatusRef.value && onSearchSubmit) onSearchSubmit(nextVal);
		props?.onKeyDown?.(event);
	};
	const handleBlur = (event) => {
		const { onInputBlur } = selectInputContext.value ?? {};
		onInputBlur?.();
		props?.onBlur?.(event);
	};
	const handleCompositionStart = () => {
		compositionStatusRef.value = true;
	};
	const handleCompositionEnd = (event) => {
		const { mode, onSearch } = selectInputContext.value ?? {};
		compositionStatusRef.value = false;
		if (mode !== "combobox") {
			const { value: nextVal } = event.currentTarget;
			onSearch?.(nextVal, true, false);
		}
	};
	const handlePaste = (event) => {
		const { clipboardData } = event;
		pastedTextRef.value = clipboardData?.getData?.("text") || "";
	};
	const widthCssVar = shallowRef();
	watch([() => props.syncWidth, () => props.value], async () => {
		await nextTick();
		const input = inputRef.value;
		if (props.syncWidth && input) {
			input.style.width = "0px";
			widthCssVar.value = input.scrollWidth;
			input.style.width = "";
		}
	}, { immediate: true });
	return () => {
		const { style, autoComplete, className, value } = props;
		const { prefixCls, mode, autoFocus, placeholder } = selectInputContext.value ?? {};
		const { input: InputComponent = "input" } = selectInputContext.value?.components ?? {};
		const { styles, id, classNames, open, activeDescendantId, role, disabled } = baseProps.value ?? {};
		const inputCls = clsx(`${prefixCls}-input`, classNames?.input, className);
		const sharedInputProps = {
			id,
			"type": mode === "combobox" ? "text" : "search",
			...attrs,
			"ref": inputRef,
			"style": {
				...styles?.input,
				...style,
				"--select-input-width": widthCssVar.value
			},
			autoFocus,
			"autocomplete": autoComplete || "off",
			"class": inputCls,
			disabled,
			"value": value || "",
			"onInput": handleChange,
			"onKeydown": handleKeyDown,
			"onBlur": handleBlur,
			"onPaste": handlePaste,
			"onCompositionstart": handleCompositionStart,
			"onCompositionend": handleCompositionEnd,
			"role": role || "combobox",
			"aria-expanded": open || false,
			"aria-haspopup": "listbox",
			"aria-owns": `${id}_list`,
			"aria-autocomplete": "list",
			"aria-controls": `${id}_list`,
			"aria-activedescendant": open ? activeDescendantId : void 0
		};
		if (isVNode(InputComponent)) return createVNode(InputComponent, {
			placeholder: props.placeholder || placeholder,
			...sharedInputProps
		});
		return createVNode(InputComponent, sharedInputProps, null);
	};
}, {
	props: {
		id: {
			type: String,
			required: false,
			default: void 0
		},
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		value: {
			type: String,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocus: {
			type: Function,
			required: false,
			default: void 0
		},
		onBlur: {
			type: Function,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		maxLength: {
			type: Number,
			required: false,
			default: void 0
		},
		syncWidth: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoComplete: {
			type: String,
			required: false,
			default: void 0
		}
	},
	name: "Input",
	inheritAttrs: false
});
export { Input_default as default };
