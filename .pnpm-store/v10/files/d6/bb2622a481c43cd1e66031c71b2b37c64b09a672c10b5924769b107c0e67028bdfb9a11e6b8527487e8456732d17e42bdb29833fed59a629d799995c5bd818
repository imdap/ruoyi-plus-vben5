import { __require as requireGlobalThis } from './global-this.js';

var promiseNativeConstructor;
var hasRequiredPromiseNativeConstructor;

function requirePromiseNativeConstructor () {
	if (hasRequiredPromiseNativeConstructor) return promiseNativeConstructor;
	hasRequiredPromiseNativeConstructor = 1;
	var globalThis = requireGlobalThis();

	promiseNativeConstructor = globalThis.Promise;
	return promiseNativeConstructor;
}

export { requirePromiseNativeConstructor as __require };
