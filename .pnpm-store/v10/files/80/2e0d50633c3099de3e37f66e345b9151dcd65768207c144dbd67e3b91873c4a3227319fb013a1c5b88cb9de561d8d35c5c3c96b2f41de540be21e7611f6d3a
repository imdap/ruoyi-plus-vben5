import { getSlotPropsFnRun } from "../../_util/tools.js";
import { getTextNodeArr } from "../../_util/vueNode.js";
import toList_default from "../../_util/toList.js";
import { isValidText } from "./util.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, nextTick, shallowRef, watch, watchEffect } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/typography/Base/Ellipsis.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const MeasureText = /* @__PURE__ */ defineComponent((props, { slots, expose }) => {
	const spanRef = shallowRef();
	expose({
		isExceed: () => {
			const span = spanRef.value;
			return span.scrollHeight > span.clientHeight;
		},
		getHeight: () => spanRef.value?.clientHeight || 0
	});
	return () => {
		return createVNode("span", {
			"aria-hidden": true,
			"ref": spanRef,
			"style": {
				position: "fixed",
				display: "block",
				left: 0,
				top: 0,
				pointerEvents: "none",
				backgroundColor: "rgba(255, 0, 0, 0.65)",
				...props.style
			}
		}, [slots.default?.()]);
	};
}, {
	props: { style: {
		type: Object,
		required: false
	} },
	name: "TypographyMeasureText",
	inheritAttrs: false
});
function getNodesLen(nodeList) {
	return nodeList.reduce((totalLen, node) => totalLen + (isValidText(node) ? String(node).length : 1), 0);
}
function sliceNodes(nodeList, len) {
	let currLen = 0;
	const currentNodeList = [];
	for (let i = 0; i < nodeList.length; i += 1) {
		if (currLen === len) return currentNodeList;
		const node = nodeList[i];
		const nodeLen = isValidText(node) ? String(node).length : 1;
		const nextLen = currLen + nodeLen;
		if (nextLen > len) {
			const restLen = len - currLen;
			currentNodeList.push(String(node).slice(0, restLen));
			return currentNodeList;
		}
		currentNodeList.push(node);
		currLen = nextLen;
	}
	return nodeList;
}
const STATUS_MEASURE_NONE = 0;
const STATUS_MEASURE_PREPARE = 1;
const STATUS_MEASURE_START = 2;
const STATUS_MEASURE_NEED_ELLIPSIS = 3;
const STATUS_MEASURE_NO_NEED_ELLIPSIS = 4;
const lineClipStyle = {
	display: "-webkit-box",
	overflow: "hidden",
	WebkitBoxOrient: "vertical"
};
const Ellipsis = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const nodeList = computed(() => getTextNodeArr(filterEmpty(toList_default(getSlotPropsFnRun({}, props, "text"), true))));
	const nodeLen = computed(() => getNodesLen(nodeList.value));
	const ellipsisCutIndex = shallowRef(null);
	const cutMidRef = shallowRef();
	const measureWhiteSpaceRef = shallowRef();
	const needEllipsisRef = shallowRef();
	const descRowsEllipsisRef = shallowRef();
	const symbolRowEllipsisRef = shallowRef();
	const canEllipsis = shallowRef(false);
	const needEllipsis = shallowRef(STATUS_MEASURE_NONE);
	const ellipsisHeight = shallowRef(0);
	const parentWhiteSpace = shallowRef(null);
	watch([
		() => props.enableMeasure,
		() => props.width,
		nodeLen,
		() => props.rows
	], ([enableMeasure, width, len, rows]) => {
		if (enableMeasure && width && len && rows) needEllipsis.value = STATUS_MEASURE_PREPARE;
		else needEllipsis.value = STATUS_MEASURE_NONE;
	}, { immediate: true });
	watch(needEllipsis, async (status) => {
		await nextTick();
		if (status === STATUS_MEASURE_PREPARE) {
			needEllipsis.value = STATUS_MEASURE_START;
			parentWhiteSpace.value = measureWhiteSpaceRef.value ? getComputedStyle(measureWhiteSpaceRef.value).whiteSpace : null;
		} else if (status === STATUS_MEASURE_START) {
			const isOverflow = !!needEllipsisRef.value?.isExceed();
			needEllipsis.value = isOverflow ? STATUS_MEASURE_NEED_ELLIPSIS : STATUS_MEASURE_NO_NEED_ELLIPSIS;
			ellipsisCutIndex.value = isOverflow ? [0, nodeLen.value] : null;
			canEllipsis.value = isOverflow;
			const baseRowsEllipsisHeight = needEllipsisRef.value?.getHeight?.() || 0;
			const descRowsEllipsisHeight = props.rows === 1 ? 0 : descRowsEllipsisRef.value?.getHeight?.() || 0;
			const symbolRowEllipsisHeight = symbolRowEllipsisRef.value?.getHeight?.() || 0;
			ellipsisHeight.value = Math.max(baseRowsEllipsisHeight, descRowsEllipsisHeight + symbolRowEllipsisHeight) + 1;
			props.onEllipsis?.(isOverflow);
		}
	}, {
		flush: "post",
		immediate: true
	});
	const cutMidIndex = shallowRef(0);
	watchEffect(() => {
		const range = ellipsisCutIndex.value;
		if (range) cutMidIndex.value = Math.ceil((range[0] + range[1]) / 2);
	});
	watch(ellipsisCutIndex, async () => {
		await nextTick();
		const [minIndex, maxIndex] = ellipsisCutIndex.value || [0, 0];
		if (minIndex !== maxIndex) {
			const isOverflow = (cutMidRef.value?.getHeight() || 0) > ellipsisHeight.value;
			let targetMidIndex = cutMidIndex.value;
			if (maxIndex - minIndex === 1) targetMidIndex = isOverflow ? minIndex : maxIndex;
			ellipsisCutIndex.value = isOverflow ? [minIndex, targetMidIndex] : [targetMidIndex, maxIndex];
		}
	}, {
		flush: "post",
		immediate: true
	});
	return () => {
		const fullContent = slots?.default?.(nodeList.value, false);
		const finalContentFn = () => {
			if (!props.enableMeasure) return slots?.default?.(nodeList.value, false);
			if (needEllipsis.value !== STATUS_MEASURE_NEED_ELLIPSIS || !ellipsisCutIndex.value || ellipsisCutIndex.value[0] !== ellipsisCutIndex.value[1]) {
				const content = slots?.default?.(nodeList.value, false);
				if ([STATUS_MEASURE_NO_NEED_ELLIPSIS, STATUS_MEASURE_NONE].includes(needEllipsis.value)) return content;
				return createVNode("span", { "style": {
					...lineClipStyle,
					WebkitLineClamp: props.rows
				} }, [content]);
			}
			return slots?.default?.(props.expanded ? nodeList.value : sliceNodes(nodeList.value, ellipsisCutIndex.value[0]), canEllipsis.value);
		};
		const finalContent = finalContentFn();
		const measureStyle = {
			width: `${props.width}px`,
			margin: 0,
			padding: 0,
			whiteSpace: parentWhiteSpace.value === "nowrap" ? "normal" : "inherit"
		};
		return createVNode(Fragment, null, [
			finalContent,
			needEllipsis.value === STATUS_MEASURE_START && createVNode(Fragment, null, [
				createVNode(MeasureText, {
					"style": {
						...measureStyle,
						...lineClipStyle,
						WebkitLineClamp: props.rows
					},
					"ref": needEllipsisRef
				}, _isSlot(fullContent) ? fullContent : { default: () => [fullContent] }),
				createVNode(MeasureText, {
					"style": {
						...measureStyle,
						...lineClipStyle,
						WebkitLineClamp: props.rows - 1
					},
					"ref": descRowsEllipsisRef
				}, _isSlot(fullContent) ? fullContent : { default: () => [fullContent] }),
				createVNode(MeasureText, {
					"style": {
						...measureStyle,
						...lineClipStyle,
						WebkitLineClamp: 1
					},
					"ref": symbolRowEllipsisRef
				}, { default: () => [slots?.default?.([], true)] })
			]),
			needEllipsis.value === STATUS_MEASURE_NEED_ELLIPSIS && ellipsisCutIndex.value && ellipsisCutIndex.value[0] !== ellipsisCutIndex.value[1] && createVNode(MeasureText, {
				"style": {
					...measureStyle,
					top: `400px`
				},
				"ref": cutMidRef
			}, { default: () => [slots?.default?.(sliceNodes(nodeList.value, cutMidIndex.value), true)] }),
			needEllipsis.value === STATUS_MEASURE_PREPARE && createVNode("span", {
				"style": { whiteSpace: "inherit" },
				"ref": measureWhiteSpaceRef
			}, null)
		]);
	};
}, {
	props: {
		enableMeasure: {
			type: Boolean,
			required: false,
			default: void 0
		},
		text: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		width: {
			type: Number,
			required: true
		},
		rows: {
			type: Number,
			required: true
		},
		onEllipsis: {
			type: Function,
			required: true
		},
		expanded: {
			type: Boolean,
			required: true
		},
		miscDeps: {
			type: Array,
			required: true
		}
	},
	name: "TypographyEllipsis",
	inheritAttrs: false
});
var Ellipsis_default = Ellipsis;

//#endregion
export { Ellipsis_default as default };