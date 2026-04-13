'use strict';

const languageCore = require('@vue/language-core');
const typescript = require('@volar/typescript');
const ts = require('typescript');
const plugin = require('../shared/unplugin-dts.XYy94NO9.cjs');
require('node:path');
require('kolorist');
require('node:fs');
require('node:fs/promises');
require('node:os');
require('@rollup/pluginutils');
require('compare-versions');
require('node:module');
require('debug');
require('local-pkg');
require('magic-string');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const ts__default = /*#__PURE__*/_interopDefaultCompat(ts);

const createProgram = typescript.proxyCreateProgram(ts__default, ts__default.createProgram, (ts2, options) => {
  const { configFilePath } = options.options;
  const vueOptions = typeof configFilePath === "string" ? languageCore.createParsedCommandLine(ts2, ts2.sys, plugin.slash(configFilePath)).vueOptions : languageCore.getDefaultCompilerOptions();
  const vueLanguagePlugin = languageCore.createVueLanguagePlugin(
    ts2,
    options.options,
    vueOptions,
    (id) => id
  );
  return { languagePlugins: [vueLanguagePlugin] };
});

exports.createParsedCommandLine = languageCore.createParsedCommandLine;
exports.createProgram = createProgram;
