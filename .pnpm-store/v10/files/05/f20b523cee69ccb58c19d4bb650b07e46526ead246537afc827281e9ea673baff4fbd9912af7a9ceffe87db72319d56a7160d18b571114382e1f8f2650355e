import { isSameOrAfter } from "../utils/dateUtil.js";
import { usePanelContext, usePickerHackContext } from "./context.js";
import { computed, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
var HIDDEN_STYLE = { visibility: "hidden" };
var PanelHeader_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const context = usePanelContext();
	const pickerHackContext = usePickerHackContext();
	const disabledOffsetPrev = computed(() => {
		const { minDate, generateConfig, locale, pickerValue, panelType } = context.value;
		const { offset, getEnd } = props;
		if (!minDate || !offset || !getEnd) return false;
		return !isSameOrAfter(generateConfig, locale, getEnd(offset(-1, pickerValue)), minDate, panelType);
	});
	const disabledSuperOffsetPrev = computed(() => {
		const { minDate, generateConfig, locale, pickerValue, panelType } = context.value;
		const { superOffset, getEnd } = props;
		if (!minDate || !superOffset || !getEnd) return false;
		return !isSameOrAfter(generateConfig, locale, getEnd(superOffset(-1, pickerValue)), minDate, panelType);
	});
	const disabledOffsetNext = computed(() => {
		const { maxDate, generateConfig, locale, pickerValue, panelType } = context.value;
		const { offset, getStart } = props;
		if (!maxDate || !offset || !getStart) return false;
		return !isSameOrAfter(generateConfig, locale, maxDate, getStart(offset(1, pickerValue)), panelType);
	});
	const disabledSuperOffsetNext = computed(() => {
		const { maxDate, generateConfig, locale, pickerValue, panelType } = context.value;
		const { superOffset, getStart } = props;
		if (!maxDate || !superOffset || !getStart) return false;
		return !isSameOrAfter(generateConfig, locale, maxDate, getStart(superOffset(1, pickerValue)), panelType);
	});
	const onOffset = (distance) => {
		const { offset, onChange } = props;
		const { pickerValue } = context.value;
		if (offset && onChange) onChange(offset(distance, pickerValue));
	};
	const onSuperOffset = (distance) => {
		const { superOffset, onChange } = props;
		const { pickerValue } = context.value;
		if (superOffset && onChange) onChange(superOffset(distance, pickerValue));
	};
	return () => {
		const { prefixCls, classNames: panelClassNames, styles, prevIcon = "‹", nextIcon = "›", superPrevIcon = "«", superNextIcon = "»", locale } = context.value;
		const { hidePrev, hideNext, hideHeader } = pickerHackContext?.value || {};
		const { offset, superOffset } = props;
		if (hideHeader) return null;
		const headerPrefixCls = `${prefixCls}-header`;
		const prevBtnCls = `${headerPrefixCls}-prev-btn`;
		const nextBtnCls = `${headerPrefixCls}-next-btn`;
		const superPrevBtnCls = `${headerPrefixCls}-super-prev-btn`;
		const superNextBtnCls = `${headerPrefixCls}-super-next-btn`;
		return createVNode("div", {
			"class": clsx(headerPrefixCls, panelClassNames?.header),
			"style": styles?.header
		}, [
			superOffset && createVNode("button", {
				"type": "button",
				"aria-label": locale?.previousYear,
				"onClick": () => onSuperOffset(-1),
				"tabindex": -1,
				"class": clsx(superPrevBtnCls, disabledSuperOffsetPrev.value && `${superPrevBtnCls}-disabled`),
				"disabled": disabledSuperOffsetPrev.value,
				"style": hidePrev ? HIDDEN_STYLE : {}
			}, [superPrevIcon]),
			offset && createVNode("button", {
				"type": "button",
				"aria-label": locale?.previousMonth,
				"onClick": () => onOffset(-1),
				"tabindex": -1,
				"class": clsx(prevBtnCls, disabledOffsetPrev.value && `${prevBtnCls}-disabled`),
				"disabled": disabledOffsetPrev.value,
				"style": hidePrev ? HIDDEN_STYLE : {}
			}, [prevIcon]),
			createVNode("div", { "class": `${headerPrefixCls}-view` }, [slots.default?.()]),
			offset && createVNode("button", {
				"type": "button",
				"aria-label": locale?.nextMonth,
				"onClick": () => onOffset(1),
				"tabindex": -1,
				"class": clsx(nextBtnCls, disabledOffsetNext.value && `${nextBtnCls}-disabled`),
				"disabled": disabledOffsetNext.value,
				"style": hideNext ? HIDDEN_STYLE : {}
			}, [nextIcon]),
			superOffset && createVNode("button", {
				"type": "button",
				"aria-label": locale?.nextYear,
				"onClick": () => onSuperOffset(1),
				"tabindex": -1,
				"class": clsx(superNextBtnCls, disabledSuperOffsetNext.value && `${superNextBtnCls}-disabled`),
				"disabled": disabledSuperOffsetNext.value,
				"style": hideNext ? HIDDEN_STYLE : {}
			}, [superNextIcon])
		]);
	};
}, {
	props: {
		offset: {
			type: Function,
			required: false,
			default: void 0
		},
		superOffset: {
			type: Function,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		getStart: {
			type: Function,
			required: false,
			default: void 0
		},
		getEnd: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "PanelHeader"
});
export { PanelHeader_default as default };
