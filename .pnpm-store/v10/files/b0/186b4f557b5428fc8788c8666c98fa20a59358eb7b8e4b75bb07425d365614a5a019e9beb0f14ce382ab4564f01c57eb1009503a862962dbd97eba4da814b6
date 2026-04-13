import { useInjectSlider } from "../context.js";
import { getOffset } from "../util.js";
import { createVNode, defineComponent } from "vue";
import { classNames } from "@v-c/util";
var Track_default = /* @__PURE__ */ defineComponent({
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
		const sliderContext = useInjectSlider();
		const onInternalStartMove = (e) => {
			if (!sliderContext.value.disabled && props.onStartMove) props.onStartMove(e, -1);
		};
		return () => {
			const { prefixCls, index, onStartMove, replaceCls, start, end } = props;
			const { direction, min, max, range, classNames: classNames$1 } = sliderContext.value;
			const offsetStart = getOffset(start, min, max);
			const offsetEnd = getOffset(end, min, max);
			const trackPrefixCls = `${prefixCls}-track`;
			const className = replaceCls || classNames(trackPrefixCls, {
				[`${trackPrefixCls}-${index + 1}`]: index !== null && range,
				[`${prefixCls}-track-draggable`]: onStartMove
			}, classNames$1.track);
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
			return createVNode("div", {
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
export { Track_default as default };
