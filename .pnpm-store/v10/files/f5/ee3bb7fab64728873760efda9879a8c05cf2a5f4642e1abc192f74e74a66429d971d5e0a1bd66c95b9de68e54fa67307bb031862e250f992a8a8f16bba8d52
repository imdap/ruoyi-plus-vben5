import { getSlotPropsFnRun } from "../_util/tools.js";
import { checkRenderNode } from "../_util/vueNode.js";
import { createVNode, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import pickAttrs from "@v-c/util/dist/pickAttrs";

//#region src/breadcrumb/useItemRender.tsx
function getBreadcrumbName(route, params, titleRender, index) {
	const title = getSlotPropsFnRun({}, { title: route.title }, "title");
	const _renderTitle = checkRenderNode(titleRender?.({
		item: route,
		index
	}));
	const _title = _renderTitle !== void 0 ? _renderTitle : title;
	if (_title === void 0 || _title === null) return null;
	const paramsKeys = Object.keys(params).join("|");
	return typeof _title === "object" ? _title : String(_title).replace(new RegExp(`:(${paramsKeys})`, "g"), (replacement, key) => params[key] || replacement);
}
function renderItem(prefixCls, item, children, href) {
	if (children === null || children === void 0) return null;
	const { class: className, onClick, ...restItem } = item;
	const passedProps = {
		...pickAttrs(restItem, {
			data: true,
			aria: true
		}),
		onClick
	};
	if (href !== void 0) return createVNode("a", mergeProps(passedProps, {
		"class": clsx(`${prefixCls}-link`, className),
		"href": href
	}), [children]);
	return createVNode("span", mergeProps(passedProps, { "class": clsx(`${prefixCls}-link`, className) }), [children]);
}
function useItemRender(prefixCls, itemRender, titleRender) {
	const mergedItemRender = (item, params, routes, path, href, index) => {
		if (itemRender) return itemRender(item, params, routes, path);
		return renderItem(prefixCls, item, getBreadcrumbName(item, params, titleRender, index), href);
	};
	return mergedItemRender;
}

//#endregion
export { useItemRender as default, renderItem };