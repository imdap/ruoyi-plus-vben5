import { useMentionsContext } from "./MentionsContext.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps, nextTick, onBeforeUnmount, shallowRef, watch } from "vue";
import Menu, { Item } from "@v-c/menu";
import { getDOM } from "@v-c/util/dist/Dom/findDOMNode";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var DropdownMenu_default = /* @__PURE__ */ defineComponent((props) => {
	const mentionsContext = useMentionsContext();
	const menuRef = shallowRef();
	const activeIndex = computed(() => mentionsContext.value.activeIndex);
	const activeOption = computed(() => props.options[activeIndex.value] || {});
	const activeOptionKey = computed(() => activeOption.value?.key);
	let removeListListeners;
	const bindListEvents = (list) => {
		if (removeListListeners) {
			removeListListeners();
			removeListListeners = void 0;
		}
		if (!list) return;
		const handleFocus = (event) => {
			mentionsContext.value.onFocus?.(event);
		};
		const handleBlur = (event) => {
			mentionsContext.value.onBlur?.(event);
		};
		const handleScroll = (event) => {
			mentionsContext.value.onScroll?.(event);
		};
		list.addEventListener("focusin", handleFocus);
		list.addEventListener("focusout", handleBlur);
		list.addEventListener("scroll", handleScroll);
		removeListListeners = () => {
			list.removeEventListener("focusin", handleFocus);
			list.removeEventListener("focusout", handleBlur);
			list.removeEventListener("scroll", handleScroll);
		};
	};
	watch(() => menuRef.value?.list, (list, _, onCleanup) => {
		if (list) list = getDOM(list);
		bindListEvents(list || null);
		onCleanup(() => {
			removeListListeners?.();
			removeListListeners = void 0;
		});
	}, {
		immediate: true,
		flush: "post"
	});
	watch([
		activeIndex,
		activeOptionKey,
		() => props.opened
	], () => {
		if (!props.opened || activeIndex.value === -1) return;
		nextTick(() => {
			const key = activeOptionKey.value;
			if (!key) return;
			(menuRef.value?.findItem?.({ key }))?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	});
	onBeforeUnmount(() => {
		removeListListeners?.();
		removeListListeners = void 0;
	});
	return () => {
		const { notFoundContent, setActiveIndex, selectOption } = mentionsContext.value;
		const { prefixCls, options } = props;
		const activeKey = activeOptionKey.value;
		return createVNode(Menu, {
			"ref": menuRef,
			"prefixCls": `${prefixCls}-menu`,
			"activeKey": activeKey,
			"onSelect": ({ key }) => {
				const option = options.find(({ key: optionKey }) => optionKey === key);
				if (option) selectOption(option);
			}
		}, { default: () => [options.map((option, index) => {
			const { key, disabled, class: className, style, label } = option;
			return createVNode(Item, mergeProps({
				"key": key,
				"disabled": disabled,
				"class": className,
				"style": style
			}, { onMouseenter: () => {
				setActiveIndex(index);
			} }), _isSlot(label) ? label : { default: () => [label] });
		}), !options.length && createVNode(Item, {
			"disabled": true,
			"key": "notFound"
		}, _isSlot(notFoundContent) ? notFoundContent : { default: () => [notFoundContent] })] });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		options: {
			type: Array,
			required: true,
			default: void 0
		},
		opened: {
			type: Boolean,
			required: true,
			default: void 0
		}
	},
	name: "DropdownMenu",
	inheritAttrs: false
});
export { DropdownMenu_default as default };
