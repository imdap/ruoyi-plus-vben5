import { SemverRange } from 'sver';
import { resolveLatestTarget as resolveLatestTargetJspm, pkgToUrl as pkgToUrlJspm } from './jspm.js';
export const nodeBuiltinSet = new Set([
    '_http_agent',
    '_http_client',
    '_http_common',
    '_http_incoming',
    '_http_outgoing',
    '_http_server',
    '_stream_duplex',
    '_stream_passthrough',
    '_stream_readable',
    '_stream_transform',
    '_stream_wrap',
    '_stream_writable',
    '_tls_common',
    '_tls_wrap',
    'assert',
    'assert/strict',
    'async_hooks',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'constants',
    'crypto',
    'dgram',
    'diagnostics_channel',
    'dns',
    'dns/promises',
    'domain',
    'events',
    'fs',
    'fs/promises',
    'http',
    'http2',
    'https',
    'inspector',
    'module',
    'net',
    'os',
    'path',
    'path/posix',
    'path/win32',
    'perf_hooks',
    'process',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'stream/promises',
    'string_decoder',
    'sys',
    'timers',
    'timers/promises',
    'tls',
    'trace_events',
    'tty',
    'url',
    'util',
    'util/types',
    'v8',
    'vm',
    'wasi',
    'worker_threads',
    'zlib'
]);
export function pkgToUrl(pkg, layer) {
    if (pkg.registry !== 'node') return pkgToUrlJspm(pkg, layer);
    return `node:${pkg.name}/`;
}
export function resolveBuiltin(specifier, env) {
    let builtin = specifier.startsWith('node:') ? specifier.slice(5) : nodeBuiltinSet.has(specifier) ? specifier : null;
    if (!builtin) return;
    // Deno supports all node builtins via bare "node:XXX" specifiers. As of
    // std@0.178.0, the standard library no longer ships node polyfills, so we
    // should always install builtins as base specifiers. This does mean that we
    // no longer support old versions of deno unless they use --compat.
    if (env.includes('deno') || env.includes('node')) {
        return `node:${builtin}`;
    }
    // Strip the subpath for subpathed builtins
    if (builtin.includes('/')) builtin = builtin.split('/')[0];
    return {
        target: {
            registry: 'npm',
            name: '@jspm/core',
            range: new SemverRange('*'),
            unstable: true
        },
        subpath: `./nodelibs/${builtin}`
    };
}
// Special "." export means a file package (not a folder package)
export async function getPackageConfig() {
    return {
        exports: {
            '.': '.'
        }
    };
}
export async function resolveLatestTarget(target, layer, parentUrl, resolver) {
    if (target.registry !== 'npm' || target.name !== '@jspm/core') return null;
    return resolveLatestTargetJspm.call(this, {
        registry: 'npm',
        name: '@jspm/core',
        range: new SemverRange('*'),
        unstable: true
    }, layer, parentUrl, resolver);
}
export function parseUrlPkg(url) {
    if (!url.startsWith('node:')) return;
    let name = url.slice(5);
    if (name.endsWith('/')) name = name.slice(0, -1);
    return {
        registry: 'node',
        name,
        version: ''
    };
}


//# sourceMappingURL=node.js.map