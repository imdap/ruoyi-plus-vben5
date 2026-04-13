import { formatValue } from "../../utils/dateUtil.js";
import { providePanelContext, useInfo, useSharedPanelContext } from "../context.js";
import PanelHeader_default from "../PanelHeader.js";
import TimePanelBody_default from "./TimePanelBody/index.js";
import { computed, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
var TimePanel_default = /* @__PURE__ */ defineComponent((props) => {
	const sharedContext = useSharedPanelContext();
	providePanelContext(computed(() => {
		const [info] = useInfo(props, "time", sharedContext);
		return info;
	}));
	return () => {
		const { prefixCls, value, locale, generateConfig, showTime } = props;
		const format = typeof showTime === "object" && showTime && showTime.format ? showTime.format : locale?.fieldTimeFormat || "HH:mm:ss";
		const panelPrefixCls = `${prefixCls}-time-panel`;
		return createVNode("div", { "class": clsx(panelPrefixCls) }, [createVNode(PanelHeader_default, null, { default: () => [value ? formatValue(value, {
			locale,
			format,
			generateConfig
		}) : "\xA0"] }), createVNode(TimePanelBody_default, typeof showTime === "object" ? showTime : {}, null)]);
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
	name: "TimePanel",
	inheritAttrs: false
});
export { TimePanel_default as default };
