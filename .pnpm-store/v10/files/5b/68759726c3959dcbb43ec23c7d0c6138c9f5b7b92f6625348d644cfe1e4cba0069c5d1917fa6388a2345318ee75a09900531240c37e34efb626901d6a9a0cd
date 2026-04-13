import { useInjectSlider } from "../context.js";
import { getIndex } from "../util.js";
import Track_default from "./Track.js";
import { Fragment, computed, createVNode, defineComponent } from "vue";
import { classNames } from "@v-c/util";
var Tracks_default = /* @__PURE__ */ defineComponent({
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
		const sliderContext = useInjectSlider();
		const trackList = computed(() => {
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
			const { classNames: classNames$1, styles } = sliderContext.value;
			return createVNode(Fragment, null, [trackList.value?.length && (classNames$1.tracks || styles.tracks) ? createVNode(Track_default, {
				"index": 0,
				"prefixCls": props.prefixCls,
				"start": trackList.value[0].start,
				"end": trackList.value[trackList.value.length - 1].end,
				"replaceCls": classNames(classNames$1.tracks, `${props.prefixCls}-tracks`),
				"style": styles.tracks
			}, null) : null, trackList.value.map(({ start, end }, index) => createVNode(Track_default, {
				"index": index,
				"prefixCls": props.prefixCls,
				"style": {
					...getIndex(props.trackStyle, index),
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
export { Tracks_default as default };
