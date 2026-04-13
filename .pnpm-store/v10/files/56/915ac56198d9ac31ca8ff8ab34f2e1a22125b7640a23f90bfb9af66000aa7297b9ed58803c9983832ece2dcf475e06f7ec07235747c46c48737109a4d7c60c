'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const createDebug = require('debug');
const unplugin$1 = require('unplugin');
const shared = require('@intlify/shared');
const pathe = require('pathe');
const bundleUtils = require('@intlify/bundle-utils');
const pluginutils = require('@rollup/pluginutils');
const fg = require('fast-glob');
const node_fs = require('node:fs');
const path = require('node:path');
const compilerSfc = require('vue/compiler-sfc');
const pc = require('picocolors');
const eslintUitls = require('@eslint-community/eslint-utils');
const vueI18nExtensions = require('@intlify/vue-i18n-extensions');
const scopeManager = require('@typescript-eslint/scope-manager');

function _interopDefaultCompat (e) { return e && typeof e === 'object' && 'default' in e ? e.default : e; }

const createDebug__default = /*#__PURE__*/_interopDefaultCompat(createDebug);
const fg__default = /*#__PURE__*/_interopDefaultCompat(fg);
const path__default = /*#__PURE__*/_interopDefaultCompat(path);
const pc__default = /*#__PURE__*/_interopDefaultCompat(pc);
const eslintUitls__default = /*#__PURE__*/_interopDefaultCompat(eslintUitls);

function normalizeGlobOption(val) {
  if (!val) return void 0;
  return shared.isString(val) ? [pathe.normalize(val)] : val.map(pathe.normalize);
}
function resolveOptions(options) {
  const moduleType = options.module || "vue-i18n";
  let onlyLocales = [];
  if (options.onlyLocales) {
    onlyLocales = shared.isArray(options.onlyLocales) ? options.onlyLocales : [options.onlyLocales];
  }
  const forceStringify = !!options.forceStringify;
  const defaultSFCLang = shared.isString(options.defaultSFCLang) ? options.defaultSFCLang : "json";
  const globalSFCScope = !!options.globalSFCScope;
  const runtimeOnly = shared.isBoolean(options.runtimeOnly) ? options.runtimeOnly : true;
  const dropMessageCompiler = !!options.dropMessageCompiler;
  const compositionOnly = moduleType === "vue-i18n" ? shared.isBoolean(options.compositionOnly) ? options.compositionOnly : true : true;
  const fullInstall = moduleType === "vue-i18n" ? shared.isBoolean(options.fullInstall) ? options.fullInstall : true : false;
  const ssrBuild = !!options.ssr;
  const allowDynamic = !!options.allowDynamic;
  const strictMessage = shared.isBoolean(options.strictMessage) ? options.strictMessage : true;
  const escapeHtml = !!options.escapeHtml;
  const optimizeTranslationDirective = shared.isString(options.optimizeTranslationDirective) || shared.isArray(options.optimizeTranslationDirective) ? options.optimizeTranslationDirective : !!options.optimizeTranslationDirective;
  const translationIdentifiers = /* @__PURE__ */ new Map();
  const transformI18nBlock = typeof options.transformI18nBlock === "function" ? options.transformI18nBlock : null;
  return {
    include: normalizeGlobOption(options.include || []),
    exclude: normalizeGlobOption(options.exclude),
    module: moduleType,
    onlyLocales,
    forceStringify,
    defaultSFCLang,
    globalSFCScope,
    runtimeOnly,
    dropMessageCompiler,
    compositionOnly,
    fullInstall,
    ssrBuild,
    allowDynamic,
    strictMessage,
    escapeHtml,
    optimizeTranslationDirective,
    translationIdentifiers,
    transformI18nBlock
  };
}

const PKG_NAME = "unplugin-vue-i18n";

function warn(...args) {
  console.warn(pc__default.yellow(pc__default.bold(`[${PKG_NAME}] `)), ...args);
}
function error(...args) {
  console.error(pc__default.red(pc__default.bold(`[${PKG_NAME}] `)), ...args);
}
function raiseError(message) {
  throw new Error(`[${PKG_NAME}] ${message}`);
}

function resolveNamespace(name) {
  return `${PKG_NAME}:${name}`;
}
function getVitePlugin(config, name) {
  return config.plugins.find((p) => p.name === name);
}
function checkVuePlugin(vuePlugin) {
  if (vuePlugin == null || !vuePlugin.api) {
    error(
      "`@vitejs/plugin-vue` plugin is not found or invalid version. Please install `@vitejs/plugin-vue` v4.3.4 or later version."
    );
    return false;
  }
  return true;
}
const isWindows = typeof process !== "undefined" && process.platform === "win32";
const windowsSlashRE = /\\/g;
function slash(p) {
  return p.replace(windowsSlashRE, "/");
}
function normalizePath(id) {
  return path__default.posix.normalize(isWindows ? slash(id) : id);
}

function parseVueRequest(id) {
  const [filename, rawQuery] = id.split(`?`, 2);
  const params = new URLSearchParams(rawQuery);
  const ret = {};
  const langPart = Object.keys(Object.fromEntries(params)).find((key) => /lang\./i.test(key));
  ret.vue = params.has("vue");
  ret.global = params.has("global");
  ret.src = params.has("src");
  ret.raw = params.has("raw");
  if (params.has("type")) {
    ret.type = params.get("type");
  }
  if (params.has("blockType")) {
    ret.blockType = params.get("blockType");
  }
  if (params.has("index")) {
    ret.index = Number(params.get("index"));
  }
  if (params.has("locale")) {
    ret.locale = params.get("locale");
  }
  if (langPart) {
    const [, lang] = langPart.split(".");
    ret.lang = lang;
  } else if (params.has("lang")) {
    ret.lang = params.get("lang");
  }
  if (params.has("issuerPath")) {
    ret.issuerPath = params.get("issuerPath");
  }
  return {
    filename,
    query: ret
  };
}

function getVueCompiler(vuePlugin) {
  return vuePlugin?.api?.options.compiler;
}
function getVuePluginOptions(vuePlugin) {
  return {
    isProduction: vuePlugin?.api?.options.isProduction,
    root: vuePlugin?.api?.options.root,
    template: vuePlugin?.api?.options.template,
    compiler: vuePlugin?.api?.options.compiler
  };
}

function createDescriptor(filename, source, { template, compiler }) {
  const { descriptor, errors } = compiler.parse(source, {
    filename,
    templateParseOptions: template?.compilerOptions
  });
  return { descriptor, errors };
}
function getDescriptor(filename, code, options) {
  const { descriptor, errors } = createDescriptor(filename, code, options);
  if (errors.length) {
    throw errors[0];
  }
  return descriptor;
}

const INTLIFY_BUNDLE_IMPORT_ID = "@intlify/unplugin-vue-i18n/messages";
const VIRTUAL_PREFIX = "\0";
const RE_INTLIFY_BUNDLE_IMPORT_ID = new RegExp(`^${INTLIFY_BUNDLE_IMPORT_ID}$`);
const RE_VIRTUAL_PREFIXED_INTLIFY_BUNDLE_IMPORT_ID = new RegExp(
  `^${VIRTUAL_PREFIX}${INTLIFY_BUNDLE_IMPORT_ID}$`
);
const RE_RESOURCE_FORMAT = /\.(json5?|ya?ml|[c|m]?[j|t]s)$/;
const RE_SFC_I18N_CUSTOM_BLOCK = /\?vue&type=i18n/;
const RE_SFC_I18N_WEBPACK_CUSTOM_BLOCK = /blockType=i18n/;
const debug$2 = createDebug__default(resolveNamespace("resource"));
function resourcePlugin({
  onlyLocales,
  include,
  exclude,
  module,
  forceStringify,
  defaultSFCLang,
  globalSFCScope,
  runtimeOnly,
  dropMessageCompiler,
  compositionOnly,
  fullInstall,
  ssrBuild,
  strictMessage,
  allowDynamic,
  escapeHtml,
  transformI18nBlock
}, meta) {
  let viteModule = null;
  async function getViteModule() {
    if (viteModule != null) {
      return viteModule;
    }
    try {
      viteModule = await import('vite');
    } catch (e) {
      error(`vite not found, please install vite.`, e.message);
      throw e;
    }
    return viteModule;
  }
  function resolveIncludeExclude() {
    const customBlockInclude = meta.framework === "vite" ? RE_SFC_I18N_CUSTOM_BLOCK : RE_SFC_I18N_WEBPACK_CUSTOM_BLOCK;
    return include ? [[...include, customBlockInclude], exclude] : [[RE_RESOURCE_FORMAT, customBlockInclude], exclude];
  }
  function resolveIncludeExcludeForLegacy() {
    const customBlockInclude = meta.framework === "vite" ? RE_SFC_I18N_CUSTOM_BLOCK : RE_SFC_I18N_WEBPACK_CUSTOM_BLOCK;
    return include ? [[...include, customBlockInclude], void 0] : [void 0, ["**/**"]];
  }
  let _filter = null;
  async function getFilter() {
    if (_filter != null) {
      return _filter;
    }
    if (meta.framework == "webpack") {
      debug$2("Using filter for webpack");
      _filter = pluginutils.createFilter(...resolveIncludeExclude());
    } else {
      const viteModule2 = await getViteModule();
      if (viteModule2.rolldownVersion) {
        debug$2("Using filter for rolldown-vite");
        _filter = pluginutils.createFilter(...resolveIncludeExclude());
      } else {
        debug$2("Using filter for rollup-vite");
        _filter = pluginutils.createFilter(...resolveIncludeExcludeForLegacy());
      }
    }
    return _filter;
  }
  const getVueI18nAliasPath = ({ ssr = false, runtimeOnly: runtimeOnly2 = false }) => {
    return `${module}/dist/${module}${runtimeOnly2 ? ".runtime" : ""}.${!ssr ? "esm-bundler.js" : "node.mjs"}`;
  };
  let isProduction = false;
  let sourceMap = false;
  const vueI18nAliasName = module;
  debug$2(`vue-i18n alias name: ${vueI18nAliasName}`);
  let vuePlugin = null;
  const getSfcParser = () => {
    return vuePlugin ? getVueCompiler(vuePlugin).parse : compilerSfc.parse;
  };
  return {
    name: resolveNamespace("resource"),
    /**
     * NOTE:
     *
     * For vite, If we have json (including SFC's custom block),
     * transform it first because it will be transformed into javascript code by `vite:json` plugin.
     *
     * For webpack, This plugin will handle with 'post', because vue-loader generate the request query.
     */
    enforce: meta.framework === "vite" ? "pre" : "post",
    vite: {
      config() {
        const defineConfig = {
          define: {
            __VUE_I18N_LEGACY_API__: !compositionOnly,
            __VUE_I18N_FULL_INSTALL__: fullInstall,
            __INTLIFY_DROP_MESSAGE_COMPILER__: dropMessageCompiler,
            __VUE_I18N_PROD_DEVTOOLS__: false
          }
        };
        debug$2("define Config:", defineConfig);
        const aliasConfig = {
          resolve: {
            alias: {
              [vueI18nAliasName]: getVueI18nAliasPath({
                ssr: ssrBuild,
                runtimeOnly
              })
            }
          }
        };
        debug$2("alias Config:", aliasConfig);
        return shared.assign(defineConfig, aliasConfig);
      },
      async configResolved(config) {
        vuePlugin = getVitePlugin(config, "vite:vue");
        if (!checkVuePlugin(vuePlugin)) {
          return;
        }
        isProduction = config.isProduction;
        sourceMap = config.command === "build" ? !!config.build.sourcemap : false;
        debug$2(`configResolved: isProduction = ${isProduction}, sourceMap = ${sourceMap}`);
        const isRolldownVite = !!(await getViteModule()).rolldownVersion;
        debug$2(`Using ${isRolldownVite ? "rolldown-vite" : "vite"} for the build`);
        if (!isRolldownVite) {
          const jsonPlugin = getVitePlugin(config, "vite:json");
          if (jsonPlugin) {
            const orgTransform = "handler" in jsonPlugin.transform ? jsonPlugin.transform.handler : jsonPlugin.transform;
            async function overrideJson(code, id) {
              const filter = await getFilter();
              if (!/\.json$/.test(id) || filter(id)) {
                return;
              }
              const { query } = parseVueRequest(id);
              if (query.vue) {
                return;
              }
              debug$2("org json plugin");
              return orgTransform.apply(this, [code, id]);
            }
            jsonPlugin.transform = overrideJson;
            if ("handler" in jsonPlugin.transform) {
              jsonPlugin.transform.handler = overrideJson;
            }
          }
        }
      },
      async handleHotUpdate({ file, server }) {
        if (RE_RESOURCE_FORMAT.test(file)) {
          const module2 = server.moduleGraph.getModuleById(
            asVirtualId(INTLIFY_BUNDLE_IMPORT_ID, meta.framework)
          );
          if (module2) {
            server.moduleGraph.invalidateModule(module2);
            return [module2];
          }
        }
      }
    },
    webpack(compiler) {
      isProduction = compiler.options.mode !== "development";
      sourceMap = !!compiler.options.devtool;
      debug$2(`webpack: isProduction = ${isProduction}, sourceMap = ${sourceMap}`);
      compiler.options.resolve = normalizeConfigResolveAlias(
        compiler.options.resolve,
        meta.framework
      );
      compiler.options.resolve.alias[vueI18nAliasName] = getVueI18nAliasPath({
        ssr: ssrBuild,
        runtimeOnly
      });
      debug$2(
        `set ${vueI18nAliasName}: ${getVueI18nAliasPath({
          ssr: ssrBuild,
          runtimeOnly
        })}`
      );
      compiler.options.plugins.push(
        new compiler.webpack.DefinePlugin({
          __VUE_I18N_LEGACY_API__: JSON.stringify(compositionOnly),
          __VUE_I18N_FULL_INSTALL__: JSON.stringify(fullInstall),
          __INTLIFY_PROD_DEVTOOLS__: "false"
        })
      );
      debug$2(`set __VUE_I18N_LEGACY_API__ is '${compositionOnly}'`);
      debug$2(`set __VUE_I18N_FULL_INSTALL__ is '${fullInstall}'`);
      const filter = pluginutils.createFilter(...resolveIncludeExclude());
      if (compiler.options.module) {
        compiler.options.module.rules.push({
          test: RE_RESOURCE_FORMAT,
          type: "javascript/auto",
          include(resource) {
            debug$2("webpack resource include", resource);
            return filter(resource);
          }
        });
      }
    },
    resolveId: {
      filter: {
        id: RE_INTLIFY_BUNDLE_IMPORT_ID
      },
      handler(id) {
        return asVirtualId(id, meta.framework);
      }
    },
    load: {
      filter: {
        id: RE_VIRTUAL_PREFIXED_INTLIFY_BUNDLE_IMPORT_ID
      },
      async handler(id) {
        debug$2("load", id);
        if (INTLIFY_BUNDLE_IMPORT_ID === getVirtualId(id, meta.framework) && include) {
          let resourcePaths = [];
          for (const inc of include) {
            resourcePaths = [...resourcePaths, ...await fg__default(inc)];
          }
          resourcePaths = resourcePaths.filter((el, pos) => resourcePaths.indexOf(el) === pos);
          const code = await generateBundleResources(resourcePaths, isProduction, {
            forceStringify,
            strictMessage,
            escapeHtml
          });
          return {
            moduleType: "js",
            code,
            map: { mappings: "" }
          };
        }
      }
    },
    transform: {
      async handler(code, id) {
        const filter = await getFilter();
        if (!filter(id)) {
          return;
        }
        const { filename, query } = parseVueRequest(id);
        debug$2("transform", id, JSON.stringify(query), filename);
        let langInfo = defaultSFCLang;
        let inSourceMap;
        if (!query.vue) {
          langInfo = path.parse(filename).ext;
          const generate = getGenerator(langInfo);
          const parseOptions = getOptions(
            filename,
            isProduction,
            query,
            sourceMap,
            {
              inSourceMap,
              isGlobal: globalSFCScope,
              allowDynamic,
              strictMessage,
              escapeHtml,
              jit: true,
              onlyLocales,
              forceStringify
            }
          );
          debug$2("parseOptions", parseOptions);
          const { code: generatedCode, map } = await generate(code, parseOptions);
          debug$2("generated code", generatedCode);
          debug$2("sourcemap", map, sourceMap);
          if (code === generatedCode) return;
          return {
            moduleType: "js",
            code: generatedCode,
            // prettier-ignore
            map: { mappings: "" }
          };
        } else {
          if (isCustomBlock(query)) {
            if (shared.isString(query.lang)) {
              langInfo = query.src ? query.lang === "i18n" ? defaultSFCLang : query.lang : query.lang;
            } else if (defaultSFCLang) {
              langInfo = defaultSFCLang;
            }
            debug$2("langInfo", langInfo);
            const generate = /\.?json5?/.test(langInfo) ? bundleUtils.generateJSON : bundleUtils.generateYAML;
            const parseOptions = getOptions(
              filename,
              isProduction,
              query,
              sourceMap,
              {
                inSourceMap,
                isGlobal: globalSFCScope,
                jit: true,
                strictMessage,
                escapeHtml,
                onlyLocales,
                forceStringify
              }
            );
            debug$2("parseOptions", parseOptions);
            let source = await getCode(
              code,
              filename,
              sourceMap,
              query,
              getSfcParser(),
              meta.framework
            );
            if (typeof transformI18nBlock === "function") {
              const modifiedSource = transformI18nBlock(source);
              if (modifiedSource && typeof modifiedSource === "string") {
                source = modifiedSource;
              } else {
                warn("transformI18nBlock should return a string");
              }
            }
            const { code: generatedCode, map } = generate(source, parseOptions);
            debug$2("generated code", generatedCode);
            debug$2("sourcemap", map, sourceMap);
            if (code === generatedCode) return;
            return {
              moduleType: "js",
              code: generatedCode,
              // prettier-ignore
              map: { mappings: "" }
            };
          }
        }
      }
    }
  };
}
function getGenerator(ext, fallback = bundleUtils.generateJSON) {
  if (/\.?json5?$/.test(ext)) {
    return bundleUtils.generateJSON;
  }
  if (/\.ya?ml$/.test(ext)) {
    return bundleUtils.generateYAML;
  }
  if (/\.[c|m]?js$/.test(ext)) {
    return bundleUtils.generateJavaScript;
  }
  if (/\.[c|m]?ts$/.test(ext)) {
    return bundleUtils.generateTypescript;
  }
  return fallback;
}
function normalizeConfigResolveAlias(resolve, framework) {
  if (resolve && resolve.alias) {
    return resolve;
  }
  if (!resolve) {
    if (framework === "vite") {
      return { alias: [] };
    } else if (framework === "webpack") {
      return { alias: {} };
    }
  } else if (!resolve.alias) {
    if (framework === "vite") {
      resolve.alias = [];
      return resolve;
    } else if (framework === "webpack") {
      resolve.alias = {};
      return resolve;
    }
  }
}
async function generateBundleResources(resources, isProduction, {
  forceStringify = false,
  isGlobal = false,
  onlyLocales = [],
  strictMessage = true,
  escapeHtml = false,
  jit = true,
  transformI18nBlock = void 0
}) {
  const codes = [];
  for (const res of resources) {
    debug$2(`${res} bundle loading ...`);
    if (/\.(json5?|ya?ml)$/.test(res)) {
      const { ext, name } = path.parse(res);
      const source = await getRaw(res);
      const generate = /json5?/.test(ext) ? bundleUtils.generateJSON : bundleUtils.generateYAML;
      const parseOptions = getOptions(res, isProduction, {}, false, {
        isGlobal,
        jit,
        onlyLocales,
        strictMessage,
        escapeHtml,
        forceStringify,
        transformI18nBlock
      });
      parseOptions.type = "bare";
      const { code } = generate(source, parseOptions);
      debug$2("generated code", code);
      codes.push(`${JSON.stringify(name)}: ${code}`);
    }
  }
  return `const isObject = (item) => item && typeof item === 'object' && !Array.isArray(item);

const mergeDeep = (target, ...sources) => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

export default mergeDeep({},
  ${codes.map((code) => `{${code}}`).join(",\n")}
);`;
}
async function getCode(source, filename, sourceMap, query, parser, framework = "vite") {
  const { index, issuerPath } = query;
  if (!shared.isNumber(index)) {
    raiseError(`unexpected index: ${index}`);
  }
  if (framework === "webpack") {
    if (issuerPath) {
      debug$2(`getCode (webpack) ${index} via issuerPath`, issuerPath);
      return await getRaw(filename);
    } else {
      const result = parser(await getRaw(filename), {
        sourceMap,
        filename
      });
      const block = result.descriptor.customBlocks[index];
      if (block) {
        const code = block.src ? await getRaw(block.src) : block.content;
        debug$2(`getCode (webpack) ${index} from SFC`, code);
        return code;
      } else {
        return source;
      }
    }
  } else {
    return source;
  }
}
function isCustomBlock(query) {
  return !shared.isEmptyObject(query) && "vue" in query && (query["type"] === "custom" || // for webpack (vue-loader)
  query["type"] === "i18n" || // for vite (@vite/plugin-vue)
  query["blockType"] === "i18n");
}
function getOptions(filename, isProduction, query, sourceMap, {
  inSourceMap = void 0,
  forceStringify = false,
  isGlobal = false,
  onlyLocales = [],
  allowDynamic = false,
  strictMessage = true,
  escapeHtml = false,
  jit = true,
  transformI18nBlock = null
}) {
  const mode = isProduction ? "production" : "development";
  const baseOptions = {
    filename,
    sourceMap,
    inSourceMap,
    forceStringify,
    allowDynamic,
    strictMessage,
    escapeHtml,
    jit,
    onlyLocales,
    env: mode,
    transformI18nBlock,
    onWarn: (msg) => {
      warn(`${filename} ${msg}`);
    },
    onError: (msg, extra) => {
      const codeFrame = shared.generateCodeFrame(
        extra?.source || extra?.location?.source || "",
        extra?.location?.start.column,
        extra?.location?.end.column
      );
      const errMssage = `${msg} (error code: ${extra?.code}) in ${filename}
  target message: ${extra?.source}
  target message path: ${extra?.path}

  ${codeFrame}
`;
      error(errMssage);
      throw new Error(errMssage);
    }
  };
  if (isCustomBlock(query)) {
    return shared.assign(baseOptions, {
      type: "sfc",
      locale: shared.isString(query.locale) ? query.locale : "",
      isGlobal: isGlobal || !!query.global
    });
  } else {
    return shared.assign(baseOptions, {
      type: "plain",
      isGlobal: false
    });
  }
}
function getVirtualId(id, framework = "vite") {
  return framework === "vite" ? id.startsWith(VIRTUAL_PREFIX) ? id.slice(VIRTUAL_PREFIX.length) : "" : id;
}
function asVirtualId(id, framework = "vite") {
  return framework === "vite" ? VIRTUAL_PREFIX + id : id;
}
async function getRaw(path) {
  return node_fs.promises.readFile(path, { encoding: "utf-8" });
}

const debug$1 = createDebug__default(resolveNamespace("directive"));
const tsEstree = {
  parse: void 0,
  simpleTraverse: void 0,
  AST_NODE_TYPES: void 0
};
function directivePlugin({
  optimizeTranslationDirective,
  translationIdentifiers
}) {
  let vuePlugin = null;
  let vuePluginOptions = null;
  const excludeLangs = ["pug", "jsx", "tsx"];
  return {
    name: resolveNamespace("directive"),
    enforce: "pre",
    vite: {
      async config(config) {
        await import('@typescript-eslint/typescript-estree').then((r) => {
          tsEstree.parse = r.parse;
          tsEstree.simpleTraverse = r.simpleTraverse;
          tsEstree.AST_NODE_TYPES = r.AST_NODE_TYPES;
          return;
        });
        vuePlugin = getVitePlugin(config, "vite:vue");
        if (!checkVuePlugin(vuePlugin)) {
          return;
        }
        if (optimizeTranslationDirective) {
          vuePlugin.api.options = resolveVueOptions(
            vuePlugin,
            optimizeTranslationDirective,
            translationIdentifiers
          );
          debug$1(`vite:vue options['template']:`, vuePlugin.api.options);
        }
      },
      configResolved(config) {
        vuePlugin = getVitePlugin(config, "vite:vue");
        if (!checkVuePlugin(vuePlugin)) {
          return;
        }
      }
    },
    async transform(code, id) {
      if (id.endsWith(".vue")) {
        const { filename, query } = parseVueRequest(id);
        if (!excludeLangs.includes(query.lang ?? "")) {
          if (vuePluginOptions == null) {
            vuePluginOptions = getVuePluginOptions(vuePlugin);
          }
          if (vuePluginOptions?.compiler) {
            analyzeIdentifiers(
              getDescriptor(filename, code, vuePluginOptions),
              vuePluginOptions,
              translationIdentifiers
            );
            return {
              code,
              map: { version: 3, mappings: "", sources: [] }
            };
          }
        }
      }
    }
  };
}
function resolveVueOptions(vuePlugin, optimizeTranslationDirective, translationIdentifiers) {
  const vueOptions = vuePlugin.api.options;
  vueOptions.template ||= {};
  vueOptions.template.compilerOptions ||= {};
  vueOptions.template.compilerOptions.directiveTransforms ||= {};
  const translationSignatureResolver = (context, baseResolver) => {
    const { filename } = context;
    const vuePluginOptions = getVuePluginOptions(vuePlugin);
    const normalizedFilename = normalizePath(path__default.relative(vuePluginOptions.root, filename));
    const resolveIdentifier2 = translationIdentifiers.get(normalizedFilename);
    debug$1("resolved vue-i18n Identifier", resolveIdentifier2);
    if (resolveIdentifier2 == null) {
      return void 0;
    }
    if (resolveIdentifier2.type === "identifier") {
      return baseResolver(context, resolveIdentifier2.key);
    } else {
      const resolvedSignature = baseResolver(context, resolveIdentifier2.key);
      return resolveIdentifier2?.style === "script-setup" ? `${resolvedSignature}.t` : resolvedSignature;
    }
  };
  vueOptions.template.compilerOptions.directiveTransforms.t = vueI18nExtensions.transformVTDirective({
    translationSignatures: shared.isBoolean(optimizeTranslationDirective) ? translationSignatureResolver : optimizeTranslationDirective
  });
  return vueOptions;
}
function analyzeIdentifiers(descriptor, { root }, translationIdentifiers) {
  const source = descriptor.scriptSetup?.content || descriptor.script?.content;
  debug$1("getDescriptor content", source);
  if (!source) {
    return;
  }
  const ast = tsEstree.parse(source, { range: true });
  tsEstree.simpleTraverse(ast, {
    enter(node, parent) {
      if (parent) {
        node.parent = parent;
      }
    }
  });
  const scopeManager$1 = scopeManager.analyze(ast, { sourceType: "module" });
  const scope = getScope(scopeManager$1, ast);
  const importLocalName = getImportLocalName(scope, "vue-i18n", "useI18n");
  if (importLocalName == null) {
    return;
  }
  debug$1("importLocalName", importLocalName);
  const resolvedIdentifier = getVueI18nIdentifier(scope, importLocalName);
  if (resolvedIdentifier) {
    const normalizedFilename = normalizePath(path__default.relative(root, descriptor.filename));
    debug$1("set vue-i18n resolved identifier: ", resolvedIdentifier);
    translationIdentifiers.set(normalizedFilename, resolvedIdentifier);
  }
}
function getScope(manager, node) {
  const scope = manager.acquire(node, true);
  if (scope) {
    if (scope.type === "function-expression-name") {
      return scope.childScopes[0];
    }
    return scope;
  }
  return manager.scopes[0];
}
function getImportLocalName(scope, source, imported) {
  const importDecl = getImportDeclaration(scope, source);
  if (importDecl) {
    const specifierNode = importDecl.specifiers.find(
      (specifierNode2) => isImportedIdentifierInImportClause(specifierNode2) && specifierNode2.imported.name === imported
    );
    return specifierNode ? specifierNode.local.name : null;
  }
  return null;
}
function getImportDeclaration(scope, source) {
  const tracker = new eslintUitls__default.ReferenceTracker(scope);
  const traceMap = {
    [source]: {
      [eslintUitls__default.ReferenceTracker.ESM]: true,
      [eslintUitls__default.ReferenceTracker.READ]: true
    }
  };
  const refs = Array.from(tracker.iterateEsmReferences(traceMap));
  return refs.length ? refs[0].node : null;
}
function isImportedIdentifierInImportClause(node) {
  return "imported" in node;
}
function getVueI18nIdentifier(scope, local) {
  const { callExpression, returnStatement } = getCallExpressionAndReturnStatement(scope, local);
  if (callExpression == null) {
    return null;
  }
  const id = getVariableDeclarationIdFrom(callExpression);
  if (id == null) {
    return null;
  }
  const variableIdPairs = parseVariableId(id);
  debug$1("variableIdPairs:", variableIdPairs);
  const returnVariableIdPairs = parseReturnStatement(returnStatement);
  debug$1("returnVariableIdPairs:", returnVariableIdPairs);
  return resolveIdentifier(variableIdPairs, returnVariableIdPairs);
}
const EMPTY_NODE_RETURN = {
  callExpression: null,
  returnStatement: null
};
function getCallExpressionAndReturnStatement(scope, local) {
  const variable = eslintUitls__default.findVariable(scope, local);
  if (variable == null) {
    return EMPTY_NODE_RETURN;
  }
  const callExpressionRef = variable.references.find((ref) => {
    return ref.identifier.parent?.type === tsEstree.AST_NODE_TYPES.CallExpression;
  });
  if (callExpressionRef == null) {
    return EMPTY_NODE_RETURN;
  }
  let returnStatement = null;
  if (callExpressionRef.from.type === "function" && callExpressionRef.from.block.type === tsEstree.AST_NODE_TYPES.FunctionExpression && // @ts-expect-error -- FIXME: type error
  callExpressionRef.from.block.parent.type === tsEstree.AST_NODE_TYPES.Property && // @ts-expect-error -- FIXME: type error
  callExpressionRef.from.block.parent.key.type === tsEstree.AST_NODE_TYPES.Identifier && // @ts-expect-error -- FIXME: type error
  callExpressionRef.from.block.parent.key.name === "setup") {
    returnStatement = callExpressionRef.from.block.body.body.find((statement) => {
      return statement.type === tsEstree.AST_NODE_TYPES.ReturnStatement;
    });
  }
  return {
    // @ts-expect-error -- FIXME: type error
    callExpression: callExpressionRef.identifier.parent,
    returnStatement
  };
}
function getVariableDeclarationIdFrom(node) {
  if (node.parent?.type !== tsEstree.AST_NODE_TYPES.VariableDeclarator) {
    return null;
  }
  return node.parent.id;
}
function parseVariableId(node) {
  if (node.type === tsEstree.AST_NODE_TYPES.Identifier) {
    return [{ key: node.name, value: null }];
  } else {
    const props = node.properties.filter(
      // ignore RestElement
      (prop) => prop.type === tsEstree.AST_NODE_TYPES.Property
    );
    const pairs = [];
    for (const prop of props) {
      if (prop?.key.type === tsEstree.AST_NODE_TYPES.Identifier && prop?.value.type === tsEstree.AST_NODE_TYPES.Identifier) {
        pairs.push({ key: prop.key.name, value: prop.value.name });
      }
    }
    return pairs;
  }
}
function parseReturnStatement(node) {
  const pairs = [];
  if (node == null || node.argument == null) {
    return pairs;
  }
  if (node.argument.type === tsEstree.AST_NODE_TYPES.ObjectExpression) {
    for (const prop of node.argument.properties) {
      if (prop.type === tsEstree.AST_NODE_TYPES.Property) {
        if (prop.key.type === tsEstree.AST_NODE_TYPES.Identifier && prop.value.type === tsEstree.AST_NODE_TYPES.Identifier) {
          pairs.push({ key: prop.key.name, value: prop.value.name });
        } else if (prop.key.type === tsEstree.AST_NODE_TYPES.Identifier && prop.value.type === tsEstree.AST_NODE_TYPES.MemberExpression && prop.value.object.type === tsEstree.AST_NODE_TYPES.Identifier && prop.value.property.type === tsEstree.AST_NODE_TYPES.Identifier) {
          pairs.push({
            key: prop.key.name,
            value: `${prop.value.object.name}.${prop.value.property.name}`
          });
        }
      }
    }
    return pairs;
  } else if (node.argument.type === tsEstree.AST_NODE_TYPES.Identifier) {
    return pairs;
  } else {
    return pairs;
  }
}
function resolveIdentifier(localVariables, returnVariable) {
  if (returnVariable.length === 0) {
    const variable = localVariables.find((pair) => pair.key === "t");
    if (variable && variable.value) {
      return { type: "identifier", key: variable.value };
    }
    const identifierOnly = localVariables.find((pair) => pair.value === null);
    if (identifierOnly && identifierOnly.key) {
      return { type: "object", key: identifierOnly.key, style: "script-setup" };
    }
    return null;
  } else {
    const variable = localVariables.find((pair) => pair.key === "t");
    if (variable && variable.value) {
      const returnVar = returnVariable.find((pair) => pair.value === variable.value);
      if (returnVar && returnVar.key) {
        return { type: "identifier", key: returnVar.key };
      }
    }
    const identifierOnly = localVariables.find((pair) => pair.value === null);
    if (identifierOnly && identifierOnly.key) {
      const targetKey = identifierOnly.key;
      const returnVar = returnVariable.find((pair) => pair.value?.startsWith(targetKey));
      if (returnVar && returnVar.key) {
        return { type: "object", key: returnVar.key, style: "setup-hook" };
      }
    }
    return null;
  }
}

const debug = createDebug__default(resolveNamespace("root"));
const unpluginFactory = (options = {}, meta) => {
  debug("meta framework", meta.framework);
  if (!["vite", "webpack"].includes(meta.framework)) {
    raiseError(`This plugin is supported 'vite' and 'webpack' only`);
  }
  debug("plugin options (resolving):", options);
  const resolvedOptions = resolveOptions(options);
  debug("plugin options (resolved):", resolvedOptions);
  const plugins = [resourcePlugin(resolvedOptions, meta)];
  if (resolvedOptions.optimizeTranslationDirective) {
    if (meta.framework === "webpack") {
      raiseError(
        `The 'optimizeTranslationDirective' option still is not supported for webpack.
We are waiting for your Pull Request \u{1F642}.`
      );
    }
    plugins.push(directivePlugin(resolvedOptions));
  }
  return plugins;
};
const unplugin = /* @__PURE__ */ unplugin$1.createUnplugin(unpluginFactory);

exports.default = unplugin;
exports.unplugin = unplugin;
exports.unpluginFactory = unpluginFactory;
