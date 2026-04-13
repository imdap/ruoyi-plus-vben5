import { computed, unref } from "vue";
import { classNames as classNames$1 } from "@v-c/util";
import { omit } from "es-toolkit";

//#region src/_util/hooks/useMergeSemantic.ts
function mergeClassNames(schema, ...classNames) {
	const mergedSchema = schema || {};
	return classNames.filter(Boolean).reduce((acc, cur) => {
		Object.keys(cur || {}).forEach((key) => {
			const keySchema = mergedSchema[key];
			const curVal = cur[key];
			if (keySchema && typeof keySchema === "object") if (curVal && typeof curVal === "object") acc[key] = mergeClassNames(keySchema, acc[key], curVal);
			else {
				const { _default: defaultField } = keySchema;
				if (defaultField) {
					acc[key] = acc[key] || {};
					acc[key][defaultField] = classNames$1(acc[key][defaultField], curVal);
				}
			}
			else acc[key] = classNames$1(acc[key], curVal);
		});
		return acc;
	}, {});
}
function useSemanticClassNames(schema, ...classNames) {
	return mergeClassNames(schema, ...classNames);
}
function mergeStyles(...styles) {
	return styles.filter(Boolean).reduce((acc, cur = {}) => {
		Object.keys(cur).forEach((key) => {
			acc[key] = {
				...acc[key],
				...cur[key]
			};
		});
		return acc;
	}, {});
}
function useSemanticStyles(...styles) {
	return mergeStyles(...styles);
}
function fillObjectBySchema(obj, schema) {
	const newObj = { ...obj };
	Object.keys(schema).forEach((key) => {
		if (key !== "_default") {
			const nestSchema = schema[key];
			const nextValue = newObj[key] || {};
			newObj[key] = nestSchema ? fillObjectBySchema(nextValue, nestSchema) : nextValue;
		}
	});
	return newObj;
}
function resolveStyleOrClass(value, info) {
	return typeof value === "function" ? value(info) : value;
}
/**
* @desc Merge classNames and styles from multiple sources. When `schema` is provided, it **must** provide the nest object structure.
* @descZH 合并来自多个来源的 classNames 和 styles，当提供了 `schema` 时，必须提供嵌套的对象结构。
*/
/**
* @desc Merge classNames and styles from multiple sources. When `schema` is provided, it **must** provide the nest object structure.
* @descZH 合并来自多个来源的 classNames 和 styles，当提供了 `schema` 时，必须提供嵌套的对象结构。
*/
function useMergeSemantic(classNamesList, stylesList, info, schema) {
	const resolvedClassNamesList = computed(() => {
		return classNamesList.value.map((classNames) => classNames ? resolveStyleOrClass(classNames, info.value) : void 0);
	});
	const resolvedStylesList = computed(() => {
		return stylesList.value.map((styles) => styles ? resolveStyleOrClass(styles, info.value) : void 0);
	});
	const mergedClassNames = computed(() => useSemanticClassNames(schema?.value, ...resolvedClassNamesList.value));
	const mergedStyles = computed(() => useSemanticStyles(...resolvedStylesList.value));
	const _merged = computed(() => {
		if (!schema?.value) return [mergedClassNames.value, mergedStyles.value];
		return [fillObjectBySchema(mergedClassNames.value, schema.value), fillObjectBySchema(mergedStyles.value, schema.value)];
	});
	return [computed(() => _merged.value[0]), computed(() => _merged.value[1])];
}
function useMergeSemanticNoRef(classNamesList, stylesList, info, schema) {
	const resolvedClassNamesList = classNamesList.map((classNames) => classNames ? resolveStyleOrClass(classNames, info) : void 0);
	const resolvedStylesList = stylesList.map((styles) => styles ? resolveStyleOrClass(styles, info) : void 0);
	const mergedClassNames = useSemanticClassNames(schema, ...resolvedClassNamesList);
	const mergedStyles = useSemanticStyles(...resolvedStylesList);
	const fn = () => {
		if (!schema) return [mergedClassNames, mergedStyles];
		return [fillObjectBySchema(mergedClassNames, schema), fillObjectBySchema(mergedStyles, schema)];
	};
	return fn();
}
function useToArr(...args) {
	return computed(() => args.map(unref));
}
function useToProps(props) {
	return computed(() => ({ props: props.value }));
}
const defaultOptions = {
	class: true,
	style: true
};
function pureAttrs(attrs, options = defaultOptions) {
	const newAttrs = { ...attrs };
	if (options.class) delete newAttrs.class;
	if (options.style) delete newAttrs.style;
	if (options.omit) return omit(newAttrs, options.omit);
	return newAttrs;
}
function getAttrStyleAndClass(attrs, options, props) {
	return {
		className: attrs.class ?? props?.class,
		style: attrs.style ?? props?.style,
		restAttrs: pureAttrs(attrs, options)
	};
}

//#endregion
export { getAttrStyleAndClass, mergeClassNames, mergeStyles, pureAttrs, resolveStyleOrClass, useMergeSemantic, useMergeSemanticNoRef, useToArr, useToProps };