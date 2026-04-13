import { __exports as es_promise_catch } from '../../../_virtual/es.promise.catch.js';
import { __require as require_export } from '../internals/export.js';
import { __require as requireIsPure } from '../internals/is-pure.js';
import { __require as requirePromiseConstructorDetection } from '../internals/promise-constructor-detection.js';
import { __require as requirePromiseNativeConstructor } from '../internals/promise-native-constructor.js';
import { __require as requireGetBuiltIn } from '../internals/get-built-in.js';
import { __require as requireIsCallable } from '../internals/is-callable.js';
import { __require as requireDefineBuiltIn } from '../internals/define-built-in.js';

var hasRequiredEs_promise_catch;

function requireEs_promise_catch () {
	if (hasRequiredEs_promise_catch) return es_promise_catch;
	hasRequiredEs_promise_catch = 1;
	var $ = require_export();
	var IS_PURE = requireIsPure();
	var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var getBuiltIn = requireGetBuiltIn();
	var isCallable = requireIsCallable();
	var defineBuiltIn = requireDefineBuiltIn();

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

	// `Promise.prototype.catch` method
	// https://tc39.es/ecma262/#sec-promise.prototype.catch
	$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
	  'catch': function (onRejected) {
	    return this.then(undefined, onRejected);
	  }
	});

	// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
	if (!IS_PURE && isCallable(NativePromiseConstructor)) {
	  var method = getBuiltIn('Promise').prototype['catch'];
	  if (NativePromisePrototype['catch'] !== method) {
	    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
	  }
	}
	return es_promise_catch;
}

export { requireEs_promise_catch as __require };
