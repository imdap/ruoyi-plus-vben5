import { createParsedCommandLine, getDefaultCompilerOptions, createVueLanguagePlugin } from '@vue/language-core';
export { createParsedCommandLine } from '@vue/language-core';
import { proxyCreateProgram } from '@volar/typescript';
import ts from 'typescript';
import { s as slash } from '../shared/unplugin-dts.Dv6DEU-x.mjs';
import 'node:path';
import 'kolorist';
import 'node:fs';
import 'node:fs/promises';
import 'node:os';
import '@rollup/pluginutils';
import 'compare-versions';
import 'node:module';
import 'debug';
import 'local-pkg';
import 'magic-string';

const createProgram = proxyCreateProgram(ts, ts.createProgram, (ts2, options) => {
  const { configFilePath } = options.options;
  const vueOptions = typeof configFilePath === "string" ? createParsedCommandLine(ts2, ts2.sys, slash(configFilePath)).vueOptions : getDefaultCompilerOptions();
  const vueLanguagePlugin = createVueLanguagePlugin(
    ts2,
    options.options,
    vueOptions,
    (id) => id
  );
  return { languagePlugins: [vueLanguagePlugin] };
});

export { createProgram };
