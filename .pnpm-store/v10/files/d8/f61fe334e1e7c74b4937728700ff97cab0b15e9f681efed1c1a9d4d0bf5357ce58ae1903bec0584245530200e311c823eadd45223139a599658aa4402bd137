import { __exports as es_promise_resolve } from '../../../_virtual/es.promise.resolve.js';
import { __require as require_export } from '../internals/export.js';
import { __require as requireGetBuiltIn } from '../internals/get-built-in.js';
import { __require as requireIsPure } from '../internals/is-pure.js';
import { __require as requirePromiseNativeConstructor } from '../internals/promise-native-constructor.js';
import { __require as requirePromiseConstructorDetection } from '../internals/promise-constructor-detection.js';
import { __require as requirePromiseResolve } from '../internals/promise-resolve.js';

var hasRequiredEs_promise_resolve;

function requireEs_promise_resolve () {
	if (hasRequiredEs_promise_resolve) return es_promise_resolve;
	hasRequiredEs_promise_resolve = 1;
	var $ = require_export();
	var getBuiltIn = requireGetBuiltIn();
	var IS_PURE = requireIsPure();
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;
	var promiseResolve = requirePromiseResolve();

	var PromiseConstructorWrapper = getBuiltIn('Promise');
	var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

	// `Promise.resolve` method
	// https://tc39.es/ecma262/#sec-promise.resolve
	$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
	  resolve: function resolve(x) {
	    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
	  }
	});
	return es_promise_resolve;
}

export { requireEs_promise_resolve as __require };
