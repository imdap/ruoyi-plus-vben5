import { __exports as es_array_includes } from '../../../_virtual/es.array.includes2.js';
import { __require as require_export } from '../internals/export.js';
import { __require as requireArrayIncludes } from '../internals/array-includes.js';
import { __require as requireFails } from '../internals/fails.js';
import { __require as requireAddToUnscopables } from '../internals/add-to-unscopables.js';

var hasRequiredEs_array_includes;

function requireEs_array_includes () {
	if (hasRequiredEs_array_includes) return es_array_includes;
	hasRequiredEs_array_includes = 1;
	var $ = require_export();
	var $includes = requireArrayIncludes().includes;
	var fails = requireFails();
	var addToUnscopables = requireAddToUnscopables();

	// FF99+ bug
	var BROKEN_ON_SPARSE = fails(function () {
	  // eslint-disable-next-line es/no-array-prototype-includes -- detection
	  return !Array(1).includes();
	});

	// `Array.prototype.includes` method
	// https://tc39.es/ecma262/#sec-array.prototype.includes
	$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');
	return es_array_includes;
}

export { requireEs_array_includes as __require };
