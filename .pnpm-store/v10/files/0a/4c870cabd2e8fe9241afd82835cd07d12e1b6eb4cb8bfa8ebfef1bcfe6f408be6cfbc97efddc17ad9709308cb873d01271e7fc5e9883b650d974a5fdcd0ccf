Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_MentionsContext = require("./MentionsContext.cjs");
let vue = require("vue");
let _v_c_menu = require("@v-c/menu");
_v_c_menu = require_rolldown_runtime.__toESM(_v_c_menu);
let _v_c_util_dist_Dom_findDOMNode = require("@v-c/util/dist/Dom/findDOMNode");
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
var DropdownMenu = /* @__PURE__ */ (0, vue.defineComponent)((props) => {
	const mentionsContext = require_MentionsContext.useMentionsContext();
	const menuRef = (0, vue.shallowRef)();
	const activeIndex = (0, vue.computed)(() => mentionsContext.value.activeIndex);
	const activeOption = (0, vue.computed)(() => props.options[activeIndex.value] || {});
	const activeOptionKey = (0, vue.computed)(() => activeOption.value?.key);
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
	(0, vue.watch)(() => menuRef.value?.list, (list, _, onCleanup) => {
		if (list) list = (0, _v_c_util_dist_Dom_findDOMNode.getDOM)(list);
		bindListEvents(list || null);
		onCleanup(() => {
			removeListListeners?.();
			removeListListeners = void 0;
		});
	}, {
		immediate: true,
		flush: "post"
	});
	(0, vue.watch)([
		activeIndex,
		activeOptionKey,
		() => props.opened
	], () => {
		if (!props.opened || activeIndex.value === -1) return;
		(0, vue.nextTick)(() => {
			const key = activeOptionKey.value;
			if (!key) return;
			(menuRef.value?.findItem?.({ key }))?.scrollIntoView({
				block: "nearest",
				inline: "nearest"
			});
		});
	});
	(0, vue.onBeforeUnmount)(() => {
		removeListListeners?.();
		removeListListeners = void 0;
	});
	return () => {
		const { notFoundContent, setActiveIndex, selectOption } = mentionsContext.value;
		const { prefixCls, options } = props;
		const activeKey = activeOptionKey.value;
		return (0, vue.createVNode)(_v_c_menu.default, {
			"ref": menuRef,
			"prefixCls": `${prefixCls}-menu`,
			"activeKey": activeKey,
			"onSelect": ({ key }) => {
				const option = options.find(({ key: optionKey }) => optionKey === key);
				if (option) selectOption(option);
			}
		}, { default: () => [options.map((option, index) => {
			const { key, disabled, class: className, style, label } = option;
			return (0, vue.createVNode)(_v_c_menu.Item, (0, vue.mergeProps)({
				"key": key,
				"disabled": disabled,
				"class": className,
				"style": style
			}, { onMouseenter: () => {
				setActiveIndex(index);
			} }), _isSlot(label) ? label : { default: () => [label] });
		}), !options.length && (0, vue.createVNode)(_v_c_menu.Item, {
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
var DropdownMenu_default = DropdownMenu;
exports.default = DropdownMenu_default;
