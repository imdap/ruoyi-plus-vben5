import { __exports as es_array_fill } from '../../../_virtual/es.array.fill2.js';
import { __require as require_export } from '../internals/export.js';
import { __require as requireArrayFill } from '../internals/array-fill.js';
import { __require as requireAddToUnscopables } from '../internals/add-to-unscopables.js';

var hasRequiredEs_array_fill;

function requireEs_array_fill () {
	if (hasRequiredEs_array_fill) return es_array_fill;
	hasRequiredEs_array_fill = 1;
	var $ = require_export();
	var fill = requireArrayFill();
	var addToUnscopables = requireAddToUnscopables();

	// `Array.prototype.fill` method
	// https://tc39.es/ecma262/#sec-array.prototype.fill
	$({ target: 'Array', proto: true }, {
	  fill: fill
	});

	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('fill');
	return es_array_fill;
}

export { requireEs_array_fill as __require };
