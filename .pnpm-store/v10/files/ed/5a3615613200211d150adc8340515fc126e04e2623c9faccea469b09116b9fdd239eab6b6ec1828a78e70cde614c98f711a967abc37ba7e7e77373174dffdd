"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseJest;
var _path = _interopRequireDefault(require("path"));
var _lodash = _interopRequireDefault(require("lodash"));
var _file = require("../utils/file");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const _ = _lodash.default;
const jestConfigRegex = /^jest.([^.]+\.)?conf(ig|)\.(cjs|mjs|js|json|ts)$/;
const supportedProperties = ['dependencyExtractor', 'preset', 'prettierPath', 'reporters', 'runner', 'setupFiles', 'setupFilesAfterEnv', 'snapshotResolver', 'snapshotSerializers', 'testEnvironment', 'testResultsProcessor', 'testRunner', 'transform', 'watchPlugins'];
function parse(content) {
  try {
    return JSON.parse(content);
  } catch (error) {
    return {}; // ignore parse error silently
  }
}

function contain(array, dep, prefix) {
  if (!array) {
    return false;
  }
  if (typeof array === 'string') {
    return contain([array], dep, prefix);
  }

  // extract name if wrapping with options
  const names = array.map(item => _lodash.default.isString(item) ? item : item[0]);
  if (names.indexOf(dep) !== -1) {
    return true;
  }
  if (prefix && dep.indexOf(prefix) === 0) {
    return contain(array, dep.substring(prefix.length), false);
  }
  return false;
}
function removeNodeModuleRelativePaths(filepath) {
  if (Array.isArray(filepath)) {
    return removeNodeModuleRelativePaths(filepath[0]);
  }
  return filepath.replace(/^.*node_modules\//, '')
  // Strip off subdirectories or exports from package name,
  // e.g. @foo/bar/baz -> @foo/bar, bar/baz -> baz
  .replace(/^((?:@[^/]+\/)?[^@/]+)(?:\/.*)?/, '$1');
}
function filter(deps, options) {
  const runner = deps.filter(dep => contain(options.runner, dep, 'jest-runner-'));
  const watchPlugins = deps.filter(dep => contain(options.watchPlugins, dep, 'jest-watch-'));
  const otherProps = (0, _lodash.default)(options).entries().map(([prop, value]) => {
    if (prop === 'transform') {
      return _.values(value).map(removeNodeModuleRelativePaths);
    }
    if (Array.isArray(value)) {
      return value.map(removeNodeModuleRelativePaths);
    }
    return removeNodeModuleRelativePaths(value);
  }).flatten().intersection(deps).value();
  return _.uniq(runner.concat(watchPlugins).concat(otherProps));
}
function checkOptions(deps, options = {}) {
  const pickedOptions = (0, _lodash.default)(options).pick(supportedProperties).value();
  const baseFoundDeps = filter(deps, pickedOptions);
  if (options.projects) {
    const projectDeps = options.projects.map(projectConfig => checkOptions(deps, projectConfig));
    return baseFoundDeps.concat(...projectDeps);
  }
  return baseFoundDeps;
}
async function parseJest(filename, deps, rootDir) {
  const basename = _path.default.basename(filename);
  if (jestConfigRegex.test(basename)) {
    try {
      var _require;
      // eslint-disable-next-line global-require
      const config = (_require = require(filename)) !== null && _require !== void 0 ? _require : {};
      const options = _path.default.extname(filename) === '.ts' ? config.default : config;
      return checkOptions(deps, options);
    } catch (error) {
      return [];
    }
  }
  const packageJsonPath = _path.default.resolve(rootDir, 'package.json');
  const resolvedFilePath = _path.default.resolve(rootDir, filename);
  if (resolvedFilePath === packageJsonPath) {
    const content = await (0, _file.getContent)(filename);
    const metadata = parse(content);
    return checkOptions(deps, metadata.jest);
  }
  return [];
}
module.exports = exports.default;