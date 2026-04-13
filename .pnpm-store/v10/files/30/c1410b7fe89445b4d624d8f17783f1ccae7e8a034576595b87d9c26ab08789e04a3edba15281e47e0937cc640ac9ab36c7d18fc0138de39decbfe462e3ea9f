import { __require as requireToObject } from './to-object.js';
import { __require as requireToAbsoluteIndex } from './to-absolute-index.js';
import { __require as requireLengthOfArrayLike } from './length-of-array-like.js';

var arrayFill;
var hasRequiredArrayFill;

function requireArrayFill () {
	if (hasRequiredArrayFill) return arrayFill;
	hasRequiredArrayFill = 1;
	var toObject = requireToObject();
	var toAbsoluteIndex = requireToAbsoluteIndex();
	var lengthOfArrayLike = requireLengthOfArrayLike();

	// `Array.prototype.fill` method implementation
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject(this);
	  var length = lengthOfArrayLike(O);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};
	return arrayFill;
}

export { requireArrayFill as __require };
