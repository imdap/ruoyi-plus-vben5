import { Comment } from "vue";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/_util/vnode/index.ts
const EMPTY_OBJ = Object.freeze({});
function hasOwn(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
}
function isFunction(value) {
	return typeof value === "function";
}
function camelize(str) {
	return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : "");
}
function hyphenate(str) {
	return str.replace(/\B([A-Z])/g, "-$1").toLowerCase();
}
function isBooleanType(type) {
	return isFunction(type) && type.name === "Boolean";
}
function isStringType(type) {
	return isFunction(type) && type.name === "String";
}
function isReservedProp(key) {
	return key === "key" || key === "ref";
}
function isComponentVNode(vnode) {
	return typeof vnode.type === "object" || typeof vnode.type === "function";
}
function getVNodeComponentName(vnode) {
	if (!isComponentVNode(vnode)) return;
	const type = vnode.type;
	return type.name || type.__name || type.displayName;
}
function isTargetComponent(vnode, name) {
	return getVNodeComponentName(vnode) === name;
}
function hasTargetMarker(vnode, markerKey) {
	if (!isComponentVNode(vnode)) return false;
	return Boolean(vnode.type?.[markerKey]);
}
function normalizePropsOptions(vnode) {
	if (!isComponentVNode(vnode)) return [];
	const raw = vnode.type.props;
	if (!raw) return [];
	const normalized = {};
	const needCastKeys = [];
	if (Array.isArray(raw)) raw.forEach((key) => {
		if (typeof key !== "string") return;
		normalized[camelize(key)] = {};
	});
	else if (typeof raw === "object") Object.keys(raw).forEach((key) => {
		const normalizedKey = camelize(key);
		const opt = raw[key];
		const prop = Array.isArray(opt) || isFunction(opt) ? { type: opt } : opt ? { ...opt } : {};
		const propType = prop.type;
		let shouldCast = false;
		let shouldCastTrue = true;
		if (Array.isArray(propType)) for (let index = 0; index < propType.length; index += 1) {
			const type = propType[index];
			if (isBooleanType(type)) {
				shouldCast = true;
				break;
			}
			if (isStringType(type)) shouldCastTrue = false;
		}
		else shouldCast = isBooleanType(propType);
		prop.shouldCast = shouldCast;
		prop.shouldCastTrue = shouldCastTrue;
		normalized[normalizedKey] = prop;
		if (shouldCast || hasOwn(prop, "default")) needCastKeys.push(normalizedKey);
	});
	return [normalized, needCastKeys];
}
function resolvePropValue(options, props, key, value, isAbsent) {
	const opt = options[key];
	if (!opt) return value;
	const hasDefault = hasOwn(opt, "default");
	if (hasDefault && value === void 0) {
		const defaultValue = opt.default;
		if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) value = defaultValue(props);
		else value = defaultValue;
	}
	if (opt.shouldCast) {
		if (isAbsent && !hasDefault) value = false;
		else if (opt.shouldCastTrue && (value === "" || value === hyphenate(key))) value = true;
	}
	return value;
}
function normalizeSlotValue(value) {
	const nodes = filterEmpty(value).filter((node) => node !== void 0 && node !== null && (typeof node !== "object" || node.type !== Comment));
	if (nodes.length === 0) return;
	return nodes.length === 1 ? nodes[0] : nodes;
}
function resolveVNodeProps(vnode, name, markerKey) {
	if (markerKey && !hasTargetMarker(vnode, markerKey)) return {};
	if (!markerKey && name && !isTargetComponent(vnode, name)) return {};
	const rawProps = vnode.props || EMPTY_OBJ;
	const normalizedPropsOptions = normalizePropsOptions(vnode);
	const resolvedProps = {};
	const attrs = {};
	if (normalizedPropsOptions.length > 0) {
		const [options, needCastKeys] = normalizedPropsOptions;
		const needCastKeySet = new Set(needCastKeys);
		const rawCastValues = {};
		Object.keys(rawProps).forEach((key) => {
			if (isReservedProp(key)) return;
			const value = rawProps[key];
			const camelKey = camelize(key);
			if (hasOwn(options, camelKey)) if (!needCastKeySet.has(camelKey)) resolvedProps[camelKey] = value;
			else rawCastValues[camelKey] = value;
			else attrs[key] = value;
		});
		needCastKeys.forEach((key) => {
			resolvedProps[key] = resolvePropValue(options, resolvedProps, key, rawCastValues[key], !hasOwn(rawCastValues, key));
		});
	} else Object.keys(rawProps).forEach((key) => {
		if (isReservedProp(key)) return;
		attrs[key] = rawProps[key];
	});
	const result = {
		...attrs,
		...resolvedProps
	};
	if (result.className === void 0 && result.class !== void 0) result.className = result.class;
	if (result.class === void 0 && result.className !== void 0) result.class = result.className;
	if (vnode.key != null && result.key === void 0) result.key = vnode.key;
	if (typeof vnode.children === "object" && vnode.children && !Array.isArray(vnode.children)) Object.keys(vnode.children).forEach((slotName) => {
		if (slotName === "_") return;
		const slotFn = vnode.children[slotName];
		if (!isFunction(slotFn)) return;
		const value = normalizeSlotValue(slotFn());
		if (value === void 0) return;
		if (slotName === "default") {
			result.children = value;
			return;
		}
		result[camelize(slotName)] = value;
	});
	return result;
}
function resolveSlotsNode(slots, slotName, name, markerKey) {
	if (!slots[slotName]) return [];
	const nodes = filterEmpty(slots?.[slotName]?.() ?? []).filter((node) => node !== void 0 && node !== null && node.type !== Comment);
	if (nodes.length === 0) return [];
	const targetNodes = markerKey ? nodes.filter((node) => hasTargetMarker(node, markerKey)) : name ? nodes.filter((node) => isTargetComponent(node, name)) : nodes;
	return targetNodes.map((node) => resolveVNodeProps(node, void 0, markerKey)).filter((item, index) => {
		if (Object.keys(item).length > 0) return true;
		return isComponentVNode(targetNodes[index]);
	});
}

//#endregion
export { resolveSlotsNode, resolveVNodeProps };