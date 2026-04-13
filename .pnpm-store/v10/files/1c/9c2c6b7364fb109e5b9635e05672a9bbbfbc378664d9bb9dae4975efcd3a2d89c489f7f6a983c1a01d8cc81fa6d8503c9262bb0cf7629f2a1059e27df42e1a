import { __require as requireWellKnownSymbol } from './well-known-symbol.js';
import { __require as requireIterators } from './iterators.js';

var isArrayIteratorMethod;
var hasRequiredIsArrayIteratorMethod;

function requireIsArrayIteratorMethod () {
	if (hasRequiredIsArrayIteratorMethod) return isArrayIteratorMethod;
	hasRequiredIsArrayIteratorMethod = 1;
	var wellKnownSymbol = requireWellKnownSymbol();
	var Iterators = requireIterators();

	var ITERATOR = wellKnownSymbol('iterator');
	var ArrayPrototype = Array.prototype;

	// check on default Array iterator
	isArrayIteratorMethod = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
	};
	return isArrayIteratorMethod;
}

export { requireIsArrayIteratorMethod as __require };
