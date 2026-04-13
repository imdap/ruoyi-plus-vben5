import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import motion_default from "../_util/motion.js";
import isNonNullable_default from "../_util/isNonNullable.js";
import { useFormItemPrefixContext } from "./context.js";
import style_default from "./style/index.js";
import { Transition, TransitionGroup, computed, createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { getTransitionGroupProps, getTransitionProps } from "@v-c/util/dist/utils/transition";

//#region src/form/ErrorList.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const EMPTY_LIST = [];
function toErrorEntity(error, prefix, errorStatus, index = 0) {
	return {
		key: typeof error === "string" ? error : `${prefix}-${index}`,
		error,
		errorStatus
	};
}
const ErrorList = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const formItemPrefixContext = useFormItemPrefixContext();
	const prefixCls = computed(() => formItemPrefixContext.value?.prefixCls ?? "");
	const baseClassName = computed(() => `${prefixCls.value}-item-explain`);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	return () => {
		let _slot;
		const { fieldId, errors, warnings, helpStatus } = props;
		const help = getSlotPropsFnRun({}, props, "help");
		const debounceErrors = errors || EMPTY_LIST;
		const debouncedWarnings = warnings || EMPTY_LIST;
		const fullKeyListFn = () => {
			if (isNonNullable_default(help)) return [toErrorEntity(help, "help", helpStatus)];
			return [...debounceErrors.map((error, index) => toErrorEntity(error, "error", "error", index)), ...debouncedWarnings.map((warning, index) => toErrorEntity(warning, "warning", "warning", index))];
		};
		const fullKeyList = fullKeyListFn();
		const filledKeyFullKeyListFn = () => {
			const keysCount = {};
			fullKeyList.forEach(({ key }) => {
				keysCount[key] = (keysCount[key] || 0) + 1;
			});
			return fullKeyList.map((entity, index) => ({
				...entity,
				key: keysCount[entity.key] > 1 ? `${entity.key}-fallback-${index}` : entity.key
			}));
		};
		const filledKeyFullKeyList = filledKeyFullKeyListFn();
		const helpProps = {};
		if (fieldId) helpProps.id = `${fieldId}_help`;
		const { className: rootClassName } = getAttrStyleAndClass(attrs);
		const collapseMotion = motion_default(prefixCls.value);
		const transitionPropsName = `${prefixCls.value}-show-help`;
		const transitionProps = {
			name: transitionPropsName,
			...getTransitionProps(transitionPropsName),
			appear: true,
			css: true,
			onAfterEnter: () => {
				props.onVisibleChanged?.(true);
			},
			onAfterLeave: () => {
				props.onVisibleChanged?.(false);
			}
		};
		const transitionGroupProps = {
			...getTransitionGroupProps(`${prefixCls.value}-show-help-item`),
			...collapseMotion,
			name: `${prefixCls.value}-show-help-item`
		};
		return createVNode(Transition, transitionProps, { default: () => [!!filledKeyFullKeyList.length && createVNode("div", { "class": clsx(baseClassName.value, cssVarCls.value, rootCls.value, rootClassName, hashId.value) }, [createVNode(TransitionGroup, mergeProps(transitionGroupProps, { "appear": true }), _isSlot(_slot = filledKeyFullKeyList.map((itemProps) => {
			const { key, error, errorStatus, class: itemClassName, style: itemStyle } = itemProps;
			return createVNode("div", {
				"key": key,
				"class": clsx(itemClassName, { [`${baseClassName.value}-${errorStatus}`]: !!errorStatus }),
				"style": itemStyle
			}, [error]);
		})) ? _slot : { default: () => [_slot] })])] });
	};
}, {
	props: {
		fieldId: {
			type: String,
			required: false
		},
		help: {
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
		helpStatus: {
			type: String,
			required: false
		},
		errors: {
			type: Array,
			required: false
		},
		warnings: {
			type: Array,
			required: false
		},
		onVisibleChanged: {
			type: Function,
			required: false
		}
	},
	name: "FormErrorList",
	inheritAttrs: false
});
var ErrorList_default = ErrorList;

//#endregion
export { ErrorList_default as default };