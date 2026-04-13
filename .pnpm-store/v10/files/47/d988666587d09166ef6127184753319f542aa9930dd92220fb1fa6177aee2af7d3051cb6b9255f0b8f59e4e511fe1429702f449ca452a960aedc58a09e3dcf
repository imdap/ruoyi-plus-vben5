"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _path = _interopRequireDefault(require("path"));
var _callsite = _interopRequireDefault(require("callsite"));
var _findupSync = _interopRequireDefault(require("findup-sync"));
var _resolveFrom = _interopRequireDefault(require("resolve-from"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (...args) => {
  const name = args.find(arg => typeof arg === 'string');
  const options = args.find(arg => typeof arg === 'object') || {};
  options.cwd = options.cwd || process.cwd();
  let pkg;
  try {
    const fullpath = name ? (0, _resolveFrom.default)(options.cwd, name) : (0, _callsite.default)()[1].getFileName();
    pkg = (0, _findupSync.default)('package.json', {
      cwd: _path.default.dirname(fullpath)
    });
  } catch {
    pkg = (0, _resolveFrom.default)(options.cwd, `${args[0]}/package.json`);
  }
  return _path.default.resolve(_path.default.dirname(pkg));
};
exports.default = _default;
module.exports = exports.default;