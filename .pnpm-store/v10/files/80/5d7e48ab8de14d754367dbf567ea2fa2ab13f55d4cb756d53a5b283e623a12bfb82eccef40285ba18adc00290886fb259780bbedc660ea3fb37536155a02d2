import { createVNode, defineComponent, shallowRef } from "vue";
import { classNames } from "@v-c/util";
const Arrow = /* @__PURE__ */ defineComponent({
	props: {
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		align: {
			type: Object,
			required: true,
			default: void 0
		},
		arrow: {
			type: Object,
			required: true,
			default: void 0
		},
		arrowPos: {
			type: Object,
			required: true,
			default: void 0
		}
	},
	name: "Arrow",
	setup(props, { expose }) {
		const arrowRef = shallowRef();
		expose({ arrowRef });
		return () => {
			const { prefixCls, align, arrow, arrowPos } = props;
			const { className, content, style } = arrow || {};
			const { x = 0, y = 0 } = arrowPos;
			if (!align || !align.points) return null;
			const alignStyle = { position: "absolute" };
			if (align.autoArrow !== false) {
				const popupPoints = align.points[0];
				const targetPoints = align.points[1];
				const popupTB = popupPoints[0];
				const popupLR = popupPoints[1];
				const targetTB = targetPoints[0];
				const targetLR = targetPoints[1];
				if (popupTB === targetTB || !["t", "b"].includes(popupTB)) alignStyle.top = `${y}px`;
				else if (popupTB === "t") alignStyle.top = 0;
				else alignStyle.bottom = 0;
				if (popupLR === targetLR || !["l", "r"].includes(popupLR)) alignStyle.left = `${x}px`;
				else if (popupLR === "l") alignStyle.left = 0;
				else alignStyle.right = 0;
			}
			return createVNode("div", {
				"ref": arrowRef,
				"class": classNames(`${prefixCls}-arrow`, className),
				"style": {
					...alignStyle,
					...style
				}
			}, [content]);
		};
	}
});
export { Arrow };
