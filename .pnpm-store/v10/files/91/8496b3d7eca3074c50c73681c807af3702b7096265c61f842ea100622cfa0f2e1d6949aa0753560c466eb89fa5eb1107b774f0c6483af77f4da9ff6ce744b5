import { __require as requireGlobalThis } from './global-this.js';
import { __require as requirePromiseNativeConstructor } from './promise-native-constructor.js';
import { __require as requireIsCallable } from './is-callable.js';
import { __require as requireIsForced } from './is-forced.js';
import { __require as requireInspectSource } from './inspect-source.js';
import { __require as requireWellKnownSymbol } from './well-known-symbol.js';
import { __require as requireEnvironment } from './environment.js';
import { __require as requireIsPure } from './is-pure.js';
import { __require as requireEnvironmentV8Version } from './environment-v8-version.js';

var promiseConstructorDetection;
var hasRequiredPromiseConstructorDetection;

function requirePromiseConstructorDetection () {
	if (hasRequiredPromiseConstructorDetection) return promiseConstructorDetection;
	hasRequiredPromiseConstructorDetection = 1;
	var globalThis = requireGlobalThis();
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var isCallable = requireIsCallable();
	var isForced = requireIsForced();
	var inspectSource = requireInspectSource();
	var wellKnownSymbol = requireWellKnownSymbol();
	var ENVIRONMENT = requireEnvironment();
	var IS_PURE = requireIsPure();
	var V8_VERSION = requireEnvironmentV8Version();

	var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
	var SPECIES = wellKnownSymbol('species');
	var SUBCLASSING = false;
	var NATIVE_PROMISE_REJECTION_EVENT = isCallable(globalThis.PromiseRejectionEvent);

	var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
	  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
	  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
	  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	  // We can't detect it synchronously, so just check versions
	  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
	  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
	  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
	    // Detect correctness of subclassing with @@species support
	    var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });
	    var FakePromise = function (exec) {
	      exec(function () { /* empty */ }, function () { /* empty */ });
	    };
	    var constructor = promise.constructor = {};
	    constructor[SPECIES] = FakePromise;
	    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
	    if (!SUBCLASSING) return true;
	  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	  } return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === 'BROWSER' || ENVIRONMENT === 'DENO') && !NATIVE_PROMISE_REJECTION_EVENT;
	});

	promiseConstructorDetection = {
	  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
	  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
	  SUBCLASSING: SUBCLASSING
	};
	return promiseConstructorDetection;
}

export { requirePromiseConstructorDetection as __require };
