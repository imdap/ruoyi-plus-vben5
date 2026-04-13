import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
import Overflow from "@v-c/overflow";
var MultipleDates_default = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls, value, onRemove, removeIcon = "×", formatDate, disabled, maxTagCount, placeholder } = props;
		const selectorCls = `${prefixCls}-selector`;
		const selectionCls = `${prefixCls}-selection`;
		const overflowCls = `${selectionCls}-overflow`;
		function renderSelector(content, onClose) {
			return createVNode("span", {
				"class": clsx(`${selectionCls}-item`),
				"title": typeof content === "string" ? content : void 0
			}, [createVNode("span", { "class": `${selectionCls}-item-content` }, [content]), !disabled && onClose && createVNode("span", {
				"onMousedown": (e) => {
					e.preventDefault();
				},
				"onClick": onClose,
				"class": `${selectionCls}-item-remove`
			}, [removeIcon])]);
		}
		function renderItem(date) {
			const displayLabel = formatDate(date);
			const onClose = (event) => {
				if (event) event.stopPropagation();
				onRemove(date);
			};
			return renderSelector(displayLabel, onClose);
		}
		function renderRest(omittedValues) {
			return renderSelector(`+ ${omittedValues.length} ...`);
		}
		return createVNode("div", { "class": selectorCls }, [createVNode(Overflow, {
			"prefixCls": overflowCls,
			"data": value,
			"renderItem": renderItem,
			"renderRest": renderRest,
			"itemKey": (date) => formatDate(date),
			"maxCount": maxTagCount
		}, null), !value.length && createVNode("span", { "class": `${prefixCls}-selection-placeholder` }, [placeholder])]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		value: {
			type: Array,
			required: true,
			default: void 0
		},
		onRemove: {
			type: Function,
			required: true,
			default: void 0
		},
		removeIcon: {
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
		formatDate: {
			type: Function,
			required: true,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
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
		maxTagCount: {
			type: [Number, String],
			required: false,
			default: void 0
		}
	},
	name: "MultipleDates"
});
export { MultipleDates_default as default };
