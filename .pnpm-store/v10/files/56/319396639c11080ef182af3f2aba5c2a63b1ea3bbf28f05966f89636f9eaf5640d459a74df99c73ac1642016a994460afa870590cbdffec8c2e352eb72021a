import { usePickerContext } from "../context.js";
import { offsetPanelDate } from "../hooks/useRangePickerValue.js";
import { providePickerHackContext } from "../../PickerPanel/context.js";
import PickerPanel_default from "../../PickerPanel/index.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { omit } from "@v-c/util";
var PickerPanelProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	providePickerHackContext(computed(() => props.value));
	return () => {
		return slots.default?.();
	};
}, {
	props: { value: {
		type: Object,
		required: true,
		default: void 0
	} },
	name: "PickerPanelProvider",
	inheritAttrs: false
});
var PopupPanel_default = /* @__PURE__ */ defineComponent((props) => {
	const ctx = usePickerContext();
	const picker = computed(() => props.picker);
	const pickerValue = computed(() => props.pickerValue);
	const needConfirm = computed(() => props.needConfirm);
	const onSubmit = computed(() => props.onSubmit);
	const range = computed(() => props.range);
	const hoverValue = computed(() => props.hoverValue);
	const multiplePanel = computed(() => props.multiplePanel);
	const onPickerValueChange = computed(() => props.onPickerValueChange);
	const internalOffsetDate = (date, offset) => {
		const { generateConfig } = ctx.value || {};
		return offsetPanelDate(generateConfig, picker?.value, date, offset);
	};
	const nextPickerValue = computed(() => {
		return internalOffsetDate(pickerValue?.value, 1);
	});
	const onSecondPickerValueChange = (nextDate) => {
		onPickerValueChange.value(internalOffsetDate(nextDate, -1));
	};
	const sharedContext = { onCellDblClick: () => {
		if (needConfirm.value) onSubmit.value();
	} };
	const hideHeader = computed(() => picker?.value === "time");
	const pickerProps = computed(() => {
		const baseProps = {
			...props,
			hoverValue: null,
			hoverRangeValue: null,
			hideHeader: hideHeader.value
		};
		if (range?.value) baseProps.hoverRangeValue = hoverValue?.value;
		else baseProps.hoverValue = hoverValue?.value;
		return baseProps;
	});
	return () => {
		const { prefixCls } = ctx.value;
		if (multiplePanel?.value) return createVNode("div", { "class": `${prefixCls}-panels` }, [createVNode(PickerPanelProvider, { "value": {
			...sharedContext,
			hideNext: true
		} }, { default: () => [createVNode(PickerPanel_default, pickerProps.value, null)] }), createVNode(PickerPanelProvider, { "value": {
			...sharedContext,
			hidePrev: true
		} }, { default: () => [createVNode(PickerPanel_default, mergeProps(omit(pickerProps.value, ["onPickerValueChange"]), {
			"pickerValue": nextPickerValue.value,
			"onPickerValueChange": onSecondPickerValueChange
		}), null)] })]);
		return createVNode(PickerPanelProvider, { "value": { ...sharedContext } }, { default: () => [createVNode(PickerPanel_default, pickerProps.value, null)] });
	};
}, {
	props: {
		multiplePanel: {
			type: Boolean,
			required: false,
			default: void 0
		},
		range: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onPickerValueChange: {
			type: Function,
			required: true,
			default: void 0
		},
		mode: {
			type: String,
			required: false,
			default: void 0
		},
		onPanelChange: {
			type: Function,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		onSelect: {
			type: Function,
			required: false,
			default: void 0
		},
		defaultPickerValue: {
			required: false,
			default: void 0
		},
		pickerValue: {
			required: false,
			default: void 0
		},
		picker: {
			type: String,
			required: false,
			default: void 0
		},
		showWeek: {
			type: Boolean,
			required: false,
			default: void 0
		},
		cellRender: {
			type: Function,
			required: false,
			default: void 0
		},
		dateRender: {
			type: Function,
			required: false,
			default: void 0
		},
		monthCellRender: {
			type: Function,
			required: false,
			default: void 0
		},
		hoverValue: {
			type: Array,
			required: false,
			default: void 0
		},
		hoverRangeValue: {
			type: Array,
			required: false,
			default: void 0
		},
		onHover: {
			type: Function,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: false,
			default: void 0
		},
		hideHeader: {
			type: Boolean,
			required: false,
			default: void 0
		},
		locale: {
			type: Object,
			required: false,
			default: void 0
		},
		generateConfig: {
			type: Object,
			required: false,
			default: void 0
		},
		disabledDate: {
			type: Function,
			required: false,
			default: void 0
		},
		minDate: {
			required: false,
			default: void 0
		},
		maxDate: {
			required: false,
			default: void 0
		},
		prevIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		nextIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		superPrevIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		superNextIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		format: {
			type: String,
			required: false,
			default: void 0
		},
		showNow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showHour: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showMinute: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showSecond: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showMillisecond: {
			type: Boolean,
			required: false,
			default: void 0
		},
		use12Hours: {
			type: Boolean,
			required: false,
			default: void 0
		},
		hourStep: {
			required: false,
			default: void 0
		},
		minuteStep: {
			required: false,
			default: void 0
		},
		secondStep: {
			required: false,
			default: void 0
		},
		millisecondStep: {
			required: false,
			default: void 0
		},
		hideDisabledOptions: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultValue: {
			type: [Array, null],
			required: false,
			default: void 0
		},
		defaultOpenValue: {
			required: false,
			default: void 0
		},
		disabledHours: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledMinutes: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledSeconds: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledTime: {
			type: Function,
			required: false,
			default: void 0
		},
		changeOnScroll: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tabindex: {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		value: {
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
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
		},
		internalMode: {
			type: String,
			required: true,
			default: void 0
		},
		renderExtraFooter: {
			type: Function,
			required: false,
			default: void 0
		},
		showTime: {
			type: Object,
			required: false,
			default: void 0
		},
		invalid: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onSubmit: {
			type: Function,
			required: true,
			default: void 0
		},
		needConfirm: {
			type: Boolean,
			required: true,
			default: void 0
		},
		onNow: {
			type: Function,
			required: true,
			default: void 0
		}
	},
	name: "PopupPanel",
	inheritAttrs: false
});
export { PopupPanel_default as default };
