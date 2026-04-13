import { __require as requireGlobalThis } from './global-this.js';
import { __require as requireEnvironmentUserAgent } from './environment-user-agent.js';
import { __require as requireClassofRaw } from './classof-raw.js';

var environment;
var hasRequiredEnvironment;

function requireEnvironment () {
	if (hasRequiredEnvironment) return environment;
	hasRequiredEnvironment = 1;
	/* global Bun, Deno -- detection */
	var globalThis = requireGlobalThis();
	var userAgent = requireEnvironmentUserAgent();
	var classof = requireClassofRaw();

	var userAgentStartsWith = function (string) {
	  return userAgent.slice(0, string.length) === string;
	};

	environment = (function () {
	  if (userAgentStartsWith('Bun/')) return 'BUN';
	  if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE';
	  if (userAgentStartsWith('Deno/')) return 'DENO';
	  if (userAgentStartsWith('Node.js/')) return 'NODE';
	  if (globalThis.Bun && typeof Bun.version == 'string') return 'BUN';
	  if (globalThis.Deno && typeof Deno.version == 'object') return 'DENO';
	  if (classof(globalThis.process) === 'process') return 'NODE';
	  if (globalThis.window && globalThis.document) return 'BROWSER';
	  return 'REST';
	})();
	return environment;
}

export { requireEnvironment as __require };
