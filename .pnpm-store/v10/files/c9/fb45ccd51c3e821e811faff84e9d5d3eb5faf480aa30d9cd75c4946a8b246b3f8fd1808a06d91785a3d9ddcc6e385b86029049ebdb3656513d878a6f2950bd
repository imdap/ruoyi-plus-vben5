import { __exports as es_promise_reject } from '../../../_virtual/es.promise.reject.js';
import { __require as require_export } from '../internals/export.js';
import { __require as requireNewPromiseCapability } from '../internals/new-promise-capability.js';
import { __require as requirePromiseConstructorDetection } from '../internals/promise-constructor-detection.js';

var hasRequiredEs_promise_reject;

function requireEs_promise_reject () {
	if (hasRequiredEs_promise_reject) return es_promise_reject;
	hasRequiredEs_promise_reject = 1;
	var $ = require_export();
	var newPromiseCapabilityModule = requireNewPromiseCapability();
	var FORCED_PROMISE_CONSTRUCTOR = requirePromiseConstructorDetection().CONSTRUCTOR;

	// `Promise.reject` method
	// https://tc39.es/ecma262/#sec-promise.reject
	$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
	  reject: function reject(r) {
	    var capability = newPromiseCapabilityModule.f(this);
	    var capabilityReject = capability.reject;
	    capabilityReject(r);
	    return capability.promise;
	  }
	});
	return es_promise_reject;
}

export { requireEs_promise_reject as __require };
