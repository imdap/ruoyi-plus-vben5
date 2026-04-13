import { useStepsContext } from "./Context.js";
import Rail_default from "./Rail.js";
import StepIcon_default, { StepIconSemanticContextProvider } from "./StepIcon.js";
import { useUnstableContext } from "./UnstableContext.js";
import { createVNode, defineComponent, isVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import KeyCode from "@v-c/util/dist/KeyCode";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function hasContent(value) {
	return value !== void 0 && value !== null;
}
var Step_default = /* @__PURE__ */ defineComponent((props) => {
	const { railFollowPrevStatus } = useUnstableContext();
	const stepsContext = useStepsContext();
	return () => {
		const { ItemComponent } = stepsContext.value ?? {};
		const { prefixCls, classNames = {}, styles = {}, data, last, nextStatus, active, index, itemRender, iconRender, itemWrapperRender, onClick } = props;
		const itemCls = `${prefixCls}-item`;
		const { onClick: onItemClick, title, subTitle, content, description, disabled, icon, status, class: className, style, classNames: itemClassNames = {}, styles: itemStyles = {}, ...restItemProps } = data;
		const mergedContent = content ?? description;
		const renderInfo = {
			item: {
				...data,
				content: mergedContent
			},
			index,
			active
		};
		const clickable = !!(onClick || onItemClick) && !disabled;
		const accessibilityProps = {};
		if (clickable) {
			accessibilityProps.role = "button";
			accessibilityProps.tabindex = 0;
			accessibilityProps.onClick = (e) => {
				onItemClick?.(e);
				onClick?.(index);
			};
			accessibilityProps.onKeydown = (e) => {
				const { which } = e;
				if (which === KeyCode.ENTER || which === KeyCode.SPACE) onClick?.(index);
			};
		}
		const mergedStatus = status || "wait";
		const hasTitle = hasContent(title);
		const hasSubTitle = hasContent(subTitle);
		const classString = clsx(itemCls, `${itemCls}-${mergedStatus}`, {
			[`${itemCls}-custom`]: icon,
			[`${itemCls}-active`]: active,
			[`${itemCls}-disabled`]: disabled === true,
			[`${itemCls}-empty-header`]: !hasTitle && !hasSubTitle
		}, className, classNames?.item, itemClassNames.root);
		let iconNode = createVNode(StepIcon_default, null, null);
		if (iconRender) iconNode = iconRender(iconNode, {
			...renderInfo,
			components: { Icon: StepIcon_default }
		});
		const wrapperNode = createVNode("div", {
			"class": clsx(`${itemCls}-wrapper`, classNames?.itemWrapper, itemClassNames.wrapper),
			"style": {
				...styles.itemWrapper,
				...itemStyles.wrapper
			}
		}, [createVNode(StepIconSemanticContextProvider, { "value": {
			className: itemClassNames.icon,
			style: itemStyles.icon
		} }, _isSlot(iconNode) ? iconNode : { default: () => [iconNode] }), createVNode("div", {
			"class": clsx(`${itemCls}-section`, classNames.itemSection, itemClassNames.section),
			"style": {
				...styles.itemSection,
				...itemStyles.section
			}
		}, [createVNode("div", {
			"class": clsx(`${itemCls}-header`, classNames.itemHeader, itemClassNames.header),
			"style": {
				...styles.itemHeader,
				...itemStyles.header
			}
		}, [
			hasTitle && createVNode("div", {
				"class": clsx(`${itemCls}-title`, classNames.itemTitle, itemClassNames.title),
				"style": {
					...styles.itemTitle,
					...itemStyles.title
				}
			}, [title]),
			hasSubTitle && createVNode("div", {
				"title": typeof subTitle === "string" ? subTitle : void 0,
				"class": clsx(`${itemCls}-subtitle`, classNames.itemSubtitle, itemClassNames.subtitle),
				"style": {
					...styles.itemSubtitle,
					...itemStyles.subtitle
				}
			}, [subTitle]),
			!last && createVNode(Rail_default, {
				"prefixCls": itemCls,
				"className": clsx(classNames.itemRail, itemClassNames.rail),
				"style": {
					...styles.itemRail,
					...itemStyles.rail
				},
				"status": railFollowPrevStatus?.value ? status : nextStatus
			}, null)
		]), hasContent(mergedContent) && createVNode("div", {
			"class": clsx(`${itemCls}-content`, classNames.itemContent, itemClassNames.content),
			"style": {
				...styles.itemContent,
				...itemStyles.content
			}
		}, [mergedContent])])]);
		let stepNode = createVNode(ItemComponent, mergeProps(restItemProps, accessibilityProps, {
			"class": classString,
			"style": {
				...styles.item,
				...itemStyles.root,
				...style
			}
		}), { default: () => [itemWrapperRender ? itemWrapperRender(wrapperNode) : wrapperNode] });
		if (itemRender) stepNode = itemRender(stepNode, renderInfo) || null;
		return stepNode;
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: true,
			default: void 0
		},
		styles: {
			type: Object,
			required: true,
			default: void 0
		},
		data: {
			type: Object,
			required: true,
			default: void 0
		},
		nextStatus: {
			type: String,
			required: false,
			default: void 0
		},
		active: {
			type: Boolean,
			required: false,
			default: void 0
		},
		index: {
			type: Number,
			required: true,
			default: void 0
		},
		last: {
			type: Boolean,
			required: true,
			default: void 0
		},
		iconRender: {
			type: Function,
			required: false,
			default: void 0
		},
		icon: {
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
		itemRender: {
			type: Function,
			required: false,
			default: void 0
		},
		itemWrapperRender: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "Step",
	inheritAttrs: false
});
export { Step_default as default };
