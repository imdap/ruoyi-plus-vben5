import { __require as requireAnObject } from './an-object.js';
import { __require as requireIteratorClose } from './iterator-close.js';

var callWithSafeIterationClosing;
var hasRequiredCallWithSafeIterationClosing;

function requireCallWithSafeIterationClosing () {
	if (hasRequiredCallWithSafeIterationClosing) return callWithSafeIterationClosing;
	hasRequiredCallWithSafeIterationClosing = 1;
	var anObject = requireAnObject();
	var iteratorClose = requireIteratorClose();

	// call something on iterator step with safe closing on error
	callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  } catch (error) {
	    iteratorClose(iterator, 'throw', error);
	  }
	};
	return callWithSafeIterationClosing;
}

export { requireCallWithSafeIterationClosing as __require };
