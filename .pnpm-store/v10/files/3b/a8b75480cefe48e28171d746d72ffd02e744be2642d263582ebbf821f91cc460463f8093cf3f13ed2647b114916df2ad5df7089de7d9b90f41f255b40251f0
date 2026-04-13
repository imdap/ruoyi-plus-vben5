import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef } from "vue";
import useMergedState from "@v-c/util/dist/hooks/useMergedState";
import KeyCode from "@v-c/util/dist/KeyCode";
var defaults = {
	prefixCls: "vc-switch",
	defaultChecked: void 0,
	checked: void 0
};
var src_default = /* @__PURE__ */ defineComponent((props, { attrs, expose }) => {
	const btnRef = shallowRef();
	const [innerChecked, setInnerChecked] = useMergedState(false, {
		value: computed(() => props.checked),
		defaultValue: props.defaultChecked
	});
	function triggerChange(newChecked, event) {
		let mergedChecked = innerChecked.value;
		if (!props.disabled) {
			mergedChecked = newChecked;
			setInnerChecked(mergedChecked);
			props?.onChange?.(mergedChecked, event);
		}
		props?.["onUpdate:checked"]?.(mergedChecked);
		return mergedChecked;
	}
	function onInternalKeyDown(e) {
		if (e.which === KeyCode.LEFT) triggerChange(false, e);
		else if (e.which === KeyCode.RIGHT) triggerChange(true, e);
		props?.onKeyDown?.(e);
	}
	function onInternalClick(e) {
		const ret = triggerChange(!innerChecked.value, e);
		props?.onClick?.(ret, e);
	}
	expose({ btnRef });
	return () => {
		const { prefixCls, className, disabled, loadingIcon, checkedChildren, unCheckedChildren, classNames, styles, ...restProps } = props;
		const switchClassName = [
			prefixCls,
			className,
			{
				[`${prefixCls}-checked`]: innerChecked.value,
				[`${prefixCls}-disabled`]: disabled
			}
		];
		return createVNode("button", mergeProps(restProps, attrs, {
			"type": "button",
			"role": "switch",
			"aria-checked": innerChecked.value,
			"disabled": disabled,
			"class": switchClassName,
			"ref": btnRef,
			"onKeydown": onInternalKeyDown,
			"onClick": onInternalClick
		}), [typeof loadingIcon === "function" ? loadingIcon() : loadingIcon, createVNode("span", { "class": `${prefixCls}-inner` }, [createVNode("span", {
			"class": [`${prefixCls}-inner-checked`, classNames?.content],
			"style": styles?.content
		}, [checkedChildren]), createVNode("span", {
			"class": [`${prefixCls}-inner-unchecked`, classNames?.content],
			"style": styles?.content
		}, [unCheckedChildren])])]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		className: {
			type: String,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		checkedChildren: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
			required: false,
			default: void 0
		},
		unCheckedChildren: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
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
		onKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		},
		tabIndex: {
			type: Number,
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
		loadingIcon: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
			required: false,
			default: void 0
		},
		title: {
			type: String,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		}
	}, defaults),
	name: "Switch",
	inheritAttrs: false
});
export { src_default as default };
