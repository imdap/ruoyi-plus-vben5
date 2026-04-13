"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseServerless;
var path = _interopRequireWildcard(require("path"));
var _jsYaml = _interopRequireDefault(require("js-yaml"));
var _file = require("../utils/file");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Get plugin names from a yaml object.
 * @param {*} yml parsed serverless configuration
 */
function getPlugins(serverlessConfig) {
  return serverlessConfig.plugins;
}

/**
 * Get the dependency names of the given plugins.
 * @param {*} plugins array of plugin names as strings
 */
function getDependencies(plugins) {
  return plugins;
}
async function parseServerless(filename) {
  const basename = path.basename(filename);
  if (basename === 'serverless.yml') {
    const content = await (0, _file.getContent)(filename);
    const config = _jsYaml.default.safeLoad(content);
    // TODO This detects plugins from the main serverless.yml, but you could have plugins in included files like this: "plugins: ${file(./serverless.plugins.yml)}"
    return ['serverless', ...getDependencies(getPlugins(config))];
  }
  return [];
}
module.exports = exports.default;