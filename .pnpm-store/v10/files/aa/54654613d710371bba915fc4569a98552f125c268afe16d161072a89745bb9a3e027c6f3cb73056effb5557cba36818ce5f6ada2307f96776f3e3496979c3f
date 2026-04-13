"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomConfig = getCustomConfig;
exports.loadConfig = loadConfig;
exports.parse = parse;
var _jsYaml = _interopRequireDefault(require("js-yaml"));
var path = _interopRequireWildcard(require("path"));
var fs = _interopRequireWildcard(require("fs"));
var JSON5 = _interopRequireWildcard(require("json5"));
var _ = require(".");
var _getScripts = _interopRequireDefault(require("./get-scripts"));
var _file = require("./file");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const optionKeysForConfig = {
  babel: ['--config-file'],
  eslint: ['--config', '-c'],
  tslint: ['--config', '-c']
};
function parse(content) {
  try {
    return JSON.parse(content);
  } catch (error) {
    // not JSON format
  }
  try {
    return JSON5.parse(content);
  } catch (error) {
    // not JSON5 format
  }
  try {
    return _jsYaml.default.safeLoad(content);
  } catch (error) {
    // not YAML format
  }
  try {
    return (0, _.evaluate)(`module.exports = ${content}`);
  } catch (error) {
    // not valid JavaScript code
  }
  try {
    return (0, _.evaluate)(content);
  } catch (error) {
    // not valid JavaScript code
  }

  // parse fail, return nothing
  return null;
}
async function getCustomConfig(binName, filename, rootDir) {
  const scripts = await (0, _getScripts.default)(filename);
  if (scripts.length === 0) {
    return null;
  }
  const script = scripts.find(s => s.split(/\s+/).includes(binName));
  if (script) {
    const commands = script.split('&&');
    const command = commands.find(c => c.startsWith(binName));
    const optionsKeys = optionKeysForConfig[binName];
    if (command && optionsKeys) {
      const args = command.split(/\s+/);
      const configIdx = args.findIndex(arg => optionsKeys.includes(arg));
      if (configIdx !== -1 && args[configIdx + 1]) {
        const configFile = args[configIdx + 1];
        const configPath = path.resolve(rootDir, configFile);
        const configContent = fs.readFileSync(configPath);
        return parse(configContent);
      }
    }
  }
  return null;
}
async function loadConfig(binName, filenameRegex, filename, rootDir) {
  const basename = path.basename(filename);
  if (filenameRegex.test(basename)) {
    const requireConfig = (0, _.tryRequire)(filename);
    if (requireConfig) {
      return requireConfig;
    }
    const content = await (0, _file.getContent)(filename);
    const config = parse(content);
    return config;
  }
  const custom = await getCustomConfig(binName, filename, rootDir);
  if (custom) {
    return custom;
  }
  return null;
}