import { computed, createVNode, defineComponent, shallowRef } from "vue";
import { classNames } from "@v-c/util";
import useMergedState from "@v-c/util/dist/hooks/useMergedState";
const Checkbox = /* @__PURE__ */ defineComponent((props, { expose, attrs }) => {
	const inputRef = shallowRef();
	const holderRef = shallowRef();
	const [rawValue, setRawValue] = useMergedState(props.defaultChecked, { value: computed(() => props.checked) });
	expose({
		focus: () => {
			inputRef.value?.focus();
		},
		blur: () => {
			inputRef.value?.blur();
		},
		input: inputRef,
		nativeElement: holderRef
	});
	const handleChange = (e) => {
		if (props.disabled) return;
		if (props.checked === void 0) setRawValue(e.target?.checked);
		props?.["onUpdate:checked"]?.(e.target.checked);
		props?.onChange?.({
			target: {
				...attrs,
				...props,
				checked: e.target.checked
			},
			stopPropagation() {
				e.stopPropagation();
			},
			preventDefault() {
				e.preventDefault();
			},
			nativeEvent: e
		});
	};
	return () => {
		const { prefixCls = "vc-checkbox", disabled, type = "checkbox", title } = props;
		const classString = classNames(prefixCls, attrs.class, {
			[`${prefixCls}-checked`]: rawValue.value,
			[`${prefixCls}-disabled`]: disabled
		});
		return createVNode("span", {
			"class": classString,
			"ref": holderRef,
			"title": title,
			"style": [attrs.style]
		}, [createVNode("input", {
			"class": `${prefixCls}-input`,
			"ref": inputRef,
			"onChange": (e) => handleChange(e),
			"disabled": disabled,
			"checked": !!rawValue.value,
			"type": type
		}, null)]);
	};
}, { props: {
	prefixCls: {
		type: String,
		required: false,
		default: void 0
	},
	onChange: {
		type: Function,
		required: false,
		default: void 0
	},
	"onUpdate:checked": {
		type: Function,
		required: false,
		default: void 0
	},
	checked: {
		type: Boolean,
		required: false,
		default: void 0
	},
	defaultChecked: {
		type: Boolean,
		required: false,
		default: void 0
	},
	disabled: {
		type: Boolean,
		required: false,
		default: void 0
	},
	type: {
		type: String,
		required: false,
		default: void 0
	},
	title: {
		type: String,
		required: false,
		default: void 0
	},
	value: {
		required: false,
		default: void 0
	}
} });
var src_default = Checkbox;
export { Checkbox, src_default as default };
