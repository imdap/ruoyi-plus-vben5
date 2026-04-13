import { __require as requireIsConstructor } from './is-constructor.js';
import { __require as requireTryToString } from './try-to-string.js';

var aConstructor;
var hasRequiredAConstructor;

function requireAConstructor () {
	if (hasRequiredAConstructor) return aConstructor;
	hasRequiredAConstructor = 1;
	var isConstructor = requireIsConstructor();
	var tryToString = requireTryToString();

	var $TypeError = TypeError;

	// `Assert: IsConstructor(argument) is true`
	aConstructor = function (argument) {
	  if (isConstructor(argument)) return argument;
	  throw new $TypeError(tryToString(argument) + ' is not a constructor');
	};
	return aConstructor;
}

export { requireAConstructor as __require };
