import { cloneElement } from "../_util/vueNode.js";
import Statistic_default from "./Statistic.js";
import { formatCounter } from "./utils.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, onMounted, shallowRef, watch } from "vue";
import raf from "@v-c/util/dist/raf";
import { omit } from "es-toolkit";

//#region src/statistic/Timer.tsx
function getTime(value) {
	return new Date(value).getTime();
}
const StatisticTimer = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	const down = computed(() => props.type === "countdown");
	const showTime = shallowRef(null);
	const update = () => {
		const { value } = props;
		const now = Date.now();
		const timestamp = getTime(value);
		showTime.value = {};
		emit("change", !down.value ? now - timestamp : timestamp - now);
		if (down.value && timestamp < now) {
			emit("finish");
			return false;
		}
		return true;
	};
	watch([() => props.value, down], (_n, _o, onCleanup) => {
		let refId;
		const clear = () => raf.cancel(refId);
		const rafUpdate = () => {
			refId = raf(() => {
				if (update()) rafUpdate();
			});
		};
		rafUpdate();
		onCleanup(clear);
	}, { immediate: true });
	onMounted(() => {
		showTime.value = {};
	});
	const formatter = (formatValue, config) => showTime.value ? formatCounter(formatValue, {
		...config,
		format: props.format
	}, down.value) : "-";
	const valueRender = (node) => cloneElement(node, { title: void 0 });
	return () => {
		return createVNode(Statistic_default, mergeProps(attrs, omit(props, [
			"value",
			"format",
			"type"
		]), {
			"value": props.value,
			"valueRender": valueRender,
			"formatter": formatter
		}), slots);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		formatter: {
			type: [
				Boolean,
				String,
				Function
			],
			required: false,
			default: void 0
		},
		decimalSeparator: {
			type: String,
			required: false
		},
		groupSeparator: {
			type: String,
			required: false
		},
		precision: {
			type: Number,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		value: {
			type: [Number, String],
			required: false
		},
		valueStyle: {
			type: Object,
			required: false
		},
		valueRender: {
			type: Function,
			required: false
		},
		title: {
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
		prefix: {
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
		suffix: {
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
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		type: {
			type: String,
			required: true
		},
		format: {
			type: String,
			required: false
		}
	}, {
		value: 0,
		decimalSeparator: ".",
		groupSeparator: ",",
		loading: false,
		format: "HH:mm:ss",
		title: void 0,
		suffix: void 0,
		prefix: void 0
	}),
	emits: ["finish", "change"],
	name: "AStatisticTimer",
	inheritAttrs: false
});
var Timer_default = StatisticTimer;

//#endregion
export { Timer_default as default };