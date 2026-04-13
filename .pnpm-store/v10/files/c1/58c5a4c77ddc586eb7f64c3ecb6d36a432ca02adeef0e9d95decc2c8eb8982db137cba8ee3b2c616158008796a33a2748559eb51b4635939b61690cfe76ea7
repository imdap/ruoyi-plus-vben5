"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseWebpack;
var _path = _interopRequireDefault(require("path"));
var _lodash = _interopRequireDefault(require("lodash"));
var _utils = require("../utils");
var _webpack = require("../utils/webpack");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const webpackConfigRegex = /webpack(\..+)?\.conf(?:ig|)\.(babel\.)?[jt]s/;
const loaderTemplates = ['*-webpack-loader', '*-web-loader', '*-loader', '*'];
function extractLoaders(item) {
  if (!item) {
    return [];
  }
  if (typeof item === 'string') {
    return item;
  }
  if (Array.isArray(item)) {
    return item.map(extractLoaders);
  }
  if (item.loader && typeof item.loader === 'string') {
    return item.loader.split('!');
  }
  if (item.loaders) {
    return item.loaders.map(extractLoaders);
  }
  return [];
}
function stripQueryParameter(loader) {
  const index = loader.indexOf('?');
  return index === -1 ? loader : loader.substring(0, index);
}
function normalizeLoader(deps, loader) {
  const name = (0, _lodash.default)(loaderTemplates).map(template => template.replace('*', loader)).intersection(deps).first();
  return name;
}
function getLoaders(deps, loaders) {
  return (0, _lodash.default)(loaders || []).map(extractLoaders).flatten().map(loader => stripQueryParameter(loader)).map(loader => normalizeLoader(deps, loader)).filter(loader => loader).uniq().value();
}
function getBabelPresets(deps, loaders) {
  return (0, _lodash.default)(loaders || []).filter(item => typeof item !== 'string' && item.loader && item.loader === 'babel-loader' && item.options && item.options.presets && Array.isArray(item.options.presets)).map(item => item.options.presets).flatten().map(preset => Array.isArray(preset) && preset.length > 0 ? preset[0] : preset).filter(preset => typeof preset === 'string').intersection(deps).uniq().value();
}
function parseWebpack1(module, deps) {
  const loaders = getLoaders(deps, module.loaders);
  const preLoaders = getLoaders(deps, module.preLoaders);
  const postLoaders = getLoaders(deps, module.postLoaders);
  return [...loaders, ...preLoaders, ...postLoaders];
}
function mapRuleUse(module) {
  return module.rules
  // filter use or loader because 'loader' is a shortcut to 'use'
  .filter(rule => rule.use || rule.loader)
  // return coerced array, using the relevant key
  .map(rule => [].concat(rule.use || rule.loader));
}
function mapOneOf(module) {
  return module.rules.filter(rule => !!rule.oneOf).map(rule => rule.oneOf.map(r => r.use || r.loader));
}
function parseWebpack2(module, deps) {
  if (!module.rules) {
    return [];
  }
  const mappedLoaders = module.rules.filter(rule => rule.loaders);
  const mappedUses = mapRuleUse(module);
  const oneOf = mapOneOf(module);
  const mapped = _lodash.default.flatten([...mappedLoaders, ...mappedUses, ...oneOf]);
  const loaders = getLoaders(deps, mapped);
  const presets = getBabelPresets(deps, mapped);
  return [...loaders, ...presets];
}
function extractEntries(entries) {
  if (typeof entries === 'string') {
    return [entries];
  }
  if (Array.isArray(entries)) {
    return entries.filter(entry => typeof entry === 'string');
  }
  return Object.values(entries).filter(entry => entry).map(extractEntries);
}
function parseEntries(entries, deps) {
  return (0, _lodash.default)(extractEntries(entries)).flatten().intersection(deps).uniq().value();
}
function parseWebpackConfig(webpackConfig, deps) {
  if (Array.isArray(webpackConfig)) {
    return webpackConfig.reduce((accumulator, currentValue) => {
      const currentResults = parseWebpackConfig(currentValue, deps);
      Array.prototype.push.apply(accumulator, currentResults);
      return accumulator;
    }, []);
  }
  const module = webpackConfig.module || {};
  const entry = webpackConfig.entry || [];
  const webpack1Loaders = parseWebpack1(module, deps);
  const webpack2Loaders = parseWebpack2(module, deps);
  const webpackEntries = parseEntries(entry, deps);
  return [...webpack1Loaders, ...webpack2Loaders, ...webpackEntries];
}
async function loadNextWebpackConfig(filepath) {
  const fakeConfig = {
    plugins: [],
    module: {
      rules: []
    },
    optimization: {
      splitChunks: {
        cacheGroups: {}
      }
    },
    resolve: {
      alias: {}
    },
    watchOptions: {
      ignored: []
    }
  };
  const fakeContext = {
    webpack: _webpack.fakeWebpack,
    defaultLoaders: {},
    dir: 'fakePath'
  };
  try {
    const nextConfig = await (specifier => new Promise(r => r(`${specifier}`)).then(s => _interopRequireWildcard(require(s))))(filepath);
    if (nextConfig && nextConfig.webpack) {
      return nextConfig.webpack(fakeConfig, fakeContext);
    }
  } catch (error) {
    /* eslint no-console: off */
    console.error('Next.js webpack configuration detection failed with the following error', error, 'Support for this feature is new and experimental, please report issues at https://github.com/depcheck/depcheck/issues');
  }
  return null;
}
async function parseWebpack(filename, deps) {
  const basename = _path.default.basename(filename);
  if (webpackConfigRegex.test(basename)) {
    const webpackConfig = (0, _utils.tryRequire)(filename);
    if (webpackConfig) {
      return parseWebpackConfig(webpackConfig, deps);
    }
  }
  if (basename === 'styleguide.config.js') {
    const styleguideConfig = (0, _utils.tryRequire)(filename);
    if (styleguideConfig && styleguideConfig.webpackConfig) {
      return parseWebpackConfig(styleguideConfig.webpackConfig, deps);
    }
  }
  if (basename === 'next.config.js') {
    const webpackConfig = await loadNextWebpackConfig(filename);
    if (webpackConfig) {
      return parseWebpackConfig(webpackConfig, deps);
    }
  }
  return [];
}
module.exports = exports.default;