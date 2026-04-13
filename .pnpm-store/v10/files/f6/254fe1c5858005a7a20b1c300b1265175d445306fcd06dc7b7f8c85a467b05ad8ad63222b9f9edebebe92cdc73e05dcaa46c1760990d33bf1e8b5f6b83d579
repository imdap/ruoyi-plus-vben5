import { __require as requireClassof } from './classof.js';
import { __require as requireGetMethod } from './get-method.js';
import { __require as requireIsNullOrUndefined } from './is-null-or-undefined.js';
import { __require as requireIterators } from './iterators.js';
import { __require as requireWellKnownSymbol } from './well-known-symbol.js';

var getIteratorMethod;
var hasRequiredGetIteratorMethod;

function requireGetIteratorMethod () {
	if (hasRequiredGetIteratorMethod) return getIteratorMethod;
	hasRequiredGetIteratorMethod = 1;
	var classof = requireClassof();
	var getMethod = requireGetMethod();
	var isNullOrUndefined = requireIsNullOrUndefined();
	var Iterators = requireIterators();
	var wellKnownSymbol = requireWellKnownSymbol();

	var ITERATOR = wellKnownSymbol('iterator');

	getIteratorMethod = function (it) {
	  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
	    || getMethod(it, '@@iterator')
	    || Iterators[classof(it)];
	};
	return getIteratorMethod;
}

export { requireGetIteratorMethod as __require };
