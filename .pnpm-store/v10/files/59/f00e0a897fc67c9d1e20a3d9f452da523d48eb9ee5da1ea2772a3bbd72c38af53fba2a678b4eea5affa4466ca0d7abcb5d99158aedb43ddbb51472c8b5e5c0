"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseTSLint;
var path = _interopRequireWildcard(require("path"));
var _requirePackageName = _interopRequireDefault(require("require-package-name"));
var _cliTools = require("../utils/cli-tools");
var _index = require("../utils/index");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function resolvePresetPackage(preset, rootDir) {
  if (preset.startsWith('./') || preset.startsWith('../')) {
    return path.resolve(rootDir, preset);
  }
  return preset;
}
function checkConfig(config, rootDir) {
  let rules = (0, _index.wrapToArray)(config.rulesDirectory).filter(ruleDir => !path.isAbsolute(ruleDir));
  const prettierPlugin = 'tslint-plugin-prettier';
  // If tslint-plugin-prettier is in tslint file
  // then it should also be activated, if not,
  // remove it from the list of used dependencies.
  if (rules.includes(prettierPlugin) && config.rules.prettier !== true) {
    rules = rules.filter(rule => rule !== prettierPlugin);
  }
  return (0, _index.wrapToArray)(config.extends).filter(preset => !preset.startsWith('tslint:')).map(preset => resolvePresetPackage(preset, rootDir)).filter(preset => !path.isAbsolute(preset)).map(_requirePackageName.default).concat(rules);
}
const configNameRegex = /^tslint\.(json|yaml|yml)$/;

/**
 * Parses TSLint configuration for dependencies.
 *
 * TSLint uses node resolution to load inherited configurations.
 * More info on this can be found
 * [here](https://palantir.github.io/tslint/usage/configuration/).
 */
async function parseTSLint(filename, deps, rootDir) {
  const config = await (0, _cliTools.loadConfig)('tslint', configNameRegex, filename, rootDir);
  if (config) {
    return ['tslint', ...checkConfig(config, rootDir)];
  }
  return [];
}
module.exports = exports.default;