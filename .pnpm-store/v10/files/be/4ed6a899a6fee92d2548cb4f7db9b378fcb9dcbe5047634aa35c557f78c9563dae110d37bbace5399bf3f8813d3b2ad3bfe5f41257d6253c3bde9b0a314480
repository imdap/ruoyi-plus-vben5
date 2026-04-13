import { createVNode } from "vue";

//#region src/tree/utils/dropIndicator.tsx
const offset = 4;
function dropIndicatorRender(props) {
	const { dropPosition, dropLevelOffset, prefixCls, indent, direction = "ltr" } = props;
	const startPosition = direction === "ltr" ? "left" : "right";
	const endPosition = direction === "ltr" ? "right" : "left";
	const style = {
		[startPosition]: `${-dropLevelOffset * indent + offset}px`,
		[endPosition]: 0
	};
	switch (dropPosition) {
		case -1:
			style.top = `-3px`;
			break;
		case 1:
			style.bottom = `-3px`;
			break;
		default:
			style.bottom = `-3px`;
			style[startPosition] = `${indent + offset}px`;
			break;
	}
	return createVNode("div", {
		"style": style,
		"class": `${prefixCls}-drop-indicator`
	}, null);
}
var dropIndicator_default = dropIndicatorRender;

//#endregion
export { dropIndicator_default as default, offset };