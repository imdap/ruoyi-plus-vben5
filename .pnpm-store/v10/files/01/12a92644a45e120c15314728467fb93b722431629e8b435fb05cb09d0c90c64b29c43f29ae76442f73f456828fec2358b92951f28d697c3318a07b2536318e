import { __exports as es_promise_all } from '../../../_virtual/es.promise.all.js';
import { __require as require_export } from '../internals/export.js';
import { __require as requireFunctionCall } from '../internals/function-call.js';
import { __require as requireACallable } from '../internals/a-callable.js';
import { __require as requireNewPromiseCapability } from '../internals/new-promise-capability.js';
import { __require as requirePerform } from '../internals/perform.js';
import { __require as requireIterate } from '../internals/iterate.js';
import { __require as requirePromiseStaticsIncorrectIteration } from '../internals/promise-statics-incorrect-iteration.js';

var hasRequiredEs_promise_all;

function requireEs_promise_all () {
	if (hasRequiredEs_promise_all) return es_promise_all;
	hasRequiredEs_promise_all = 1;
	var $ = require_export();
	var call = requireFunctionCall();
	var aCallable = requireACallable();
	var newPromiseCapabilityModule = requireNewPromiseCapability();
	var perform = requirePerform();
	var iterate = requireIterate();
	var PROMISE_STATICS_INCORRECT_ITERATION = requirePromiseStaticsIncorrectIteration();

	// `Promise.all` method
	// https://tc39.es/ecma262/#sec-promise.all
	$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapabilityModule.f(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aCallable(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        remaining++;
	        call($promiseResolve, C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});
	return es_promise_all;
}

export { requireEs_promise_all as __require };
