import { getSlotPropsFnRun } from "../_util/tools.js";
import { FormItemPrefixContextProvider, useFormContext, useFormContextProvider } from "./context.js";
import { responsiveArrayReversed } from "../_util/responsiveObserver.js";
import col_default from "../grid/col.js";
import ErrorList_default from "./ErrorList.js";
import fallbackCmp_default from "./style/fallbackCmp.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeProps, nextTick, shallowRef, watch } from "vue";
import { clsx, get, set } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { omit } from "es-toolkit";

//#region src/form/FormItemInput.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const GRID_MAX = 24;
const FormItemInput = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const baseClassName = computed(() => `${props.prefixCls}-item`);
	const formContext = useFormContext();
	const contextClassNames = computed(() => formContext.value?.classes ?? {});
	const contextStyles = computed(() => formContext.value?.styles ?? {});
	const extraRef = shallowRef();
	const extraHeight = shallowRef(0);
	watch(() => props.extra, async () => {
		await nextTick();
		if (props.extra && extraRef.value) extraHeight.value = extraRef.value.clientHeight;
		else extraHeight.value = 0;
	}, { immediate: true });
	useFormContextProvider(computed(() => omit(formContext.value ?? {}, ["labelCol", "wrapperCol"])));
	return () => {
		const { wrapperCol, labelCol, marginBottom, warnings, errors, prefixCls, status, fieldId, onErrorVisibleChanged } = props;
		const label = getSlotPropsFnRun({}, props, "label");
		const extra = getSlotPropsFnRun({}, props, "extra");
		const help = getSlotPropsFnRun({}, props, "help");
		const children = filterEmpty(slots?.default?.() ?? []);
		const mergedWrapperColFn = () => {
			let mergedWrapper = { ...wrapperCol || formContext.value?.wrapperCol || {} };
			if (label === null && !labelCol && !wrapperCol && formContext.value?.labelCol) [void 0, ...responsiveArrayReversed].forEach((size) => {
				const _size = size ? [size] : [];
				const formLabel = get(formContext?.value?.labelCol, _size);
				const formLabelObj = typeof formLabel === "object" ? formLabel : {};
				const wrapper = get(mergedWrapper, _size);
				const wrapperObj = typeof wrapper === "object" ? wrapper : {};
				if ("span" in formLabelObj && !("offset" in wrapperObj) && formLabelObj.span < GRID_MAX) mergedWrapper = set(mergedWrapper, [..._size, "offset"], formLabelObj.span);
			});
			return mergedWrapper;
		};
		const mergedWrapperCol = mergedWrapperColFn();
		const className = clsx(`${baseClassName.value}-control`, mergedWrapperCol?.class);
		const inputDom = createVNode("div", { "class": `${baseClassName.value}-control-input` }, [createVNode("div", {
			"class": clsx(`${baseClassName.value}-control-input-content`, contextClassNames.value?.content),
			"style": contextStyles.value?.content
		}, [children])]);
		const errorListDom = marginBottom !== null || errors.length || warnings.length ? createVNode(FormItemPrefixContextProvider, {
			"prefixCls": prefixCls,
			"status": status
		}, { default: () => [createVNode(ErrorList_default, {
			"fieldId": fieldId,
			"errors": errors,
			"warnings": warnings,
			"help": help,
			"helpStatus": status,
			"class": `${baseClassName.value}-explain-connected`,
			"onVisibleChanged": onErrorVisibleChanged
		}, null)] }) : null;
		const extraProps = {};
		if (fieldId) extraProps.id = `${fieldId}_extra`;
		const extraDom = extra ? createVNode("div", mergeProps(extraProps, {
			"class": `${baseClassName.value}-extra`,
			"ref": extraRef
		}), [extra]) : null;
		const dom = createVNode(Fragment, null, [inputDom, errorListDom || extraDom ? createVNode("div", {
			"class": `${baseClassName.value}-additional`,
			"style": marginBottom ? { minHeight: `${marginBottom + extraHeight.value}px` } : {}
		}, [errorListDom, extraDom]) : null]);
		return createVNode(Fragment, null, [createVNode(col_default, mergeProps(mergedWrapperCol, { "class": className }), _isSlot(dom) ? dom : { default: () => [dom] }), createVNode(fallbackCmp_default, { "prefixCls": prefixCls }, null)]);
	};
}, {
	props: {
		labelCol: {
			type: Object,
			required: false
		},
		wrapperCol: {
			type: Object,
			required: false
		},
		extra: {
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
		status: {
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
		fieldId: {
			type: String,
			required: false
		},
		label: {
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
		prefixCls: {
			type: String,
			required: true
		},
		errors: {
			type: Array,
			required: true
		},
		warnings: {
			type: Array,
			required: true
		},
		marginBottom: {
			type: [Number, null],
			required: false
		},
		onErrorVisibleChanged: {
			type: Function,
			required: false
		}
	},
	name: "FormItemInput",
	inheritAttrs: false
});
var FormItemInput_default = FormItemInput;

//#endregion
export { FormItemInput_default as default };