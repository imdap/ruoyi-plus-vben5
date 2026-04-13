import { __require as requireAnObject } from './an-object.js';
import { __require as requireIsObject } from './is-object.js';
import { __require as requireNewPromiseCapability } from './new-promise-capability.js';

var promiseResolve;
var hasRequiredPromiseResolve;

function requirePromiseResolve () {
	if (hasRequiredPromiseResolve) return promiseResolve;
	hasRequiredPromiseResolve = 1;
	var anObject = requireAnObject();
	var isObject = requireIsObject();
	var newPromiseCapability = requireNewPromiseCapability();

	promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};
	return promiseResolve;
}

export { requirePromiseResolve as __require };
