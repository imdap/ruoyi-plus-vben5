Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_context = require("../context.cjs");
const require_util = require("../util.cjs");
const require_Track = require("./Track.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
var Tracks = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "Tracks",
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		trackStyle: { type: [Object, Array] },
		values: {
			type: Array,
			required: true
		},
		onStartMove: { type: Function },
		startPoint: { type: Number }
	},
	setup(props) {
		const sliderContext = require_context.useInjectSlider();
		const trackList = (0, vue.computed)(() => {
			const range = sliderContext.value.range;
			const min = sliderContext.value.min;
			if (!range) {
				if (props.values.length === 0) return [];
				const startValue = props.startPoint ?? min;
				const endValue = props.values[0];
				return [{
					start: Math.min(startValue, endValue),
					end: Math.max(startValue, endValue)
				}];
			}
			const list = [];
			for (let i = 0; i < props.values.length - 1; i += 1) list.push({
				start: props.values[i],
				end: props.values[i + 1]
			});
			return list;
		});
		return () => {
			if (!sliderContext.value.included) return null;
			const { classNames, styles } = sliderContext.value;
			return (0, vue.createVNode)(vue.Fragment, null, [trackList.value?.length && (classNames.tracks || styles.tracks) ? (0, vue.createVNode)(require_Track.default, {
				"index": 0,
				"prefixCls": props.prefixCls,
				"start": trackList.value[0].start,
				"end": trackList.value[trackList.value.length - 1].end,
				"replaceCls": (0, _v_c_util.classNames)(classNames.tracks, `${props.prefixCls}-tracks`),
				"style": styles.tracks
			}, null) : null, trackList.value.map(({ start, end }, index) => (0, vue.createVNode)(require_Track.default, {
				"index": index,
				"prefixCls": props.prefixCls,
				"style": {
					...require_util.getIndex(props.trackStyle, index),
					...styles?.track
				},
				"start": start,
				"end": end,
				"key": index,
				"onStartMove": props.onStartMove
			}, null))]);
		};
	}
});
var Tracks_default = Tracks;
exports.default = Tracks_default;
