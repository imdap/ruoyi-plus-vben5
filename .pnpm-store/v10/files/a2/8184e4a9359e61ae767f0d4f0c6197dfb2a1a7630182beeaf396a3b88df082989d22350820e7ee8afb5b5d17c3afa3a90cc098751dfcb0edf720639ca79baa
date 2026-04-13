Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require_utils = require("./utils.cjs");
const require_useQRCode = require("./hooks/useQRCode.cjs");
const require_interface = require("./interface.cjs");
let vue = require("vue");
const QRCodeCanvas = /* @__PURE__ */ (0, vue.defineComponent)({
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
	name: "QRCodeCanvas",
	inheritAttrs: false,
	setup(props, { attrs, expose }) {
		const imgSrc = (0, vue.computed)(() => props.imageSettings?.src);
		const _canvas = (0, vue.shallowRef)(null);
		const _image = (0, vue.shallowRef)(null);
		const isImgLoaded = (0, vue.shallowRef)(false);
		const calculated = (0, vue.shallowRef)();
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
		let img = null;
		(0, vue.watchEffect)(() => {
			const { size = 128, bgColor = require_utils.DEFAULT_BACKGROUND_COLOR, fgColor = require_utils.DEFAULT_FRONT_COLOR } = props;
			const { margin, cells, numCells, calculatedImageSettings } = qrcode.value;
			if (_canvas.value != null) {
				const canvas = _canvas.value;
				const ctx = canvas.getContext("2d");
				if (!ctx) return;
				let cellsToDraw = cells;
				const image = _image.value;
				const haveImageToRender = isImgLoaded.value && calculatedImageSettings != null && image !== null && image.complete && image.naturalHeight !== 0 && image.naturalWidth !== 0;
				if (haveImageToRender) {
					if (calculatedImageSettings.excavation != null) cellsToDraw = require_utils.excavateModules(cells, calculatedImageSettings.excavation);
				}
				const pixelRatio = window.devicePixelRatio || 1;
				canvas.height = canvas.width = size * pixelRatio;
				const scale = size / numCells * pixelRatio;
				ctx.scale(scale, scale);
				ctx.fillStyle = bgColor;
				ctx.fillRect(0, 0, numCells, numCells);
				ctx.fillStyle = fgColor;
				if (require_utils.isSupportPath2d) ctx.fill(new Path2D(require_utils.generatePath(cellsToDraw, margin)));
				else cells.forEach((row, rdx) => {
					row.forEach((cell, cdx) => {
						if (cell) ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
					});
				});
				if (calculatedImageSettings) ctx.globalAlpha = calculatedImageSettings.opacity;
				if (haveImageToRender) ctx.drawImage(image, calculatedImageSettings.x + margin, calculatedImageSettings.y + margin, calculatedImageSettings.w, calculatedImageSettings.h);
				calculated.value = calculatedImageSettings;
			}
		}, { flush: "post" });
		(0, vue.watch)(imgSrc, () => {
			isImgLoaded.value = false;
		});
		expose({ toDataURL: (type, quality) => {
			return _canvas.value?.toDataURL(type, quality);
		} });
		return () => {
			const { size = 128, title } = props;
			const canvasStyle = {
				height: `${size}px`,
				width: `${size}px`
			};
			if (imgSrc.value != null) img = (0, vue.createVNode)("img", {
				"src": imgSrc.value,
				"key": imgSrc.value,
				"style": { display: "none" },
				"onLoad": () => {
					isImgLoaded.value = true;
				},
				"ref": _image,
				"crossorigin": calculated.value?.crossOrigin,
				"alt": "QR-Code"
			}, null);
			return (0, vue.createVNode)(vue.Fragment, null, [(0, vue.createVNode)("canvas", (0, vue.mergeProps)(attrs, {
				"style": [canvasStyle, attrs.style],
				"ref": _canvas,
				"role": "img",
				"title": title,
				"height": size,
				"width": size
			}), null), img]);
		};
	}
});
exports.QRCodeCanvas = QRCodeCanvas;
