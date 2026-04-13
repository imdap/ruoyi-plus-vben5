import { __require as requireEnvironmentUserAgent } from './environment-user-agent.js';

var environmentIsWebosWebkit;
var hasRequiredEnvironmentIsWebosWebkit;

function requireEnvironmentIsWebosWebkit () {
	if (hasRequiredEnvironmentIsWebosWebkit) return environmentIsWebosWebkit;
	hasRequiredEnvironmentIsWebosWebkit = 1;
	var userAgent = requireEnvironmentUserAgent();

	environmentIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);
	return environmentIsWebosWebkit;
}

export { requireEnvironmentIsWebosWebkit as __require };
