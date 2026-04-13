import PanelContent_default from "./PanelContent.js";
import { Transition, computed, createVNode, defineComponent, mergeDefaults, mergeProps, ref, vShow, withDirectives } from "vue";
import { classNames } from "@v-c/util";
import omit from "@v-c/util/dist/omit";
import KeyCode from "@v-c/util/dist/KeyCode";
var Panel_default = /* @__PURE__ */ defineComponent({
	props: /* @__PURE__ */ mergeDefaults({
		id: {
			type: String,
			required: false,
			default: void 0
		},
		header: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		headerClass: {
			type: String,
			required: false,
			default: void 0
		},
		showArrow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		class: {
			type: String,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		isActive: {
			type: Boolean,
			required: false,
			default: void 0
		},
		openMotion: {
			type: Object,
			required: false,
			default: void 0
		},
		destroyOnHidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		accordion: {
			type: Boolean,
			required: false,
			default: void 0
		},
		forceRender: {
			type: Boolean,
			required: false,
			default: void 0
		},
		extra: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		onItemClick: {
			type: Function,
			required: false,
			default: void 0
		},
		expandIcon: {
			type: Function,
			required: false,
			default: void 0
		},
		panelKey: {
			type: [String, Number],
			required: false,
			default: void 0
		},
		role: {
			type: String,
			required: false,
			default: void 0
		},
		collapsible: {
			type: String,
			required: false,
			default: void 0
		},
		children: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		}
	}, {
		showArrow: true,
		classNames: {},
		styles: {}
	}),
	name: "CollapsePanel",
	inheritAttrs: false,
	setup(props, { attrs, expose }) {
		const disabled = computed(() => props.collapsible === "disabled");
		const refWrapper = ref();
		const ifExtraExist = computed(() => props.extra !== null && props.extra !== void 0 && typeof props.extra !== "boolean");
		const collapsibleProps = computed(() => {
			return {
				"onClick": () => {
					props.onItemClick?.(props.panelKey);
				},
				"onKeydown": (e) => {
					if (e.key === "Enter" || e.keyCode === KeyCode.ENTER || e.which === KeyCode.ENTER) props.onItemClick?.(props.panelKey);
				},
				"role": props.accordion ? "tab" : "button",
				"aria-expanded": props.isActive,
				"aria-disabled": disabled.value,
				"tabIndex": disabled.value ? -1 : 0
			};
		});
		expose({ ref: refWrapper });
		return () => {
			const { extra, prefixCls, isActive, class: className, expandIcon, forceRender, headerClass, collapsible, accordion, openMotion = {}, onItemClick, classNames: customizeClassNames = {}, showArrow = true, destroyOnHidden, styles = {}, header, panelKey, children, ...restProps } = props;
			const collapsePanelClassNames = classNames(`${prefixCls}-item`, {
				[`${prefixCls}-item-active`]: isActive,
				[`${prefixCls}-item-disabled`]: disabled.value
			}, className);
			const headerProps = {
				class: classNames(headerClass, `${prefixCls}-header`, { [`${prefixCls}-collapsible-${collapsible}`]: !!collapsible }, customizeClassNames.header),
				style: styles.header,
				...["header", "icon"].includes(collapsible) ? {} : collapsibleProps.value
			};
			const iconNodeInner = typeof expandIcon === "function" ? expandIcon(props) : createVNode("i", { "class": "arrow" }, null);
			const iconNode = iconNodeInner && createVNode("div", mergeProps({
				"class": classNames(`${prefixCls}-expand-icon`, customizeClassNames?.icon),
				"style": styles?.icon
			}, ["header", "icon"].includes(collapsible) ? collapsibleProps.value : {}), [iconNodeInner]);
			const panelContent = withDirectives(createVNode(PanelContent_default, {
				"prefixCls": prefixCls,
				"classNames": customizeClassNames,
				"styles": styles,
				"isActive": isActive,
				"forceRender": forceRender,
				"role": accordion ? "tabpanel" : void 0
			}, { default: () => children }), [[vShow, isActive]]);
			const transitionProps = {
				appear: false,
				...openMotion
			};
			return createVNode("div", mergeProps({
				...restProps,
				...omit(attrs, ["class"])
			}, {
				"ref": refWrapper,
				"class": collapsePanelClassNames
			}), [createVNode("div", headerProps, [
				showArrow && iconNode,
				createVNode("span", mergeProps({
					"class": classNames(`${prefixCls}-title`, customizeClassNames?.title),
					"style": styles?.title
				}, collapsible === "header" ? collapsibleProps.value : {}), [header]),
				ifExtraExist.value && createVNode("div", { "class": `${prefixCls}-extra` }, [extra])
			]), createVNode(Transition, transitionProps, { default: () => [!destroyOnHidden || isActive ? panelContent : null] })]);
		};
	}
});
export { Panel_default as default };
