import { __exports as es_promise } from '../../../_virtual/es.promise2.js';
import { __require as requireEs_promise_constructor } from './es.promise.constructor.js';
import { __require as requireEs_promise_all } from './es.promise.all.js';
import { __require as requireEs_promise_catch } from './es.promise.catch.js';
import { __require as requireEs_promise_race } from './es.promise.race.js';
import { __require as requireEs_promise_reject } from './es.promise.reject.js';
import { __require as requireEs_promise_resolve } from './es.promise.resolve.js';

var hasRequiredEs_promise;

function requireEs_promise () {
	if (hasRequiredEs_promise) return es_promise;
	hasRequiredEs_promise = 1;
	// TODO: Remove this module from `core-js@4` since it's split to modules listed below
	requireEs_promise_constructor();
	requireEs_promise_all();
	requireEs_promise_catch();
	requireEs_promise_race();
	requireEs_promise_reject();
	requireEs_promise_resolve();
	return es_promise;
}

export { requireEs_promise as __require };
