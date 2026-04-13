const tuple = (...args) => args;
const tupleNum = (...args) => args;
function withInstall(comp) {
	const c = comp;
	c.install = function(app) {
		app.component(c.displayName || c.name, comp);
	};
	return comp;
}
function eventType() {
	return { type: [Function, Array] };
}
function objectType(defaultVal) {
	return {
		type: Object,
		default: defaultVal
	};
}
function booleanType(defaultVal) {
	return {
		type: Boolean,
		default: defaultVal
	};
}
function functionType(defaultVal) {
	return {
		type: Function,
		default: defaultVal
	};
}
function anyType(defaultVal, required) {
	const type = {
		validator: () => true,
		default: defaultVal
	};
	return required ? type : type;
}
function vNodeType() {
	return { validator: () => true };
}
function arrayType(defaultVal) {
	return {
		type: Array,
		default: defaultVal
	};
}
function stringType(defaultVal) {
	return {
		type: String,
		default: defaultVal
	};
}
function someType(types, defaultVal) {
	return types ? {
		type: types,
		default: defaultVal
	} : anyType(defaultVal);
}
export { anyType, arrayType, booleanType, eventType, functionType, objectType, someType, stringType, tuple, tupleNum, vNodeType, withInstall };
