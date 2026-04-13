import { __require as requirePromiseNativeConstructor } from './promise-native-constructor.js';
import { __require as requireCheckCorrectnessOfIteration } from './check-correctness-of-iteration.js';
import { __require as requirePromiseConstructorDetection } from './promise-constructor-detection.js';

var promiseStaticsIncorrectIteration;
var hasRequiredPromiseStaticsIncorrectIteration;

function requirePromiseStaticsIncorrectIteration () {
	if (hasRequiredPromiseStaticsIncorrectIteration) return promiseStaticsIncorrectIteration;
	hasRequiredPromiseStaticsIncorrectIteration = 1;
	var NativePromiseConstructor = requirePromiseNativeConstructor();
	var checkCorrectnessOfIteration = requireCheckCorrectnessOfIteration();
	var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;

	promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
	  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });
	});
	return promiseStaticsIncorrectIteration;
}

export { requirePromiseStaticsIncorrectIteration as __require };
