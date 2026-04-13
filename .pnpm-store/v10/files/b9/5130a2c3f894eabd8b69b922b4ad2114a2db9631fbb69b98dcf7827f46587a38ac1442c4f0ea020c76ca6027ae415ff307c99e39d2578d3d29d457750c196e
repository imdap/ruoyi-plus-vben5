import { fillTime } from "../../utils/dateUtil.js";
import useTimeInfo from "../../hooks/useTimeInfo.js";
import DatePanel_default from "../DatePanel/index.js";
import TimePanel_default from "../TimePanel/index.js";
import { computed, createVNode, defineComponent } from "vue";
import { omit } from "@v-c/util";
var DateTimePanel_default = /* @__PURE__ */ defineComponent((props) => {
	const [getValidTime] = useTimeInfo(computed(() => props.generateConfig), computed(() => typeof props.showTime === "object" ? props.showTime : {}));
	return () => {
		const { prefixCls, generateConfig, onSelect, value, pickerValue, onHover } = props;
		const panelPrefixCls = `${prefixCls}-datetime-panel`;
		const mergeTime = (date) => {
			if (value) return fillTime(generateConfig, date, value);
			return fillTime(generateConfig, date, pickerValue);
		};
		const onDateHover = (date) => {
			onHover?.(date ? mergeTime(date) : date);
		};
		const onDateSelect = (date) => {
			const cloneDate = mergeTime(date);
			onSelect?.(getValidTime(cloneDate, cloneDate));
		};
		const datePanelProps = {
			...omit(props, ["onSelect", "onHover"]),
			onSelect: onDateSelect,
			onHover: onDateHover
		};
		return createVNode("div", { "class": panelPrefixCls }, [createVNode(DatePanel_default, datePanelProps, null), createVNode(TimePanel_default, props, null)]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true,
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
		pickerValue: {
			required: true,
			default: void 0
		},
		onPickerValueChange: {
			type: Function,
			required: true,
			default: void 0
		},
		value: {
			required: false,
			default: void 0
		},
		onSelect: {
			type: Function,
			required: true,
			default: void 0
		},
		values: {
			type: Array,
			required: false,
			default: void 0
		},
		onModeChange: {
			type: Function,
			required: true,
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
		cellRender: {
			type: Function,
			required: false,
			default: void 0
		},
		hoverRangeValue: {
			type: [Array, null],
			required: true,
			default: void 0
		},
		hoverValue: {
			type: [Array, null],
			required: false,
			default: void 0
		},
		onHover: {
			type: Function,
			required: false,
			default: void 0
		},
		showTime: {
			type: Object,
			required: false,
			default: void 0
		},
		showWeek: {
			type: Boolean,
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
		}
	},
	name: "DateTimePanel",
	inheritAttrs: false
});
export { DateTimePanel_default as default };
