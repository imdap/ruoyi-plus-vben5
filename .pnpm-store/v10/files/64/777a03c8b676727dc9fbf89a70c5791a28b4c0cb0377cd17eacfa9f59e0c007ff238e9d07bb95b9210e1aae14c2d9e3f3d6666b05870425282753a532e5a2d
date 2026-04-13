import { __require as requireGlobalThis } from './global-this.js';
import { __require as requireDescriptors } from './descriptors.js';

var safeGetBuiltIn;
var hasRequiredSafeGetBuiltIn;

function requireSafeGetBuiltIn () {
	if (hasRequiredSafeGetBuiltIn) return safeGetBuiltIn;
	hasRequiredSafeGetBuiltIn = 1;
	var globalThis = requireGlobalThis();
	var DESCRIPTORS = requireDescriptors();

	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Avoid NodeJS experimental warning
	safeGetBuiltIn = function (name) {
	  if (!DESCRIPTORS) return globalThis[name];
	  var descriptor = getOwnPropertyDescriptor(globalThis, name);
	  return descriptor && descriptor.value;
	};
	return safeGetBuiltIn;
}

export { requireSafeGetBuiltIn as __require };
