import { __require as requireGlobalThis } from './global-this.js';

var path;
var hasRequiredPath;

function requirePath () {
	if (hasRequiredPath) return path;
	hasRequiredPath = 1;
	var globalThis = requireGlobalThis();

	path = globalThis;
	return path;
}

export { requirePath as __require };
