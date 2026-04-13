Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_utils = require("./utils.cjs");
const require_useQRCode = require("./hooks/useQRCode.cjs");
const require_interface = require("./interface.cjs");
let vue = require("vue");
const QRCodeSVG = /* @__PURE__ */ (0, vue.defineComponent)({
	props: /* @__PURE__ */ (0, vue.mergeDefaults)({
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
	}, require_interface.defaults),
	name: "QRCodeSVG",
	inheritAttrs: false,
	setup(props) {
		const image = (0, vue.shallowRef)(null);
		const fgPath = (0, vue.shallowRef)("");
		const numCells = (0, vue.shallowRef)(0);
		const qrcode = require_useQRCode.useQRCode((0, vue.computed)(() => {
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
		(0, vue.watchEffect)(() => {
			const { imageSettings } = props;
			const { margin, cells, numCells: getNumCells, calculatedImageSettings } = qrcode.value;
			let cellsToDraw = cells;
			numCells.value = getNumCells;
			if (imageSettings != null && calculatedImageSettings != null) {
				if (calculatedImageSettings.excavation != null) cellsToDraw = require_utils.excavateModules(cells, calculatedImageSettings.excavation);
				image.value = (0, vue.createVNode)("image", {
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
			fgPath.value = require_utils.generatePath(cellsToDraw, margin);
		});
		return () => {
			const { bgColor = require_utils.DEFAULT_BACKGROUND_COLOR, fgColor = require_utils.DEFAULT_FRONT_COLOR, size, title } = props;
			return (0, vue.createVNode)("svg", {
				"height": size,
				"width": size,
				"viewBox": `0 0 ${numCells.value} ${numCells.value}`,
				"role": "img"
			}, [
				!!title && (0, vue.createVNode)("title", null, [title]),
				(0, vue.createVNode)("path", {
					"fill": bgColor,
					"d": `M0,0 h${numCells.value}v${numCells.value}H0z`,
					"shape-rendering": "crispEdges"
				}, null),
				(0, vue.createVNode)("path", {
					"fill": fgColor,
					"d": fgPath.value,
					"shape-rendering": "crispEdges"
				}, null),
				image.value
			]);
		};
	}
});
exports.QRCodeSVG = QRCodeSVG;
