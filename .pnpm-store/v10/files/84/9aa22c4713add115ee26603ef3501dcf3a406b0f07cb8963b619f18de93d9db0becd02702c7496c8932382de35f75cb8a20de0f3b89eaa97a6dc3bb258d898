import { createVNode, defineComponent, shallowRef, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/masonry/MasonryItem.tsx
const MasonryItem = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const domRef = shallowRef();
	let observer = null;
	const onResize = () => {
		const onResize = props?.onResize;
		if (onResize) onResize();
	};
	watch([() => props.onResize, domRef], (_n, _o, onCleanup) => {
		if (props.onResize && domRef.value) {
			observer = new ResizeObserver(onResize);
			observer.observe(domRef.value);
		}
		onCleanup(() => {
			if (observer) {
				observer.disconnect();
				observer = null;
			}
		});
	}, {
		immediate: true,
		flush: "post"
	});
	return () => {
		const { item, style, prefixCls, class: className, itemRender, index, column } = props;
		const itemPrefix = `${prefixCls}-item`;
		const children = filterEmpty(slots?.default?.() ?? []);
		const renderNode = children.length ? children : itemRender?.({
			...item,
			index,
			column
		});
		return createVNode("div", {
			"style": style,
			"ref": domRef,
			"class": clsx(itemPrefix, className)
		}, [renderNode]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		item: {
			type: Object,
			required: true
		},
		style: {
			type: Object,
			required: true
		},
		class: {
			type: String,
			required: false
		},
		index: {
			type: Number,
			required: true
		},
		column: {
			type: Number,
			required: true
		},
		onResize: { required: false },
		itemRender: {
			type: Function,
			required: false
		}
	},
	name: "AMasonryItem",
	inheritAttrs: false
});
var MasonryItem_default = MasonryItem;

//#endregion
export { MasonryItem_default as default };