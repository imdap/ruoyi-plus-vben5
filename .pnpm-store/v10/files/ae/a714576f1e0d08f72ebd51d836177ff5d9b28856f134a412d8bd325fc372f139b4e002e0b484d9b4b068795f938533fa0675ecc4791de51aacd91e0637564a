import { __require as requireGlobalThis } from './global-this.js';
import { __require as requireSafeGetBuiltIn } from './safe-get-built-in.js';
import { __require as requireFunctionBindContext } from './function-bind-context.js';
import { __require as requireTask } from './task.js';
import { __require as requireQueue } from './queue.js';
import { __require as requireEnvironmentIsIos } from './environment-is-ios.js';
import { __require as requireEnvironmentIsIosPebble } from './environment-is-ios-pebble.js';
import { __require as requireEnvironmentIsWebosWebkit } from './environment-is-webos-webkit.js';
import { __require as requireEnvironmentIsNode } from './environment-is-node.js';

var microtask_1;
var hasRequiredMicrotask;

function requireMicrotask () {
	if (hasRequiredMicrotask) return microtask_1;
	hasRequiredMicrotask = 1;
	var globalThis = requireGlobalThis();
	var safeGetBuiltIn = requireSafeGetBuiltIn();
	var bind = requireFunctionBindContext();
	var macrotask = requireTask().set;
	var Queue = requireQueue();
	var IS_IOS = requireEnvironmentIsIos();
	var IS_IOS_PEBBLE = requireEnvironmentIsIosPebble();
	var IS_WEBOS_WEBKIT = requireEnvironmentIsWebosWebkit();
	var IS_NODE = requireEnvironmentIsNode();

	var MutationObserver = globalThis.MutationObserver || globalThis.WebKitMutationObserver;
	var document = globalThis.document;
	var process = globalThis.process;
	var Promise = globalThis.Promise;
	var microtask = safeGetBuiltIn('queueMicrotask');
	var notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!microtask) {
	  var queue = new Queue();

	  var flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process.domain)) parent.exit();
	    while (fn = queue.get()) try {
	      fn();
	    } catch (error) {
	      if (queue.head) notify();
	      throw error;
	    }
	    if (parent) parent.enter();
	  };

	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
	  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise.resolve(undefined);
	    // workaround of WebKit ~ iOS Safari 10.1 bug
	    promise.constructor = Promise;
	    then = bind(promise.then, promise);
	    notify = function () {
	      then(flush);
	    };
	  // Node.js without promises
	  } else if (IS_NODE) {
	    notify = function () {
	      process.nextTick(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessage
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    // `webpack` dev server bug on IE global methods - use bind(fn, global)
	    macrotask = bind(macrotask, globalThis);
	    notify = function () {
	      macrotask(flush);
	    };
	  }

	  microtask = function (fn) {
	    if (!queue.head) notify();
	    queue.add(fn);
	  };
	}

	microtask_1 = microtask;
	return microtask_1;
}

export { requireMicrotask as __require };
