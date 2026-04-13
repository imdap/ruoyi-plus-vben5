"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSASS;
var _fs = _interopRequireDefault(require("fs"));
var _lodash = _interopRequireDefault(require("lodash"));
var _path = _interopRequireDefault(require("path"));
var _requirePackageName = _interopRequireDefault(require("require-package-name"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const importModuleRegex = /@(?:use|import|forward)\s+['"]([^'"]+)['"]/gm;
// Paths prefixed with "~" or "node_modules/" are both considered paths to external deps in node_modules
const nodeModulePrefixRegex = /^~|^(?:\.[\\/])?node_modules[\\/]/;

/**
 * Sass allows omitting different parts of file path when importing files from relative paths:
 * - relative path prefix can be omitted "./" (Sass tries to import from current file directory first)
 * - underscore "_" prefix of partials can be omitted (https://sass-lang.com/guide/#partials)
 * - sass/scss file extension can be omitted
 * Reference: https://sass-lang.com/documentation/at-rules/import/#finding-the-file
 * This filter checks for existence of a file on every possible relative path and then filters those out.
 */
function isModuleOnRelativePath(filename, importPath) {
  if (importPath.startsWith('./') || importPath.startsWith('../')) {
    return true;
  }
  const basePath = _path.default.dirname(filename);
  const extension = _path.default.extname(filename);
  const pathWithExtension = _path.default.extname(importPath) !== '' ? importPath : importPath + extension;
  const pathWithUnderscorePrefix = _path.default.join(_path.default.dirname(pathWithExtension), `_${_path.default.basename(pathWithExtension)}`);
  const possiblePaths = [_path.default.join(basePath, pathWithExtension), _path.default.join(basePath, pathWithUnderscorePrefix)];
  return possiblePaths.some(modulePath => _fs.default.existsSync(modulePath));
}
async function parseSASS(filename) {
  const sassString = _fs.default.readFileSync(filename).toString();

  // https://sass-lang.com/documentation/at-rules/import/#load-paths
  const deps = Array.from(sassString.matchAll(importModuleRegex))
  // Pick the matched group
  .map(([, match]) => match.startsWith('sass:') ? 'sass' // Add 'sass' dependency for built-in modules
  : match.replace(nodeModulePrefixRegex, '')).filter(importPath => !isModuleOnRelativePath(filename, importPath)).map(_requirePackageName.default);
  return _lodash.default.uniq(deps);
}
module.exports = exports.default;