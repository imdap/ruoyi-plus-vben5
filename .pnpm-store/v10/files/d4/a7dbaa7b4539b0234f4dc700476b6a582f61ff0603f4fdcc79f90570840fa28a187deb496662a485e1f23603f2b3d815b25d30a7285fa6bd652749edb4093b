import { __exports as es_promise_race } from '../../../_virtual/es.promise.race.js';
import { __require as require_export } from '../internals/export.js';
import { __require as requireFunctionCall } from '../internals/function-call.js';
import { __require as requireACallable } from '../internals/a-callable.js';
import { __require as requireNewPromiseCapability } from '../internals/new-promise-capability.js';
import { __require as requirePerform } from '../internals/perform.js';
import { __require as requireIterate } from '../internals/iterate.js';
import { __require as requirePromiseStaticsIncorrectIteration } from '../internals/promise-statics-incorrect-iteration.js';

var hasRequiredEs_promise_race;

function requireEs_promise_race () {
	if (hasRequiredEs_promise_race) return es_promise_race;
	hasRequiredEs_promise_race = 1;
	var $ = require_export();
	var call = requireFunctionCall();
	var aCallable = requireACallable();
	var newPromiseCapabilityModule = requireNewPromiseCapability();
	var perform = requirePerform();
	var iterate = requireIterate();
	var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();

	// `Promise.race` method
	// https://tc39.es/ecma262/#sec-promise.race
	$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule.f(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      iterate(iterable, function (promise) {
	        call($promiseResolve, C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});
	return es_promise_race;
}

export { requireEs_promise_race as __require };
