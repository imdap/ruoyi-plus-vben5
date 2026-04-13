import { __require as requireFunctionBindContext } from './function-bind-context.js';
import { __require as requireFunctionCall } from './function-call.js';
import { __require as requireToObject } from './to-object.js';
import { __require as requireCallWithSafeIterationClosing } from './call-with-safe-iteration-closing.js';
import { __require as requireIsArrayIteratorMethod } from './is-array-iterator-method.js';
import { __require as requireIsConstructor } from './is-constructor.js';
import { __require as requireLengthOfArrayLike } from './length-of-array-like.js';
import { __require as requireCreateProperty } from './create-property.js';
import { __require as requireGetIterator } from './get-iterator.js';
import { __require as requireGetIteratorMethod } from './get-iterator-method.js';

var arrayFrom;
var hasRequiredArrayFrom;

function requireArrayFrom () {
	if (hasRequiredArrayFrom) return arrayFrom;
	hasRequiredArrayFrom = 1;
	var bind = requireFunctionBindContext();
	var call = requireFunctionCall();
	var toObject = requireToObject();
	var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();
	var isArrayIteratorMethod = requireIsArrayIteratorMethod();
	var isConstructor = requireIsConstructor();
	var lengthOfArrayLike = requireLengthOfArrayLike();
	var createProperty = requireCreateProperty();
	var getIterator = requireGetIterator();
	var getIteratorMethod = requireGetIteratorMethod();

	var $Array = Array;

	// `Array.from` method implementation
	// https://tc39.es/ecma262/#sec-array.from
	arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	  var O = toObject(arrayLike);
	  var IS_CONSTRUCTOR = isConstructor(this);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
	  var iteratorMethod = getIteratorMethod(O);
	  var index = 0;
	  var length, result, step, iterator, next, value;
	  // if the target is not iterable or it's an array with the default iterator - use a simple case
	  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
	    result = IS_CONSTRUCTOR ? new this() : [];
	    iterator = getIterator(O, iteratorMethod);
	    next = iterator.next;
	    for (;!(step = call(next, iterator)).done; index++) {
	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
	      createProperty(result, index, value);
	    }
	  } else {
	    length = lengthOfArrayLike(O);
	    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
	    for (;length > index; index++) {
	      value = mapping ? mapfn(O[index], index) : O[index];
	      createProperty(result, index, value);
	    }
	  }
	  result.length = index;
	  return result;
	};
	return arrayFrom;
}

export { requireArrayFrom as __require };
