import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
//#region src/Preview/Footer.tsx
var Footer = /* @__PURE__ */ defineComponent((props) => {
	const renderOperation = ({ type, disabled, onClick, icon }) => {
		const actionCls = `${props.prefixCls}-actions-action`;
		return createVNode("button", {
			"type": "button",
			"key": type,
			"class": clsx(actionCls, `${actionCls}-${type}`, { [`${actionCls}-disabled`]: !!disabled }),
			"onClick": () => {
				if (!disabled) onClick();
			},
			"disabled": !!disabled,
			"aria-label": type
		}, [icon]);
	};
	return () => {
		const { prefixCls, showProgress, current, count, showSwitch, classNames, styles, icons, image, transform, countRender, actionsRender, scale, minScale, maxScale, onActive, onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onClose, onReset } = props;
		const progressNode = showProgress && createVNode("div", { "class": `${prefixCls}-progress` }, [countRender ? countRender(current + 1, count) : createVNode("bdi", null, [`${current + 1} / ${count}`])]);
		const switchPrevNode = showSwitch ? renderOperation({
			icon: icons?.prev ?? icons?.left,
			onClick: () => onActive(-1),
			type: "prev",
			disabled: current === 0
		}) : void 0;
		const switchNextNode = showSwitch ? renderOperation({
			icon: icons?.next ?? icons?.right,
			onClick: () => onActive(1),
			type: "next",
			disabled: current === count - 1
		}) : void 0;
		const flipYNode = renderOperation({
			icon: icons?.flipY,
			onClick: onFlipY,
			type: "flipY"
		});
		const flipXNode = renderOperation({
			icon: icons?.flipX,
			onClick: onFlipX,
			type: "flipX"
		});
		const rotateLeftNode = renderOperation({
			icon: icons?.rotateLeft,
			onClick: onRotateLeft,
			type: "rotateLeft"
		});
		const rotateRightNode = renderOperation({
			icon: icons?.rotateRight,
			onClick: onRotateRight,
			type: "rotateRight"
		});
		const zoomOutNode = renderOperation({
			icon: icons?.zoomOut,
			onClick: onZoomOut,
			type: "zoomOut",
			disabled: scale <= minScale
		});
		const zoomInNode = renderOperation({
			icon: icons?.zoomIn,
			onClick: onZoomIn,
			type: "zoomIn",
			disabled: scale === maxScale
		});
		const actionsNode = createVNode("div", {
			"class": clsx(`${prefixCls}-actions`, classNames.actions),
			"style": styles.actions
		}, [
			flipYNode,
			flipXNode,
			rotateLeftNode,
			rotateRightNode,
			zoomOutNode,
			zoomInNode
		]);
		const renderNode = actionsRender ? actionsRender(actionsNode, {
			icons: {
				prevIcon: switchPrevNode,
				nextIcon: switchNextNode,
				flipYIcon: flipYNode,
				flipXIcon: flipXNode,
				rotateLeftIcon: rotateLeftNode,
				rotateRightIcon: rotateRightNode,
				zoomOutIcon: zoomOutNode,
				zoomInIcon: zoomInNode
			},
			actions: {
				onActive,
				onFlipY,
				onFlipX,
				onRotateLeft,
				onRotateRight,
				onZoomOut,
				onZoomIn,
				onReset,
				onClose
			},
			transform,
			current,
			total: count,
			image
		}) : actionsNode;
		return createVNode("div", {
			"class": clsx(`${prefixCls}-footer`, classNames.footer),
			"style": styles.footer
		}, [progressNode, renderNode]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		showProgress: {
			type: Boolean,
			required: true
		},
		countRender: {
			type: Function,
			required: false,
			default: void 0
		},
		actionsRender: {
			type: Function,
			required: false,
			default: void 0
		},
		current: {
			type: Number,
			required: true
		},
		count: {
			type: Number,
			required: true
		},
		showSwitch: {
			type: Boolean,
			required: true
		},
		icons: { required: true },
		scale: {
			type: Number,
			required: true
		},
		minScale: {
			type: Number,
			required: true
		},
		maxScale: {
			type: Number,
			required: true
		},
		image: {
			type: Object,
			required: true
		},
		transform: {
			type: Object,
			required: true
		},
		classNames: {
			type: Object,
			required: true
		},
		styles: {
			type: Object,
			required: true
		},
		onActive: {
			type: Function,
			required: true
		},
		onFlipY: {
			type: Function,
			required: true
		},
		onFlipX: {
			type: Function,
			required: true
		},
		onRotateLeft: {
			type: Function,
			required: true
		},
		onRotateRight: {
			type: Function,
			required: true
		},
		onZoomOut: {
			type: Function,
			required: true
		},
		onZoomIn: {
			type: Function,
			required: true
		},
		onClose: {
			type: Function,
			required: true
		},
		onReset: {
			type: Function,
			required: true
		}
	},
	name: "ImagePreviewFooter"
});
//#endregion
export { Footer as default };
