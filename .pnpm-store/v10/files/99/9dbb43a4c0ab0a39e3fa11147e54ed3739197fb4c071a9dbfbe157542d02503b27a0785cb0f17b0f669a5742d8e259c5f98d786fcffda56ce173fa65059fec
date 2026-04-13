import { classNames } from "@v-c/util";

//#region src/flex/utils.ts
const flexWrapValues = [
	"wrap",
	"nowrap",
	"wrap-reverse"
];
const justifyContentValues = [
	"flex-start",
	"flex-end",
	"start",
	"end",
	"center",
	"space-between",
	"space-around",
	"space-evenly",
	"stretch",
	"normal",
	"left",
	"right"
];
const alignItemsValues = [
	"center",
	"start",
	"end",
	"flex-start",
	"flex-end",
	"self-start",
	"self-end",
	"baseline",
	"normal",
	"stretch"
];
function genClsWrap(prefixCls, props) {
	const wrap = props.wrap === true ? "wrap" : props.wrap;
	return { [`${prefixCls}-wrap-${wrap}`]: wrap && flexWrapValues.includes(wrap) };
}
function genClsAlign(prefixCls, props) {
	const alignCls = {};
	alignItemsValues.forEach((cssKey) => {
		alignCls[`${prefixCls}-align-${cssKey}`] = props.align === cssKey;
	});
	alignCls[`${prefixCls}-align-stretch`] = !props.align && !!props.vertical;
	return alignCls;
}
function genClsJustify(prefixCls, props) {
	const justifyCls = {};
	justifyContentValues.forEach((cssKey) => {
		justifyCls[`${prefixCls}-justify-${cssKey}`] = props.justify === cssKey;
	});
	return justifyCls;
}
function createFlexClassNames(prefixCls, props) {
	return classNames({
		...genClsWrap(prefixCls, props),
		...genClsAlign(prefixCls, props),
		...genClsJustify(prefixCls, props)
	});
}
var utils_default = createFlexClassNames;

//#endregion
export { alignItemsValues, utils_default as default, flexWrapValues, justifyContentValues };