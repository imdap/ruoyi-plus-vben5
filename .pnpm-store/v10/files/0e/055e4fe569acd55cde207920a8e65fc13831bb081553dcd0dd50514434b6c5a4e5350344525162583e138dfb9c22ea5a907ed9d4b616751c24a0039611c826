import { __require as requireFunctionCall } from './function-call.js';
import { __require as requireACallable } from './a-callable.js';
import { __require as requireAnObject } from './an-object.js';
import { __require as requireTryToString } from './try-to-string.js';
import { __require as requireGetIteratorMethod } from './get-iterator-method.js';

var getIterator;
var hasRequiredGetIterator;

function requireGetIterator () {
	if (hasRequiredGetIterator) return getIterator;
	hasRequiredGetIterator = 1;
	var call = requireFunctionCall();
	var aCallable = requireACallable();
	var anObject = requireAnObject();
	var tryToString = requireTryToString();
	var getIteratorMethod = requireGetIteratorMethod();

	var $TypeError = TypeError;

	getIterator = function (argument, usingIterator) {
	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
	  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
	  throw new $TypeError(tryToString(argument) + ' is not iterable');
	};
	return getIterator;
}

export { requireGetIterator as __require };
