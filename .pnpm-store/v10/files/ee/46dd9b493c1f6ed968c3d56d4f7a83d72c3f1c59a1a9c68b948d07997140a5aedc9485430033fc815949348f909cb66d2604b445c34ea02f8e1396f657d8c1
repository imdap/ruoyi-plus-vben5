import { createVNode, defineComponent } from "vue";
import { classNames } from "@v-c/util";
var Pager_default = /* @__PURE__ */ defineComponent((props) => {
	const handleClick = () => {
		props.onClick?.(props.page);
	};
	const handleKeyPress = (e) => {
		props.onKeyPress?.(e, props.onClick, props.page);
	};
	return () => {
		const { rootPrefixCls, page, active, className, showTitle, itemRender, style } = props;
		const prefixCls = `${rootPrefixCls}-item`;
		const cls = classNames(prefixCls, `${prefixCls}-${page}`, {
			[`${prefixCls}-active`]: active,
			[`${prefixCls}-disabled`]: !page
		}, className);
		const pager = itemRender?.(page, "page", createVNode("a", { "rel": "nofollow" }, [page]));
		return pager ? createVNode("li", {
			"title": showTitle ? String(page) : void 0,
			"class": cls,
			"style": style,
			"onClick": handleClick,
			"onKeydown": handleKeyPress,
			"tabindex": 0
		}, [pager]) : null;
	};
}, { props: {
	rootPrefixCls: {
		type: String,
		required: true,
		default: void 0
	},
	page: {
		type: Number,
		required: true,
		default: void 0
	},
	active: {
		type: Boolean,
		required: false,
		default: void 0
	},
	className: {
		type: String,
		required: false,
		default: void 0
	},
	style: {
		type: Object,
		required: false,
		default: void 0
	},
	showTitle: {
		type: Boolean,
		required: true,
		default: void 0
	},
	onClick: {
		type: Function,
		required: false,
		default: void 0
	},
	onKeyPress: {
		type: Function,
		required: false,
		default: void 0
	},
	itemRender: {
		type: Function,
		required: false,
		default: void 0
	}
} });
export { Pager_default as default };
