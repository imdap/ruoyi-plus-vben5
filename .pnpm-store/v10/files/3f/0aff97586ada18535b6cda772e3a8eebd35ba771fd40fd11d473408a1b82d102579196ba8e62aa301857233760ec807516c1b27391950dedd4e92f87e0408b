import { __exports as newPromiseCapability } from '../../../_virtual/new-promise-capability.js';
import { __require as requireACallable } from './a-callable.js';

var hasRequiredNewPromiseCapability;

function requireNewPromiseCapability () {
	if (hasRequiredNewPromiseCapability) return newPromiseCapability;
	hasRequiredNewPromiseCapability = 1;
	var aCallable = requireACallable();

	var $TypeError = TypeError;

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aCallable(resolve);
	  this.reject = aCallable(reject);
	};

	// `NewPromiseCapability` abstract operation
	// https://tc39.es/ecma262/#sec-newpromisecapability
	newPromiseCapability.f = function (C) {
	  return new PromiseCapability(C);
	};
	return newPromiseCapability;
}

export { requireNewPromiseCapability as __require };
