import { __require as requireEnvironmentUserAgent } from './environment-user-agent.js';

var environmentIsIosPebble;
var hasRequiredEnvironmentIsIosPebble;

function requireEnvironmentIsIosPebble () {
	if (hasRequiredEnvironmentIsIosPebble) return environmentIsIosPebble;
	hasRequiredEnvironmentIsIosPebble = 1;
	var userAgent = requireEnvironmentUserAgent();

	environmentIsIosPebble = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble != 'undefined';
	return environmentIsIosPebble;
}

export { requireEnvironmentIsIosPebble as __require };
