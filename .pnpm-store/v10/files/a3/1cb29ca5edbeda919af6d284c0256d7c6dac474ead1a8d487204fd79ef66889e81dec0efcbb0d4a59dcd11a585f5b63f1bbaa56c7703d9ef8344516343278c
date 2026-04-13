Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_context = require("../context.cjs");
const require_util = require("../util.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
var Track = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "Track",
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		replaceCls: { type: String },
		start: {
			type: Number,
			required: true
		},
		end: {
			type: Number,
			required: true
		},
		index: {
			type: Number,
			default: () => null
		},
		onStartMove: { type: Function }
	},
	setup(props, { attrs }) {
		const sliderContext = require_context.useInjectSlider();
		const onInternalStartMove = (e) => {
			if (!sliderContext.value.disabled && props.onStartMove) props.onStartMove(e, -1);
		};
		return () => {
			const { prefixCls, index, onStartMove, replaceCls, start, end } = props;
			const { direction, min, max, range, classNames } = sliderContext.value;
			const offsetStart = require_util.getOffset(start, min, max);
			const offsetEnd = require_util.getOffset(end, min, max);
			const trackPrefixCls = `${prefixCls}-track`;
			const className = replaceCls || (0, _v_c_util.classNames)(trackPrefixCls, {
				[`${trackPrefixCls}-${index + 1}`]: index !== null && range,
				[`${prefixCls}-track-draggable`]: onStartMove
			}, classNames.track);
			const positionStyle = {};
			switch (direction) {
				case "rtl":
					positionStyle.right = `${offsetStart * 100}%`;
					positionStyle.width = `${offsetEnd * 100 - offsetStart * 100}%`;
					break;
				case "btt":
					positionStyle.bottom = `${offsetStart * 100}%`;
					positionStyle.height = `${offsetEnd * 100 - offsetStart * 100}%`;
					break;
				case "ttb":
					positionStyle.top = `${offsetStart * 100}%`;
					positionStyle.height = `${offsetEnd * 100 - offsetStart * 100}%`;
					break;
				default:
					positionStyle.left = `${offsetStart * 100}%`;
					positionStyle.width = `${offsetEnd * 100 - offsetStart * 100}%`;
			}
			return (0, vue.createVNode)("div", {
				"class": className,
				"style": {
					...positionStyle,
					...attrs.style
				},
				"onMousedown": onStartMove ? onInternalStartMove : void 0
			}, null);
		};
	}
});
var Track_default = Track;
exports.default = Track_default;
