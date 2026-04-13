import { getRemovable } from "../utils.js";
import AddButton_default from "./AddButton.js";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, h, mergeProps, normalizeClass, normalizeStyle, openBlock, ref, toRefs, unref, useTemplateRef, watch, withCtx } from "vue";
import { clsx } from "@v-c/util";
import RenderComponent$1 from "@v-c/util/dist/RenderComponent";
import DropDown from "@v-c/dropdown";
import Menu from "@v-c/menu";
import KeyCode from "@v-c/util/dist/KeyCode";
//#region src/TabNavList/OperationNode.vue?vue&type=script&setup=true&lang.ts
var _hoisted_1 = [
	"id",
	"aria-controls",
	"aria-expanded"
];
var OperationNode_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "OperationNode",
	props: {
		prefixCls: {},
		className: {},
		style: {},
		id: {},
		tabs: {},
		rtl: { type: Boolean },
		tabBarGutter: {},
		activeKey: {},
		mobile: { type: Boolean },
		more: { default: () => ({}) },
		editable: {},
		locale: {},
		removeAriaLabel: {},
		onTabClick: {},
		tabMoving: { type: Boolean },
		getPopupContainer: {},
		popupClassName: {},
		popupStyle: {}
	},
	setup(__props, { expose: __expose }) {
		const props = __props;
		const MenuItem = Menu.Item;
		const { more: moreProps, tabBarGutter, getPopupContainer, popupStyle, popupClassName, rtl, removeAriaLabel, onTabClick, locale, mobile, id, prefixCls, editable, style, className } = toRefs(props);
		const open = ref(false);
		const selectedKey = ref(null);
		const operationNodeRef = useTemplateRef("operationNodeRef");
		const popupId = computed(() => `${id.value}-more-popup`);
		const dropdownPrefix = computed(() => `${prefixCls.value}-dropdown`);
		const selectedItemId = computed(() => selectedKey.value !== null ? `${popupId.value}-${selectedKey.value}` : null);
		const dropdownAriaLabel = computed(() => locale.value?.dropdownAriaLabel);
		function onRemoveTab(event, key) {
			event.preventDefault();
			event.stopPropagation();
			editable.value && editable.value.onEdit("remove", {
				key,
				event
			});
		}
		const menuNode = computed(() => {
			return h(Menu, {
				"prefixCls": `${dropdownPrefix.value}-menu`,
				"id": popupId.value,
				"tabIndex": -1,
				"role": "listbox",
				"aria-activedescendant": selectedItemId.value,
				"selectedKeys": selectedKey.value ? [selectedKey.value] : void 0,
				"aria-label": dropdownAriaLabel.value !== void 0 ? dropdownAriaLabel.value : "expanded dropdown",
				"onClick": ({ key, domEvent }) => {
					onTabClick.value?.(key, domEvent);
					open.value = false;
				}
			}, { default: () => props.tabs.map((tab) => {
				const { closable, closeIcon, disabled, key, label } = tab;
				const removable = getRemovable(closable, closeIcon, editable.value, disabled);
				return h(MenuItem, {
					"key": key,
					"id": `${popupId.value}-${key}`,
					"role": "option",
					"aria-controls": id.value && `${id.value}-panel-${key}`,
					"disabled": disabled
				}, { default: () => [h("span", {}, [label]), removable ? h("button", {
					"type": "button",
					"aria-label": removeAriaLabel.value || "remove",
					"tabindex": 0,
					"class": `${dropdownPrefix.value}-menu-item-remove`,
					"onClick": (e) => {
						e.stopPropagation();
						onRemoveTab(e, key);
					}
				}, [closeIcon || editable.value?.removeIcon || "×"]) : null] });
			}) });
		});
		const overlayClassName = computed(() => {
			return clsx({
				[popupClassName.value]: popupClassName.value,
				[`${dropdownPrefix.value}-rtl`]: rtl.value
			});
		});
		const moreIconNode = computed(() => moreProps.value?.icon || "More");
		const moreStyle = computed(() => {
			const style = { marginInlineStart: tabBarGutter.value ? `${tabBarGutter.value}px` : "0px" };
			if (!props.tabs.length) {
				style.visibility = "hidden";
				style.order = 1;
			}
			return style;
		});
		function selectOffset(offset) {
			const enabledTabs = props.tabs.filter((tab) => !tab.disabled);
			let selectedIndex = enabledTabs.findIndex((tab) => tab.key === selectedKey.value) || 0;
			const len = enabledTabs.length;
			for (let i = 0; i < len; i += 1) {
				selectedIndex = (selectedIndex + offset + len) % len;
				const tab = enabledTabs[selectedIndex];
				if (!tab.disabled) {
					selectedKey.value = tab.key;
					return;
				}
			}
		}
		function onKeyDown(e) {
			const { which } = e;
			if (!open.value) {
				if ([
					KeyCode.DOWN,
					KeyCode.SPACE,
					KeyCode.ENTER
				].includes(which)) {
					open.value = true;
					e.preventDefault();
				}
				return;
			}
			switch (which) {
				case KeyCode.UP:
					selectOffset(-1);
					e.preventDefault();
					break;
				case KeyCode.DOWN:
					selectOffset(1);
					e.preventDefault();
					break;
				case KeyCode.ESC:
					open.value = false;
					break;
				case KeyCode.SPACE:
				case KeyCode.ENTER:
					if (selectedKey.value !== null) onTabClick.value?.(selectedKey.value, e);
					break;
			}
		}
		watch(() => open.value, (visible) => {
			if (!visible) selectedKey.value = null;
		});
		watch([() => selectedItemId.value, () => selectedKey.value], () => {
			if (selectedItemId.value) {
				const ele = document.getElementById(selectedItemId.value);
				if (ele?.scrollIntoView) ele.scrollIntoView(false);
			}
		});
		__expose({ operationNodeRef });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "operationNodeRef",
				ref: operationNodeRef,
				class: normalizeClass([`${unref(prefixCls)}-nav-operations`, unref(className)]),
				style: normalizeStyle(unref(style))
			}, [!unref(mobile) ? (openBlock(), createBlock(unref(DropDown), mergeProps({
				key: 0,
				"prefix-cls": dropdownPrefix.value,
				overlay: menuNode.value,
				visible: __props.tabs.length ? open.value : false,
				"overlay-class-name": overlayClassName.value,
				"overlay-style": unref(popupStyle),
				"mouse-enter-delay": .1,
				"mouse-leave-delay": .1,
				"get-popup-container": unref(getPopupContainer)
			}, unref(moreProps), { onVisibleChange: _cache[0] || (_cache[0] = ($event) => open.value = $event) }), {
				default: withCtx(() => [createElementVNode("button", {
					id: `${unref(id)}-more`,
					type: "button",
					class: normalizeClass(`${unref(prefixCls)}-nav-more`),
					style: normalizeStyle(moreStyle.value),
					"aria-haspopup": "listbox",
					"aria-controls": popupId.value,
					"aria-expanded": open.value,
					onKeydown: onKeyDown
				}, [createVNode(unref(RenderComponent$1), { render: moreIconNode.value }, null, 8, ["render"])], 46, _hoisted_1)]),
				_: 1
			}, 16, [
				"prefix-cls",
				"overlay",
				"visible",
				"overlay-class-name",
				"overlay-style",
				"get-popup-container"
			])) : createCommentVNode("", true), createVNode(AddButton_default, {
				"prefix-cls": unref(prefixCls),
				locale: unref(locale),
				editable: unref(editable)
			}, null, 8, [
				"prefix-cls",
				"locale",
				"editable"
			])], 6);
		};
	}
});
//#endregion
export { OperationNode_vue_vue_type_script_setup_true_lang_default as default };
