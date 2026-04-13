import { DEFAULT_BACKGROUND_COLOR, DEFAULT_FRONT_COLOR, DEFAULT_LEVEL, DEFAULT_MINVERSION, DEFAULT_NEED_MARGIN, DEFAULT_SIZE, excavateModules, generatePath } from "./utils.js";
import { useQRCode } from "./hooks/useQRCode.js";
import { defaults } from "./interface.js";
import { computed, createVNode, defineComponent, mergeDefaults, shallowRef, watchEffect } from "vue";
const QRCodeSVG = /* @__PURE__ */ defineComponent({
	props: /* @__PURE__ */ mergeDefaults({
		value: {
			type: [String, Array],
			required: true,
			default: void 0
		},
		boostLevel: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: Number,
			required: false,
			default: void 0
		},
		level: {
			type: String,
			required: false,
			default: void 0
		},
		bgColor: {
			type: String,
			required: false,
			default: void 0
		},
		fgColor: {
			type: String,
			required: false,
			default: void 0
		},
		includeMargin: {
			type: Boolean,
			required: false,
			default: void 0
		},
		marginSize: {
			type: Number,
			required: false,
			default: void 0
		},
		imageSettings: {
			type: Object,
			required: false,
			default: void 0
		},
		title: {
			type: String,
			required: false,
			default: void 0
		},
		minVersion: {
			type: Number,
			required: false,
			default: void 0
		}
	}, defaults),
	name: "QRCodeSVG",
	inheritAttrs: false,
	setup(props) {
		const image = shallowRef(null);
		const fgPath = shallowRef("");
		const numCells = shallowRef(0);
		const qrcode = useQRCode(computed(() => {
			const { value, level = "L", includeMargin = false, minVersion = 1, marginSize, imageSettings, size = 128, boostLevel } = props;
			return {
				value,
				level,
				minVersion,
				includeMargin,
				marginSize,
				imageSettings,
				size,
				boostLevel
			};
		}));
		watchEffect(() => {
			const { imageSettings } = props;
			const { margin, cells, numCells: getNumCells, calculatedImageSettings } = qrcode.value;
			let cellsToDraw = cells;
			numCells.value = getNumCells;
			if (imageSettings != null && calculatedImageSettings != null) {
				if (calculatedImageSettings.excavation != null) cellsToDraw = excavateModules(cells, calculatedImageSettings.excavation);
				image.value = createVNode("image", {
					"href": imageSettings.src,
					"height": calculatedImageSettings.h,
					"width": calculatedImageSettings.w,
					"x": calculatedImageSettings.x + margin,
					"y": calculatedImageSettings.y + margin,
					"preserveAspectRatio": "none",
					"opacity": calculatedImageSettings.opacity,
					"crossOrigin": calculatedImageSettings?.crossOrigin
				}, null);
			}
			fgPath.value = generatePath(cellsToDraw, margin);
		});
		return () => {
			const { bgColor = DEFAULT_BACKGROUND_COLOR, fgColor = DEFAULT_FRONT_COLOR, size, title } = props;
			return createVNode("svg", {
				"height": size,
				"width": size,
				"viewBox": `0 0 ${numCells.value} ${numCells.value}`,
				"role": "img"
			}, [
				!!title && createVNode("title", null, [title]),
				createVNode("path", {
					"fill": bgColor,
					"d": `M0,0 h${numCells.value}v${numCells.value}H0z`,
					"shape-rendering": "crispEdges"
				}, null),
				createVNode("path", {
					"fill": fgColor,
					"d": fgPath.value,
					"shape-rendering": "crispEdges"
				}, null),
				image.value
			]);
		};
	}
});
export { QRCodeSVG };
