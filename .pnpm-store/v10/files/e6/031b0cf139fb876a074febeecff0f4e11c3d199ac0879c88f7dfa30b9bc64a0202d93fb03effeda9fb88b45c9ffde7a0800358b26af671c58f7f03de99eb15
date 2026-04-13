import { createVNode, defineComponent, onUnmounted, ref } from "vue";
import { classNames } from "@v-c/util";
import raf from "@v-c/util/dist/raf";
import { filterEmpty } from "@v-c/util/dist/props-util";
var STEP_INTERVAL = 200;
var STEP_DELAY = 600;
var StepHandler_default = /* @__PURE__ */ defineComponent({
	name: "StepHandler",
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		action: {
			type: String,
			required: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		className: String,
		style: Object,
		onStep: {
			type: Function,
			required: true
		}
	},
	slots: Object,
	emits: ["step"],
	setup(props, { slots, emit }) {
		const stepTimeoutRef = ref(null);
		const frameIds = ref([]);
		const onStopStep = () => {
			clearTimeout(stepTimeoutRef.value);
		};
		const onStepMouseDown = (e, up) => {
			e.preventDefault();
			onStopStep();
			emit("step", up, "handler");
			function loopStep() {
				emit("step", up, "handler");
				stepTimeoutRef.value = setTimeout(loopStep, STEP_INTERVAL);
			}
			stepTimeoutRef.value = setTimeout(loopStep, STEP_DELAY);
		};
		onUnmounted(() => {
			onStopStep();
			frameIds.value.forEach((id) => raf.cancel(id));
		});
		return () => {
			const { prefixCls, action, disabled, className, style } = props;
			const isUpAction = action === "up";
			const actionClassName = `${prefixCls}-action`;
			const mergedClassName = classNames(actionClassName, `${actionClassName}-${action}`, { [`${actionClassName}-${action}-disabled`]: disabled }, className);
			const safeOnStopStep = () => frameIds.value.push(raf(onStopStep));
			const children = filterEmpty(slots?.default?.());
			return createVNode("span", {
				"unselectable": "on",
				"role": "button",
				"onMouseup": safeOnStopStep,
				"onMouseleave": safeOnStopStep,
				"onMousedown": (e) => onStepMouseDown(e, isUpAction),
				"aria-label": isUpAction ? "Increase Value" : "Decrease Value",
				"aria-disabled": disabled,
				"class": mergedClassName,
				"style": style
			}, [children.length > 0 ? children : createVNode("span", {
				"unselectable": "on",
				"class": `${prefixCls}-action-${action}-inner`
			}, null)]);
		};
	}
});
export { StepHandler_default as default };
