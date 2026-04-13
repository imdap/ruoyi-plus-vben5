import { __require as requireFunctionUncurryThisClause } from './function-uncurry-this-clause.js';
import { __require as requireACallable } from './a-callable.js';
import { __require as requireFunctionBindNative } from './function-bind-native.js';

var functionBindContext;
var hasRequiredFunctionBindContext;

function requireFunctionBindContext () {
	if (hasRequiredFunctionBindContext) return functionBindContext;
	hasRequiredFunctionBindContext = 1;
	var uncurryThis = requireFunctionUncurryThisClause();
	var aCallable = requireACallable();
	var NATIVE_BIND = requireFunctionBindNative();

	var bind = uncurryThis(uncurryThis.bind);

	// optional / simple context binding
	functionBindContext = function (fn, that) {
	  aCallable(fn);
	  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};
	return functionBindContext;
}

export { requireFunctionBindContext as __require };
