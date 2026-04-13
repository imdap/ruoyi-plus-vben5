import { __exports as es_array_from } from '../../../_virtual/es.array.from2.js';
import { __require as require_export } from '../internals/export.js';
import { __require as requireArrayFrom } from '../internals/array-from.js';
import { __require as requireCheckCorrectnessOfIteration } from '../internals/check-correctness-of-iteration.js';

var hasRequiredEs_array_from;

function requireEs_array_from () {
	if (hasRequiredEs_array_from) return es_array_from;
	hasRequiredEs_array_from = 1;
	var $ = require_export();
	var from = requireArrayFrom();
	var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();

	var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
	  // eslint-disable-next-line es/no-array-from -- required for testing
	  Array.from(iterable);
	});

	// `Array.from` method
	// https://tc39.es/ecma262/#sec-array.from
	$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
	  from: from
	});
	return es_array_from;
}

export { requireEs_array_from as __require };
