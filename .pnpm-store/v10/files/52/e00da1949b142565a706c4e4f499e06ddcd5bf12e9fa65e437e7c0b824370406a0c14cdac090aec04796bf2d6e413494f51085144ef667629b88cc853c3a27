import { DEFAULT_BACKGROUND_COLOR, DEFAULT_FRONT_COLOR, DEFAULT_LEVEL, DEFAULT_MINVERSION, DEFAULT_NEED_MARGIN, DEFAULT_SIZE, excavateModules, generatePath, isSupportPath2d } from "./utils.js";
import { useQRCode } from "./hooks/useQRCode.js";
import { defaults } from "./interface.js";
import { Fragment, computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch, watchEffect } from "vue";
const QRCodeCanvas = /* @__PURE__ */ defineComponent({
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
	name: "QRCodeCanvas",
	inheritAttrs: false,
	setup(props, { attrs, expose }) {
		const imgSrc = computed(() => props.imageSettings?.src);
		const _canvas = shallowRef(null);
		const _image = shallowRef(null);
		const isImgLoaded = shallowRef(false);
		const calculated = shallowRef();
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
		let img = null;
		watchEffect(() => {
			const { size = 128, bgColor = DEFAULT_BACKGROUND_COLOR, fgColor = DEFAULT_FRONT_COLOR } = props;
			const { margin, cells, numCells, calculatedImageSettings } = qrcode.value;
			if (_canvas.value != null) {
				const canvas = _canvas.value;
				const ctx = canvas.getContext("2d");
				if (!ctx) return;
				let cellsToDraw = cells;
				const image = _image.value;
				const haveImageToRender = isImgLoaded.value && calculatedImageSettings != null && image !== null && image.complete && image.naturalHeight !== 0 && image.naturalWidth !== 0;
				if (haveImageToRender) {
					if (calculatedImageSettings.excavation != null) cellsToDraw = excavateModules(cells, calculatedImageSettings.excavation);
				}
				const pixelRatio = window.devicePixelRatio || 1;
				canvas.height = canvas.width = size * pixelRatio;
				const scale = size / numCells * pixelRatio;
				ctx.scale(scale, scale);
				ctx.fillStyle = bgColor;
				ctx.fillRect(0, 0, numCells, numCells);
				ctx.fillStyle = fgColor;
				if (isSupportPath2d) ctx.fill(new Path2D(generatePath(cellsToDraw, margin)));
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
		watch(imgSrc, () => {
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
			if (imgSrc.value != null) img = createVNode("img", {
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
			return createVNode(Fragment, null, [createVNode("canvas", mergeProps(attrs, {
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
export { QRCodeCanvas };
