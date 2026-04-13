Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_Context = require("./Context.cjs");
const require_Rail = require("./Rail.cjs");
const require_StepIcon = require("./StepIcon.cjs");
const require_UnstableContext = require("./UnstableContext.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_KeyCode = require("@v-c/util/dist/KeyCode");
_v_c_util_dist_KeyCode = require_rolldown_runtime.__toESM(_v_c_util_dist_KeyCode);
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
function hasContent(value) {
	return value !== void 0 && value !== null;
}
var Step = /* @__PURE__ */ (0, vue.defineComponent)((props) => {
	const { railFollowPrevStatus } = require_UnstableContext.useUnstableContext();
	const stepsContext = require_Context.useStepsContext();
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
				if (which === _v_c_util_dist_KeyCode.default.ENTER || which === _v_c_util_dist_KeyCode.default.SPACE) onClick?.(index);
			};
		}
		const mergedStatus = status || "wait";
		const hasTitle = hasContent(title);
		const hasSubTitle = hasContent(subTitle);
		const classString = (0, _v_c_util.clsx)(itemCls, `${itemCls}-${mergedStatus}`, {
			[`${itemCls}-custom`]: icon,
			[`${itemCls}-active`]: active,
			[`${itemCls}-disabled`]: disabled === true,
			[`${itemCls}-empty-header`]: !hasTitle && !hasSubTitle
		}, className, classNames?.item, itemClassNames.root);
		let iconNode = (0, vue.createVNode)(require_StepIcon.default, null, null);
		if (iconRender) iconNode = iconRender(iconNode, {
			...renderInfo,
			components: { Icon: require_StepIcon.default }
		});
		const wrapperNode = (0, vue.createVNode)("div", {
			"class": (0, _v_c_util.clsx)(`${itemCls}-wrapper`, classNames?.itemWrapper, itemClassNames.wrapper),
			"style": {
				...styles.itemWrapper,
				...itemStyles.wrapper
			}
		}, [(0, vue.createVNode)(require_StepIcon.StepIconSemanticContextProvider, { "value": {
			className: itemClassNames.icon,
			style: itemStyles.icon
		} }, _isSlot(iconNode) ? iconNode : { default: () => [iconNode] }), (0, vue.createVNode)("div", {
			"class": (0, _v_c_util.clsx)(`${itemCls}-section`, classNames.itemSection, itemClassNames.section),
			"style": {
				...styles.itemSection,
				...itemStyles.section
			}
		}, [(0, vue.createVNode)("div", {
			"class": (0, _v_c_util.clsx)(`${itemCls}-header`, classNames.itemHeader, itemClassNames.header),
			"style": {
				...styles.itemHeader,
				...itemStyles.header
			}
		}, [
			hasTitle && (0, vue.createVNode)("div", {
				"class": (0, _v_c_util.clsx)(`${itemCls}-title`, classNames.itemTitle, itemClassNames.title),
				"style": {
					...styles.itemTitle,
					...itemStyles.title
				}
			}, [title]),
			hasSubTitle && (0, vue.createVNode)("div", {
				"title": typeof subTitle === "string" ? subTitle : void 0,
				"class": (0, _v_c_util.clsx)(`${itemCls}-subtitle`, classNames.itemSubtitle, itemClassNames.subtitle),
				"style": {
					...styles.itemSubtitle,
					...itemStyles.subtitle
				}
			}, [subTitle]),
			!last && (0, vue.createVNode)(require_Rail.default, {
				"prefixCls": itemCls,
				"className": (0, _v_c_util.clsx)(classNames.itemRail, itemClassNames.rail),
				"style": {
					...styles.itemRail,
					...itemStyles.rail
				},
				"status": railFollowPrevStatus?.value ? status : nextStatus
			}, null)
		]), hasContent(mergedContent) && (0, vue.createVNode)("div", {
			"class": (0, _v_c_util.clsx)(`${itemCls}-content`, classNames.itemContent, itemClassNames.content),
			"style": {
				...styles.itemContent,
				...itemStyles.content
			}
		}, [mergedContent])])]);
		let stepNode = (0, vue.createVNode)(ItemComponent, (0, vue.mergeProps)(restItemProps, accessibilityProps, {
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
var Step_default = Step;
exports.default = Step_default;
