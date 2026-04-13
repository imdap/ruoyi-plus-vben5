Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_util = require("../util.cjs");
const require_Handle = require("./Handle.cjs");
let vue = require("vue");
var Handles_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "Handles",
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		values: {
			type: Array,
			required: true
		},
		handleStyle: { type: [Object, Array] },
		onStartMove: {
			type: Function,
			required: true
		},
		onOffsetChange: {
			type: Function,
			required: true
		},
		onFocus: { type: Function },
		onBlur: { type: Function },
		onDelete: {
			type: Function,
			required: true
		},
		handleRender: { type: Function },
		activeHandleRender: { type: Function },
		draggingIndex: {
			type: Number,
			default: -1
		},
		draggingDelete: {
			type: Boolean,
			default: false
		},
		onChangeComplete: Function
	},
	emits: ["focus"],
	slots: Object,
	setup(props, { emit, expose }) {
		const handleRefs = (0, vue.shallowRef)({});
		const activeVisible = (0, vue.ref)(false);
		const activeIndex = (0, vue.ref)(-1);
		const onActive = (index) => {
			activeIndex.value = index;
			activeVisible.value = true;
		};
		const onHandleFocus = (e, index) => {
			onActive(index);
			emit("focus", e);
		};
		const onHandleMouseEnter = (_e, index) => {
			onActive(index);
		};
		const setHandleRef = (index, node) => {
			if (!node) delete handleRefs.value[index];
			else handleRefs.value[index] = node;
		};
		expose({
			focus: (index) => {
				handleRefs.value[index]?.focus?.();
			},
			hideHelp: () => {
				activeVisible.value = false;
			}
		});
		return () => {
			const { prefixCls, onStartMove, onOffsetChange, values, handleRender, activeHandleRender, draggingIndex, draggingDelete, onFocus, onBlur, handleStyle, ...restProps } = props;
			const handleProps = {
				prefixCls,
				onStartMove,
				onOffsetChange,
				render: handleRender,
				onFocus: onHandleFocus,
				onMouseenter: onHandleMouseEnter,
				onBlur,
				...restProps
			};
			return (0, vue.createVNode)(vue.Fragment, null, [values?.map((value, index) => {
				const dragging = draggingIndex === index;
				return (0, vue.createVNode)(require_Handle.default, (0, vue.mergeProps)({
					"ref": (node) => setHandleRef(index, node),
					"dragging": dragging,
					"draggingDelete": dragging && draggingDelete,
					"style": require_util.getIndex(handleStyle, index),
					"key": index,
					"value": value,
					"valueIndex": index
				}, handleProps), null);
			}), activeHandleRender && activeVisible.value && (0, vue.createVNode)(require_Handle.default, (0, vue.mergeProps)({ "key": "a11y" }, handleProps, {
				"value": values[activeIndex.value],
				"valueIndex": null,
				"dragging": draggingIndex !== -1,
				"draggingDelete": draggingDelete,
				"render": activeHandleRender,
				"style": { pointerEvents: "none" },
				"aria-hidden": true
			}), null)]);
		};
	}
});
exports.default = Handles_default;
