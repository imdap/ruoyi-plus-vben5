import { genDataNodeKey, getRemovable } from "../utils.js";
import { computed, createBlock, defineComponent, h, onMounted, openBlock, ref, toRefs, unref, watch } from "vue";
import RenderComponent from "@v-c/util/dist/RenderComponent";
import { isEmptyElement } from "@v-c/util/dist/props-util";
//#region src/TabNavList/TabNode.vue?vue&type=script&setup=true&lang.ts
var TabNode_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "TabNode",
	inheritAttrs: false,
	__name: "TabNode",
	props: {
		id: {},
		prefixCls: {},
		tab: {},
		active: { type: Boolean },
		focus: { type: Boolean },
		closable: { type: Boolean },
		editable: {},
		onClick: { type: Function },
		onResize: { type: Function },
		renderWrapper: { type: Function },
		removeAriaLabel: {},
		tabCount: {},
		currentPosition: {},
		removeIcon: { type: [
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		] },
		onKeyDown: { type: Function },
		onMouseDown: { type: Function },
		onMouseUp: { type: Function },
		onFocus: { type: Function },
		onBlur: { type: Function },
		style: {},
		className: {}
	},
	setup(__props) {
		const props = __props;
		const btnRef = ref();
		function setBtnRef(el) {
			btnRef.value = el;
		}
		const { prefixCls, tab, closable, active, editable, focus } = toRefs(props);
		const removable = computed(() => getRemovable(closable.value, tab.value.closeIcon, editable.value, tab.value.disabled));
		const tabPrefix = computed(() => `${prefixCls.value}-tab`);
		function onInternalClick(e) {
			if (tab.value.disabled) return;
			props.onClick?.(e);
		}
		const cls = computed(() => [
			tabPrefix.value,
			props.className,
			{
				[`${tabPrefix.value}-with-remove`]: removable.value,
				[`${tabPrefix.value}-active`]: active.value,
				[`${tabPrefix.value}-disabled`]: tab.value.disabled,
				[`${tabPrefix.value}-focus`]: focus.value
			}
		]);
		function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			editable.value?.onEdit("remove", {
				key: tab.value.key,
				event
			});
		}
		onMounted(() => {
			watch(() => focus.value, () => {
				if (focus.value && btnRef.value) btnRef.value.focus();
			}, { immediate: true });
		});
		const node = computed(() => {
			const btnChildren = [];
			if (focus.value) btnChildren.push(h("div", {
				"aria-live": "polite",
				"style": "width: 0; height: 0; position: absolute; overflow: hidden; opacity: 0;"
			}, `Tab ${props.currentPosition} of ${props.tabCount}`));
			if (tab.value.icon) btnChildren.push(h("span", { class: [`${tabPrefix.value}-icon`] }, [h(RenderComponent, { render: tab.value.icon })]));
			if (tab.value.label) if (typeof tab.value.label === "string" && !isEmptyElement(tab.value.icon)) btnChildren.push(h("span", {}, tab.value.label));
			else btnChildren.push(tab.value.label);
			const children = [h("div", {
				"id": tab.value.id && `${tab.value.id}-tab-${tab.value.key}`,
				"ref": setBtnRef,
				"role": "tab",
				"aria-selected": active.value,
				"class": [`${tabPrefix.value}-btn`],
				"aria-controls": tab.value.id && `${tab.value.id}-panel-${tab.value.key}`,
				"aria-disabled": tab.value.disabled,
				"tabindex": tab.value.disabled ? void 0 : active.value ? 0 : -1,
				"onClick": (e) => {
					e.stopPropagation();
					onInternalClick(e);
				},
				"onKeydown": props.onKeyDown,
				"onMousedown": props.onMouseDown,
				"onMouseup": props.onMouseUp,
				"onFocus": props.onFocus,
				"onBlur": props.onBlur
			}, btnChildren)];
			if (removable.value) children.push(h("button", {
				"type": "button",
				"aria-label": props.removeAriaLabel || "remove",
				"tabindex": active.value ? 0 : -1,
				"class": [`${tabPrefix.value}-remove`],
				"onClick": (e) => {
					e.stopPropagation();
					onRemove(e);
				}
			}, [h(RenderComponent, { render: tab.value.closeIcon || editable.value && editable.value.removeIcon || "×" })]));
			return h("div", {
				"key": tab.value.key,
				"data-node-key": genDataNodeKey(tab.value.key),
				"class": cls.value,
				"style": props.style,
				"onClick": onInternalClick
			}, children);
		});
		const finalNode = computed(() => props.renderWrapper ? props.renderWrapper(node.value) : node.value);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(unref(RenderComponent), { render: finalNode.value }, null, 8, ["render"]);
		};
	}
});
//#endregion
export { TabNode_vue_vue_type_script_setup_true_lang_default as default };
