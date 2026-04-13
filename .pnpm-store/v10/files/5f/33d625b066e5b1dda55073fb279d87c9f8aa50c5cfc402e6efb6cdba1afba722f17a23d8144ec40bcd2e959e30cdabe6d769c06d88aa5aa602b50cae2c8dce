import { TIME } from "./constant.js";
import { Fragment, createVNode, defineComponent } from "vue";
import { CalendarOutlined, ClockCircleOutlined } from "@antdv-next/icons";

//#region src/date-picker/generatePicker/SuffixIcon.tsx
const SuffixIcon = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { picker, hasFeedback, feedbackIcon, suffixIcon } = props;
		if (suffixIcon === null || suffixIcon === false) return null;
		if (suffixIcon === true || suffixIcon === void 0) return createVNode(Fragment, null, [picker === TIME ? createVNode(ClockCircleOutlined, null, null) : createVNode(CalendarOutlined, null, null), hasFeedback ? feedbackIcon : null]);
		return suffixIcon;
	};
}, {
	props: {
		picker: {
			type: String,
			required: false
		},
		hasFeedback: {
			type: Boolean,
			required: false,
			default: void 0
		},
		feedbackIcon: {
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
		suffixIcon: {
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
		}
	},
	name: "APickerSuffixIcon"
});
var SuffixIcon_default = SuffixIcon;

//#endregion
export { SuffixIcon_default as default };