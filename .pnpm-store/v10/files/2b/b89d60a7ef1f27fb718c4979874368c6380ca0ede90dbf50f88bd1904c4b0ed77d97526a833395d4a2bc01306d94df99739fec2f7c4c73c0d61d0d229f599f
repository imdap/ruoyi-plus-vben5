import { relative, isAbsolute, posix, resolve as resolve$1, dirname, normalize, sep, basename } from 'node:path';
import ts from 'typescript';
import { yellow, green, red, cyan } from 'kolorist';
import { existsSync, readdirSync, lstatSync, rmdirSync } from 'node:fs';
import { readFile, mkdir, writeFile, unlink } from 'node:fs/promises';
import { cpus } from 'node:os';
import { createFilter } from '@rollup/pluginutils';
import { compare } from 'compare-versions';
import { createRequire } from 'node:module';
import debug from 'debug';
import { getPackageInfoSync, resolveModule } from 'local-pkg';
import MagicString from 'magic-string';

async function loadProgramProcessor(type = "ts") {
  if (type === "vue") {
    return await import('../chunks/vue.mjs');
  }
  return await import('../chunks/ts.mjs');
}

const jsonRE = /\.json$/;
function JsonResolver() {
  return {
    name: "json",
    supports(id) {
      return jsonRE.test(id);
    },
    transform({ id, root, program }) {
      const sourceFile = program.getSourceFile(id);
      if (!sourceFile) return [];
      return [
        {
          path: relative(root, `${id}.d.ts`),
          content: `declare const _default: ${sourceFile.text};

export default _default;
`
        }
      ];
    }
  };
}

const handleDebug = debug("dts-debug");
const defaultIndex = "index.d.ts";
const jsRE = /\.([cm])?jsx?$/;
const tsRE = /\.([cm])?tsx?$/;
const dtsRE$1 = /\.d\.([cm])?tsx?$/;
const tjsRE = /\.([cm])?([jt])sx?$/;
const mtjsRE = /\.m([jt])sx?$/;
const ctjsRE = /\.c([jt])sx?$/;
const fullRelativeRE = /^\.\.?\//;
const globSignRE = /[-^$*+?.()|[\]{}]/g;
function getJsExtPrefix(file) {
  return mtjsRE.test(file) ? "m" : ctjsRE.test(file) ? "c" : "";
}
function tsToDts(path) {
  return `${path.replace(tsRE, "")}.d.ts`;
}
const windowsSlashRE = /\\+/g;
function slash(p) {
  return p.replace(windowsSlashRE, "/");
}
function resolveConfigDir(path, configDir) {
  return path.startsWith("${configDir}") ? path.replace("${configDir}", configDir) : path;
}
function normalizePath(id) {
  return posix.normalize(slash(id));
}
function resolve(...paths) {
  return normalizePath(resolve$1(...paths));
}
function isNativeObj(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}
function isRegExp(value) {
  return Object.prototype.toString.call(value) === "[object RegExp]";
}
function isPromise(value) {
  return !!value && (typeof value === "function" || typeof value === "object") && typeof value.then === "function";
}
async function unwrapPromise(maybePromise) {
  return isPromise(maybePromise) ? await maybePromise : maybePromise;
}
function mergeObjects(sourceObj, targetObj) {
  const loop = [
    {
      source: sourceObj,
      target: targetObj
      // merged: mergedObj
    }
  ];
  while (loop.length) {
    const { source, target } = loop.pop();
    Object.keys(target).forEach((key) => {
      if (isNativeObj(target[key])) {
        if (!isNativeObj(source[key])) {
          source[key] = {};
        }
        loop.push({
          source: source[key],
          target: target[key]
        });
      } else if (Array.isArray(target[key])) {
        if (!Array.isArray(source[key])) {
          source[key] = [];
        }
        loop.push({
          source: source[key],
          target: target[key]
        });
      } else {
        source[key] = target[key];
      }
    });
  }
  return sourceObj;
}
function ensureAbsolute(path, root) {
  return normalizePath(path ? isAbsolute(path) ? path : resolve(root, path) : root);
}
function ensureArray(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}
async function runParallel(maxConcurrency, source, iteratorFn) {
  const ret = [];
  const executing = [];
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source));
    ret.push(p);
    if (maxConcurrency <= source.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}
const speRE = /[\\/]/;
function queryPublicPath(paths) {
  if (paths.length === 0) {
    return "";
  } else if (paths.length === 1) {
    return dirname(paths[0]);
  }
  let publicPath = normalize(dirname(paths[0])) + sep;
  let publicUnits = publicPath.split(speRE);
  let index = publicUnits.length - 1;
  for (const path of paths.slice(1)) {
    if (!index) {
      return publicPath;
    }
    const dirPath = normalize(dirname(path)) + sep;
    if (dirPath.startsWith(publicPath)) {
      continue;
    }
    const units = dirPath.split(speRE);
    if (units.length < index) {
      publicPath = dirPath;
      publicUnits = units;
      continue;
    }
    for (let i = 0; i <= index; ++i) {
      if (publicUnits[i] !== units[i]) {
        if (!i) {
          return "";
        }
        index = i - 1;
        publicUnits = publicUnits.slice(0, index + 1);
        publicPath = publicUnits.join(sep) + sep;
        break;
      }
    }
  }
  return publicPath.slice(0, -1);
}
function removeDirIfEmpty(dir) {
  if (!existsSync(dir)) {
    return;
  }
  let onlyHasDir = true;
  for (const file of readdirSync(dir)) {
    const abs = resolve(dir, file);
    if (lstatSync(abs).isDirectory()) {
      if (!removeDirIfEmpty(abs)) {
        onlyHasDir = false;
      }
    } else {
      onlyHasDir = false;
    }
  }
  if (onlyHasDir) {
    rmdirSync(dir);
  }
  return onlyHasDir;
}
function getTsConfig(tsConfigPath, readFileSync) {
  const baseConfig = ts.readConfigFile(tsConfigPath, readFileSync).config ?? {};
  const tsConfig = {
    ...baseConfig,
    compilerOptions: {}
  };
  if (tsConfig.extends) {
    ensureArray(tsConfig.extends).forEach((configPath) => {
      const config = getTsConfig(ensureAbsolute(configPath, dirname(tsConfigPath)), readFileSync);
      Object.assign(tsConfig.compilerOptions, config.compilerOptions);
      if (!tsConfig.include) {
        tsConfig.include = config.include;
      }
      if (!tsConfig.exclude) {
        tsConfig.exclude = config.exclude;
      }
    });
  }
  Object.assign(tsConfig.compilerOptions, baseConfig.compilerOptions);
  return tsConfig;
}
function getTsLibFolder() {
  const libFolder = tryGetPackageInfo("typescript")?.rootPath;
  return libFolder && normalizePath(libFolder);
}
const BASE64_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64Encode(number) {
  if (number >= 0 && number < BASE64_ALPHABET.length) {
    return BASE64_ALPHABET[number];
  }
  throw new TypeError("Base64 integer must be between 0 and 63: " + number);
}
const VLQ_BASE_SHIFT = 5;
const VLQ_BASE = 1 << VLQ_BASE_SHIFT;
const VLQ_BASE_MASK = VLQ_BASE - 1;
const VLQ_CONTINUATION_BIT = VLQ_BASE;
function toVLQSigned(number) {
  return number < 0 ? (-number << 1) + 1 : (number << 1) + 0;
}
function base64VLQEncode(numbers) {
  let encoded = "";
  for (const number of numbers) {
    let vlq = toVLQSigned(number);
    let digit;
    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64Encode(digit);
    } while (vlq > 0);
  }
  return encoded;
}
const pkgPathCache = /* @__PURE__ */ new Map();
function tryGetPkgPath(beginPath) {
  beginPath = normalizePath(beginPath);
  if (pkgPathCache.has(beginPath)) {
    return pkgPathCache.get(beginPath);
  }
  const pkgPath = resolve(beginPath, "package.json");
  if (existsSync(pkgPath)) {
    pkgPathCache.set(beginPath, pkgPath);
    return pkgPath;
  }
  const parentDir = normalizePath(dirname(beginPath));
  if (!parentDir || parentDir === beginPath) {
    pkgPathCache.set(beginPath, void 0);
    return;
  }
  return tryGetPkgPath(parentDir);
}
function toCapitalCase(value) {
  value = value.trim().replace(/\s+/g, "-");
  value = value.replace(/-+(\w)/g, (_, char) => char ? char.toUpperCase() : "");
  return (value.charAt(0).toLocaleUpperCase() + value.slice(1)).replace(
    /[^\w]/g,
    ""
  );
}
function findTypesPath(...pkgs) {
  let path;
  for (const pkg of pkgs) {
    if (typeof pkg !== "object") continue;
    path = pkg.types || pkg.typings || pkg.exports?.types || pkg.exports?.["."]?.types || pkg.exports?.["./"]?.types;
    if (path) return path;
  }
}
function setModuleResolution(options) {
  if (options.moduleResolution) return;
  const module = typeof options.module === "number" ? options.module : options.target ?? ts.ScriptTarget.ES5 >= 2 ? ts.ModuleKind.ES2015 : ts.ModuleKind.CommonJS;
  let moduleResolution;
  switch (module) {
    case ts.ModuleKind.CommonJS:
      moduleResolution = ts.ModuleResolutionKind.Node10;
      break;
    case ts.ModuleKind.Node16:
      moduleResolution = ts.ModuleResolutionKind.Node16;
      break;
    case ts.ModuleKind.NodeNext:
      moduleResolution = ts.ModuleResolutionKind.NodeNext;
      break;
    default:
      moduleResolution = ts.version.startsWith("5") ? ts.ModuleResolutionKind.Bundler : ts.ModuleResolutionKind.Classic;
      break;
  }
  options.moduleResolution = moduleResolution;
}
function editSourceMapDir(content, fromDir, toDir) {
  const relativeOutDir = relative(fromDir, toDir);
  if (relativeOutDir) {
    try {
      const sourceMap = JSON.parse(content);
      sourceMap.sources = sourceMap.sources.map((source) => {
        return normalizePath(relative(relativeOutDir, source));
      });
      return JSON.stringify(sourceMap);
    } catch (e) {
      return false;
    }
  }
  return true;
}
const regexpSymbolRE = /([$.\\+?()[\]!<=|{}^,])/g;
const asteriskRE = /[*]+/g;
function parseTsAliases(basePath, paths) {
  const result = [];
  for (const [pathWithAsterisk, replacements] of Object.entries(paths)) {
    const find = new RegExp(
      `^${pathWithAsterisk.replace(regexpSymbolRE, "\\$1").replace(asteriskRE, "(?!\\.{1,2}\\/)([^*]+)")}$`
    );
    let index = 1;
    result.push({
      find,
      replacement: ensureAbsolute(
        replacements[0].replace(asteriskRE, () => `$${index++}`),
        basePath
      )
    });
  }
  return result;
}
const rootAsteriskImportRE = /^(?!\.{1,2}\/)([^*]+)$/;
function isAliasGlobal(alias) {
  return alias.find.toString() === rootAsteriskImportRE.toString();
}
function importResolves(path) {
  const files = [
    // js
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",
    // ts
    ".ts",
    ".tsx",
    ".mts",
    ".cts",
    ".d.ts",
    // json
    ".json",
    // vue
    ".vue",
    ".vue.d.ts",
    // svelte
    ".svelte"
  ];
  for (const ext of files) {
    if (existsSync(path + ext)) {
      return true;
    }
  }
  return false;
}
function tryGetPackageInfo(name) {
  if (process.versions.pnp) {
    const targetRequire = createRequire(import.meta.url);
    try {
      return getPackageInfoSync(
        targetRequire.resolve(`${name}/package.json`, { paths: [process.cwd()] })
      );
    } catch (e) {
    }
  }
  try {
    return getPackageInfoSync(name) ?? getPackageInfoSync(name, { paths: [resolveModule(name) || process.cwd()] });
  } catch (e) {
  }
}

const svelteRE = /\.svelte$/;
let lowerVersion;
function querySvelteVersion() {
  if (typeof lowerVersion === "boolean") return;
  try {
    const version = tryGetPackageInfo("svelte")?.version;
    lowerVersion = version ? compare(version, "4.0.0", "<") : false;
  } catch (e) {
    lowerVersion = false;
  }
}
function SvelteResolver() {
  return {
    name: "svelte",
    supports(id) {
      return svelteRE.test(id);
    },
    transform({ id, root }) {
      querySvelteVersion();
      return [
        {
          path: relative(root, `${id}.d.ts`),
          content: `export { ${lowerVersion ? "SvelteComponentTyped" : "SvelteComponent"} as default } from 'svelte';
`
        }
      ];
    }
  };
}

const vueRE = /\.vue$/;
function VueResolver() {
  return {
    name: "vue",
    supports(id) {
      return vueRE.test(id);
    },
    transform({ id, code, program }) {
      const sourceFile = program.getSourceFile(id) || program.getSourceFile(id + ".ts") || program.getSourceFile(id + ".js") || program.getSourceFile(id + ".tsx") || program.getSourceFile(id + ".jsx");
      if (!sourceFile) return { outputs: [] };
      const outputs = [];
      const { emitSkipped, diagnostics } = program.emit(
        sourceFile,
        (path, content) => {
          outputs.push({ path, content });
        },
        void 0,
        true
      );
      if (!program.getCompilerOptions().declarationMap) {
        return { outputs, emitSkipped, diagnostics };
      }
      const [beforeScript] = code.split(/\s*<script.*>/);
      const beforeLines = beforeScript.split("\n").length;
      for (const output of outputs) {
        if (output.path.endsWith(".map")) {
          try {
            const sourceMap = JSON.parse(output.content);
            sourceMap.sources = sourceMap.sources.map(
              (source) => source.replace(/\.vue\.ts$/, ".vue")
            );
            if (beforeScript && beforeScript !== code && beforeLines) {
              sourceMap.mappings = `${base64VLQEncode([0, 0, beforeLines, 0])};${sourceMap.mappings}`;
            }
            output.content = JSON.stringify(sourceMap);
          } catch (e) {
          }
        }
      }
      return { outputs, emitSkipped, diagnostics };
    }
  };
}

function parseResolvers(resolvers) {
  const nameMap = /* @__PURE__ */ new Map();
  for (const resolver of resolvers) {
    resolver.name && nameMap.set(resolver.name, resolver);
  }
  return Array.from(nameMap.values());
}

const globSuffixRE = /^((?:.*\.[^.]+)|(?:\*+))$/;
function normalizeGlob(path) {
  if (/[\\/]$/.test(path)) {
    return path + "**";
  } else if (!globSuffixRE.test(path.split(/[\\/]/).pop())) {
    return path + "/**";
  }
  return path;
}
function walkSourceFile(sourceFile, callback) {
  function walkNode(node, parent, callback2) {
    if (callback2(node, parent) !== false) {
      node.forEachChild((child) => walkNode(child, node, callback2));
    }
  }
  sourceFile.forEachChild((child) => walkNode(child, sourceFile, callback));
}
function isAliasMatch(alias, importer) {
  if (isRegExp(alias.find)) return alias.find.test(importer);
  if (importer.length < alias.find.length) return false;
  if (importer === alias.find) return true;
  return importer.indexOf(alias.find) === 0 && (alias.find.endsWith("/") || importer.substring(alias.find.length)[0] === "/");
}
function transformAlias(importer, dir, aliases, aliasesExclude) {
  if (aliases?.length && !aliasesExclude.some((e) => isRegExp(e) ? e.test(importer) : String(e) === importer)) {
    const matchedAlias = aliases.find((alias) => isAliasMatch(alias, importer));
    if (matchedAlias) {
      const replacement = isAbsolute(matchedAlias.replacement) ? normalizePath(relative(dir, matchedAlias.replacement)) : normalizePath(matchedAlias.replacement);
      const endsWithSlash = typeof matchedAlias.find === "string" ? matchedAlias.find.endsWith("/") : importer.match(matchedAlias.find)[0].endsWith("/");
      const truthPath = importer.replace(
        matchedAlias.find,
        replacement + (endsWithSlash ? "/" : "")
      );
      const absolutePath = resolve$1(dir, truthPath);
      const normalizedPath = normalizePath(relative(dir, absolutePath));
      const resultPath = normalizedPath.startsWith(".") ? normalizedPath : `./${normalizedPath}`;
      if (!isAliasGlobal(matchedAlias)) return resultPath;
      if (importResolves(absolutePath)) return resultPath;
    }
  }
  return importer;
}
const vlsRE = /^_?__VLS_/;
function isVLSNode(node) {
  if (ts.isVariableStatement(node)) {
    return node.declarationList.declarations.some(
      (d) => ts.isIdentifier(d.name) && vlsRE.test(`${d.name.escapedText}`)
    );
  }
  if (ts.isTypeAliasDeclaration(node)) {
    return vlsRE.test(`${node.name.escapedText}`);
  }
  if (ts.isFunctionDeclaration(node)) {
    return !!node.name && vlsRE.test(`${node.name.escapedText}`);
  }
  return false;
}
function transformCode(options) {
  const s = new MagicString(options.content);
  const ast = ts.createSourceFile("a.ts", options.content, ts.ScriptTarget.Latest);
  const dir = dirname(options.filePath);
  const importMap = /* @__PURE__ */ new Map();
  const usedDefault = /* @__PURE__ */ new Map();
  const declareModules = [];
  const toLibName = (origin) => {
    const name = transformAlias(origin, dir, options.aliases, options.aliasesExclude);
    return options.cleanVueFileName ? name.replace(/\.vue$/, "") : name;
  };
  let indexCount = 0;
  let importCount = 0;
  walkSourceFile(ast, (node, parent) => {
    if (ts.isImportDeclaration(node)) {
      if (!node.importClause) {
        options.clearPureImport && s.remove(node.pos, node.end);
        ++importCount;
      } else if (ts.isStringLiteral(node.moduleSpecifier) && (node.importClause.name || node.importClause.namedBindings && ts.isNamedImports(node.importClause.namedBindings))) {
        const libName = toLibName(node.moduleSpecifier.text);
        const importSet = importMap.get(libName) ?? importMap.set(libName, /* @__PURE__ */ new Set()).get(libName);
        if (node.importClause.name && !usedDefault.has(libName)) {
          const usedType = node.importClause.name.escapedText;
          usedDefault.set(libName, usedType);
          importSet.add(`default as ${usedType}`);
        }
        if (node.importClause.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
          node.importClause.namedBindings.elements.forEach((element) => {
            if (element.propertyName) {
              importSet.add(`${element.propertyName.getText(ast)} as ${element.name.escapedText}`);
            } else {
              importSet.add(element.name.escapedText);
            }
          });
        }
        s.remove(node.pos, node.end);
        ++importCount;
      }
      return false;
    }
    if (ts.isImportTypeNode(node) && node.qualifier && ts.isLiteralTypeNode(node.argument) && ts.isIdentifier(node.qualifier) && ts.isStringLiteral(node.argument.literal)) {
      const libName = toLibName(node.argument.literal.text);
      if (!options.staticImport) {
        s.update(node.argument.literal.pos, node.argument.literal.end, `'${libName}'`);
        return !!node.typeArguments;
      }
      const importSet = importMap.get(libName) ?? importMap.set(libName, /* @__PURE__ */ new Set()).get(libName);
      let usedType = node.qualifier.escapedText;
      if (usedType === "default") {
        usedType = usedDefault.get(libName) ?? usedDefault.set(libName, `__DTS_DEFAULT_${indexCount++}__`).get(libName);
        importSet.add(`default as ${usedType}`);
        s.update(node.qualifier.pos, node.qualifier.end, usedType);
      } else {
        importSet.add(usedType);
      }
      if (ts.isImportTypeNode(parent) && parent.typeArguments && parent.typeArguments[0] === node) {
        s.remove(node.pos, node.argument.end + 2);
      } else {
        s.update(node.pos, node.argument.end + 2, " ");
      }
      return !!node.typeArguments;
    }
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && ts.isStringLiteral(node.arguments[0])) {
      s.update(
        node.arguments[0].pos,
        node.arguments[0].end,
        `'${toLibName(node.arguments[0].text)}'`
      );
      return false;
    }
    if (ts.isExportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
      s.update(
        node.moduleSpecifier.pos,
        node.moduleSpecifier.end,
        ` '${toLibName(node.moduleSpecifier.text)}'`
      );
      return false;
    }
    if (ts.isModuleDeclaration(node) && node.body && ts.isModuleBlock(node.body)) {
      if (ts.isIdentifier(node.name) && node.name.escapedText === "global" && node.body.statements.some(isVLSNode)) {
        s.remove(node.pos, node.end);
      } else {
        let libName = "";
        if (ts.isStringLiteral(node.name)) {
          libName = toLibName(node.name.text);
          if (libName !== node.name.text) {
            s.update(node.name.pos, node.name.end, ` '${libName}'`);
          }
        }
        if ((!libName || !libName.startsWith(".")) && node.modifiers?.[0] && node.modifiers[0].kind === ts.SyntaxKind.DeclareKeyword && !node.body.statements.some(
          (s2) => ts.isExportAssignment(s2) || ts.isExportDeclaration(s2) || ts.isImportDeclaration(s2)
        )) {
          declareModules.push(s.slice(node.pos, node.end + 1));
        }
      }
      return false;
    }
  });
  let prependImports = "";
  importMap.forEach((importSet, libName) => {
    prependImports += `import { ${Array.from(importSet).join(", ")} } from '${libName}';
`;
  });
  s.trimStart("\n").prepend(prependImports);
  return {
    content: s.toString(),
    declareModules,
    diffLineCount: importMap.size && importCount < importMap.size ? importMap.size - importCount : null
  };
}
function hasNormalExport(content) {
  const ast = ts.createSourceFile("a.ts", content, ts.ScriptTarget.Latest);
  let has = false;
  walkSourceFile(ast, (node) => {
    if (ts.isExportDeclaration(node)) {
      if (node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const element of node.exportClause.elements) {
          if (element.name.getText(ast) !== "default") {
            has = true;
            break;
          }
        }
      } else {
        has = true;
      }
    } else if ("modifiers" in node && Array.isArray(node.modifiers) && node.modifiers.length > 1) {
      for (let i = 0, len = node.modifiers.length; i < len; ++i) {
        if (node.modifiers[i].kind === ts.SyntaxKind.ExportKeyword && node.modifiers[i + 1]?.kind !== ts.SyntaxKind.DefaultKeyword) {
          has = true;
          break;
        }
      }
    }
    return false;
  });
  return has;
}
function hasExportDefault(content) {
  const ast = ts.createSourceFile("a.ts", content, ts.ScriptTarget.Latest);
  let has = false;
  walkSourceFile(ast, (node) => {
    if (ts.isExportAssignment(node)) {
      has = true;
    } else if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const element of node.exportClause.elements) {
        if (element.name.getText(ast) === "default") {
          has = true;
          break;
        }
      }
    } else if ("modifiers" in node && Array.isArray(node.modifiers) && node.modifiers.length > 1) {
      for (let i = 0, len = node.modifiers.length; i < len; ++i) {
        if (node.modifiers[i].kind === ts.SyntaxKind.ExportKeyword && node.modifiers[i + 1]?.kind === ts.SyntaxKind.DefaultKeyword) {
          has = true;
          break;
        }
      }
    }
    return false;
  });
  return has;
}

let hasExtractor;
function getHasExtractor() {
  return typeof hasExtractor !== "undefined" ? hasExtractor : hasExtractor = !!tryGetPackageInfo("@microsoft/api-extractor");
}
const dtsRE = /\.d\.(m|c)?tsx?$/;
async function bundleDtsFiles({
  root,
  configPath,
  tsconfigPath,
  compilerOptions,
  outDir,
  entryPath,
  fileName,
  libFolder,
  extractorConfig = {},
  bundledPackages,
  invokeOptions = {}
}) {
  const { Extractor, ExtractorConfig } = await import('@microsoft/api-extractor');
  configPath = configPath ? ensureAbsolute(configPath, root) : "";
  const configObjectFullPath = configPath || resolve(root, "api-extractor.json");
  if (!dtsRE.test(fileName)) {
    fileName += ".d.ts";
  }
  if (/preserve/i.test(compilerOptions.module)) {
    compilerOptions = { ...compilerOptions, module: "ESNext" };
  }
  const configObject = {
    bundledPackages,
    projectFolder: root,
    mainEntryPointFilePath: entryPath,
    compiler: {
      tsconfigFilePath: tsconfigPath,
      overrideTsconfig: {
        $schema: "http://json.schemastore.org/tsconfig",
        compilerOptions
      }
    },
    apiReport: {
      enabled: false,
      reportFileName: "<unscopedPackageName>.api.md"
    },
    docModel: {
      enabled: false
    },
    dtsRollup: {
      enabled: true,
      publicTrimmedFilePath: resolve(outDir, fileName)
    },
    tsdocMetadata: {
      enabled: false
    },
    messages: {
      compilerMessageReporting: {
        default: {
          logLevel: "none"
        }
      },
      extractorMessageReporting: {
        default: {
          logLevel: "none"
        }
      }
    }
  };
  if (configPath) {
    mergeObjects(configObject, ExtractorConfig.loadFile(configPath));
  }
  if (Object.keys(extractorConfig).length) {
    mergeObjects(configObject, extractorConfig);
  }
  const config = ExtractorConfig.prepare({
    configObject,
    configObjectFullPath,
    packageJsonFullPath: tryGetPkgPath(configObjectFullPath)
  });
  return Extractor.invoke(config, {
    localBuild: false,
    showVerboseMessages: false,
    showDiagnostics: false,
    typescriptCompilerFolder: libFolder,
    ...invokeOptions
  });
}

const fixedCompilerOptions = {
  noEmit: false,
  declaration: true,
  emitDeclarationOnly: true,
  checkJs: false,
  skipLibCheck: true,
  preserveSymlinks: false,
  noEmitOnError: void 0,
  target: ts.ScriptTarget.ESNext
};
function parseAliases(aliasOptions = [], aliasesExclude = []) {
  let aliases;
  if (isNativeObj(aliasOptions)) {
    aliases = Object.entries(aliasOptions).map(([key, value]) => {
      return { find: key, replacement: value };
    });
  } else {
    aliases = ensureArray(aliasOptions).map((alias) => ({ ...alias }));
  }
  if (aliasesExclude.length > 0) {
    aliases = aliases.filter(
      ({ find }) => !aliasesExclude.some(
        (aliasExclude) => aliasExclude && (isRegExp(find) ? find.toString() === aliasExclude.toString() : isRegExp(aliasExclude) ? find.match(aliasExclude)?.[0] : find === aliasExclude)
      )
    );
  }
  return aliases;
}
class Runtime {
  static async toInstance({ processor = "ts", ...options }) {
    return new Runtime(options, await loadProgramProcessor(processor));
  }
  root;
  publicRoot;
  entryRoot;
  configPath;
  compilerOptions;
  rawCompilerOptions;
  host;
  program;
  rootNames;
  diagnostics;
  outDirs;
  entries;
  // protected include: string[]
  // protected exclude: string[]
  aliases;
  aliasesExclude;
  libName;
  indexName;
  logger;
  resolvers;
  rootFiles;
  outputFiles;
  transformedFiles;
  filter;
  rebuildProgram;
  constructor(options, { createParsedCommandLine, createProgram }) {
    const {
      root,
      tsconfigPath,
      aliasesExclude = [],
      pathsToAliases,
      entries = {},
      logger = console
    } = options;
    const resolvers = parseResolvers([
      JsonResolver(),
      VueResolver(),
      SvelteResolver(),
      ...options.resolvers || []
    ]);
    const aliases = parseAliases(options.aliases, aliasesExclude);
    const configPath = tsconfigPath ? ensureAbsolute(tsconfigPath, root) : ts.findConfigFile(root, ts.sys.fileExists);
    const content = configPath ? createParsedCommandLine(ts, ts.sys, configPath) : void 0;
    const compilerOptions = {
      ...content?.options || {},
      ...options.compilerOptions || {},
      ...fixedCompilerOptions,
      outDir: ".",
      declarationDir: "."
    };
    const rawCompilerOptions = content?.raw.compilerOptions || {};
    if (content?.fileNames.find((name) => name.endsWith(".vue"))) {
      setModuleResolution(compilerOptions);
    }
    const outDirs = options.outDirs ? ensureArray(options.outDirs).map((d) => ensureAbsolute(d, root)) : [
      ensureAbsolute(
        content?.raw.compilerOptions?.outDir ? resolveConfigDir(content.raw.compilerOptions.outDir, root) : "dist",
        root
      )
    ];
    const {
      // Here we are using the default value to set the `baseUrl` to the current directory if no value exists. This is
      // the same behavior as the TS Compiler. See TS source:
      // https://github.com/microsoft/TypeScript/blob/3386e943215613c40f68ba0b108cda1ddb7faee1/src/compiler/utilities.ts#L6493-L6501
      baseUrl = compilerOptions.paths ? process.cwd() : void 0,
      paths
    } = compilerOptions;
    if (pathsToAliases && baseUrl && paths) {
      aliases.push(
        ...parseTsAliases(
          ensureAbsolute(resolveConfigDir(baseUrl, root), configPath ? dirname(configPath) : root),
          paths
        )
      );
    }
    const computeGlobs = (rootGlobs, tsGlobs, defaultGlob) => {
      if (rootGlobs?.length) {
        return ensureArray(rootGlobs).map(
          (glob) => normalizeGlob(resolveConfigDir(glob, "."))
        );
      }
      const relativeRoot = configPath ? normalizePath(relative(root, dirname(configPath)).replace(globSignRE, "\\$&")) : ".";
      return ensureArray(tsGlobs?.length ? tsGlobs : defaultGlob).map(
        (glob) => normalizeGlob(resolveConfigDir(glob, relativeRoot))
      );
    };
    const include = computeGlobs(
      options.include,
      [...ensureArray(content?.raw.include ?? []), ...ensureArray(content?.raw.files ?? [])],
      "**/*"
    );
    const exclude = [
      ...computeGlobs(options.exclude, content?.raw.exclude, "node_modules/**"),
      ...outDirs.map((outDir) => normalizeGlob(outDir))
    ];
    const filter = createFilter(include, exclude, { resolve: root });
    const rootNames = [
      ...new Set(
        Object.values(entries).map((entry) => ensureAbsolute(entry, root)).concat(content?.fileNames.filter(filter) || []).map(normalizePath)
      )
    ];
    const host = ts.createCompilerHost(compilerOptions);
    const rebuildProgram = () => createProgram({
      host,
      rootNames,
      options: compilerOptions,
      projectReferences: content?.projectReferences
    });
    const program = rebuildProgram();
    const libName = toCapitalCase(options.libName || "_default");
    const indexName = options.indexName || defaultIndex;
    const maybeEmitted = (sourceFile) => {
      return !(compilerOptions.noEmitForJsFiles && jsRE.test(sourceFile.fileName)) && !sourceFile.isDeclarationFile && !program.isSourceFileFromExternalLibrary(sourceFile);
    };
    let publicRoot = compilerOptions.rootDir ? ensureAbsolute(resolveConfigDir(compilerOptions.rootDir, root), root) : compilerOptions.composite && compilerOptions.configFilePath ? dirname(compilerOptions.configFilePath) : queryPublicPath(
      program.getSourceFiles().filter(maybeEmitted).map((sourceFile) => sourceFile.fileName)
    );
    publicRoot = normalizePath(publicRoot);
    let entryRoot = options.entryRoot || publicRoot;
    entryRoot = ensureAbsolute(entryRoot, root);
    const diagnostics = [
      ...program.getDeclarationDiagnostics(),
      ...program.getSemanticDiagnostics(),
      ...program.getSyntacticDiagnostics()
    ];
    if (diagnostics?.length) {
      logger.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, host));
    }
    const rootFiles = /* @__PURE__ */ new Set();
    for (const file of rootNames) {
      rootFiles.add(file);
    }
    this.root = root;
    this.publicRoot = publicRoot;
    this.entryRoot = entryRoot;
    this.configPath = configPath;
    this.compilerOptions = compilerOptions;
    this.rawCompilerOptions = rawCompilerOptions;
    this.host = host;
    this.rootNames = rootNames;
    this.diagnostics = diagnostics;
    this.outDirs = outDirs;
    this.entries = entries;
    this.aliases = aliases;
    this.aliasesExclude = aliasesExclude;
    this.libName = libName;
    this.indexName = indexName;
    this.logger = logger;
    this.resolvers = resolvers;
    this.rootFiles = rootFiles;
    this.outputFiles = /* @__PURE__ */ new Map();
    this.transformedFiles = /* @__PURE__ */ new Set();
    this.filter = filter;
    this.program = program;
    this.rebuildProgram = () => {
      this.program = rebuildProgram();
    };
  }
  getHost() {
    return this.host;
  }
  getProgram() {
    return this.program;
  }
  matchResolver(id) {
    return this.resolvers.find((r) => r.supports(id));
  }
  getRootFiles() {
    return [...this.rootFiles];
  }
  addRootFile(fileName) {
    this.rootFiles.add(normalizePath(fileName));
  }
  clearTransformedFiles() {
    this.transformedFiles.clear();
  }
  getDiagnostics() {
    return [...this.diagnostics];
  }
  async transform(id, code) {
    const {
      publicRoot,
      outDirs,
      resolvers,
      rootFiles,
      outputFiles,
      transformedFiles
    } = this;
    let resolver;
    id = normalizePath(id).split("?")[0];
    if (!this.filter(id) || !(resolver = resolvers.find((r) => r.supports(id))) && !tjsRE.test(id) || transformedFiles.has(id)) {
      return;
    }
    rootFiles.delete(id);
    transformedFiles.add(id);
    const outDir = outDirs[0];
    if (resolver) {
      const result = await resolver.transform({
        id,
        code,
        root: publicRoot,
        outDir,
        host: this.host,
        program: this.program
      });
      let outputs;
      if (Array.isArray(result)) {
        outputs = result;
      } else {
        const { emitSkipped, diagnostics = [] } = result;
        if (emitSkipped && diagnostics.length > 0) {
          this.logger.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, this.host));
          this.diagnostics.push(...diagnostics);
        }
        outputs = result.outputs;
      }
      for (const { path, content } of outputs) {
        outputFiles.set(resolve(publicRoot, relative(outDir, ensureAbsolute(path, outDir))), content);
      }
    } else {
      const sourceFile = this.program.getSourceFile(id);
      if (sourceFile) {
        const { emitSkipped, diagnostics } = this.program.emit(
          sourceFile,
          (name, text) => {
            outputFiles.set(resolve(publicRoot, relative(outDir, ensureAbsolute(name, outDir))), text);
          },
          void 0,
          true,
          void 0,
          // @ts-expect-error
          true
        );
        if (emitSkipped && diagnostics.length > 0) {
          this.logger.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, this.host));
          this.diagnostics.push(...diagnostics);
        }
      }
    }
    const dtsId = id.replace(tjsRE, "") + ".d.ts";
    const dtsSourceFile = this.program.getSourceFile(dtsId);
    dtsSourceFile && this.filter(dtsSourceFile.fileName) && outputFiles.set(normalizePath(dtsSourceFile.fileName), dtsSourceFile.getFullText());
  }
  async emitOutput(options = {}) {
    const {
      outDirs,
      logger,
      outputFiles,
      rootFiles,
      root,
      publicRoot,
      entryRoot,
      aliases,
      aliasesExclude,
      entries,
      indexName,
      libName,
      configPath,
      rawCompilerOptions
    } = this;
    const {
      strictOutput = true,
      logPrefix = "[dts]",
      copyDtsFiles = false,
      cleanVueFileName = false,
      staticImport = false,
      clearPureImport = true,
      insertTypesEntry = false,
      bundleTypes = false,
      beforeWriteFile,
      afterRollup
    } = options;
    const {
      extractorConfig,
      bundledPackages,
      invokeOptions,
      configPath: bundleConfigPath
    } = isNativeObj(bundleTypes) ? bundleTypes : {};
    const cleanPath = (path, emittedFiles2) => {
      const newPath = path.replace(".vue.d.ts", ".d.ts");
      return !emittedFiles2.has(newPath) && cleanVueFileName ? newPath : path;
    };
    const outDir = outDirs[0];
    const emittedFiles = /* @__PURE__ */ new Map();
    const declareModules = [];
    const writeOutput = async (path, content, outDir2, record = true) => {
      if (typeof beforeWriteFile === "function") {
        const result = await unwrapPromise(beforeWriteFile(path, content));
        if (result === false) return;
        if (result) {
          path = result.filePath || path;
          content = result.content ?? content;
        }
      }
      path = normalizePath(path);
      const dir = normalizePath(dirname(path));
      if (strictOutput && !dir.startsWith(normalizePath(outDir2))) {
        logger.warn(`${logPrefix} ${yellow("Outside emitted:")} ${path}`);
        return;
      }
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
      await writeFile(path, content, "utf-8");
      record && emittedFiles.set(path, content);
    };
    const sourceFiles = this.program.getSourceFiles();
    for (const sourceFile of sourceFiles) {
      if (!this.filter(sourceFile.fileName)) continue;
      if (copyDtsFiles && dtsRE$1.test(sourceFile.fileName)) {
        outputFiles.set(normalizePath(sourceFile.fileName), sourceFile.getFullText());
      }
      if (rootFiles.has(sourceFile.fileName)) {
        this.program.emit(
          sourceFile,
          (name, text) => {
            outputFiles.set(resolve(publicRoot, relative(outDir, ensureAbsolute(name, outDir))), text);
          },
          void 0,
          true
        );
        rootFiles.delete(sourceFile.fileName);
      }
    }
    handleDebug("emit output patch");
    const currentDir = this.host.getCurrentDirectory();
    const declarationFiles = /* @__PURE__ */ new Map();
    const mapFiles = /* @__PURE__ */ new Map();
    const prependMappings = /* @__PURE__ */ new Map();
    for (const [filePath, content] of outputFiles.entries()) {
      if (filePath.endsWith(".map")) {
        mapFiles.set(filePath, content);
      } else {
        declarationFiles.set(filePath, content);
      }
    }
    await runParallel(
      cpus().length,
      Array.from(declarationFiles.entries()),
      async ([filePath, content]) => {
        const newFilePath = resolve(
          outDir,
          relative(entryRoot, cleanVueFileName ? filePath.replace(".vue.d.ts", ".d.ts") : filePath)
        );
        if (content) {
          const result = transformCode({
            filePath,
            content,
            aliases,
            aliasesExclude,
            staticImport,
            clearPureImport,
            cleanVueFileName
          });
          content = result.content;
          declareModules.push(...result.declareModules);
          if (result.diffLineCount) {
            prependMappings.set(`${newFilePath}.map`, ";".repeat(result.diffLineCount));
          }
        }
        await writeOutput(newFilePath, content, outDir);
      }
    );
    await runParallel(cpus().length, Array.from(mapFiles.entries()), async ([filePath, content]) => {
      const baseDir = dirname(filePath);
      filePath = resolve(
        outDir,
        relative(entryRoot, cleanVueFileName ? filePath.replace(".vue.d.ts", ".d.ts") : filePath)
      );
      try {
        const sourceMap = JSON.parse(content);
        sourceMap.sources = sourceMap.sources.map((source) => {
          return normalizePath(
            relative(dirname(filePath), resolve(currentDir, relative(publicRoot, baseDir), source))
          );
        });
        if (prependMappings.has(filePath)) {
          sourceMap.mappings = `${prependMappings.get(filePath)}${sourceMap.mappings}`;
        }
        content = JSON.stringify(sourceMap);
      } catch (e) {
        logger.warn(`${logPrefix} ${yellow("Processing source map fail:")} ${filePath}`);
      }
      await writeOutput(filePath, content, outDir);
    });
    handleDebug("write output");
    if (insertTypesEntry || bundleTypes) {
      const pkgPath = tryGetPkgPath(root);
      let pkg;
      try {
        pkg = pkgPath && existsSync(pkgPath) ? JSON.parse(await readFile(pkgPath, "utf-8")) : {};
      } catch (e) {
      }
      const entryNames = Object.keys(entries);
      const types = findTypesPath(pkg.publishConfig, pkg);
      const multiple = entryNames.length > 1;
      let typesPath = cleanPath(
        types ? resolve(root, types) : resolve(outDir, indexName),
        emittedFiles
      );
      if (!multiple && !dtsRE$1.test(typesPath)) {
        logger.warn(
          `
${logPrefix} ${yellow("The resolved path of type entry is not ending with '.d.ts'.")}
`
        );
        typesPath = `${typesPath.replace(tjsRE, "")}.d.${getJsExtPrefix(typesPath)}ts`;
      }
      for (const name of entryNames) {
        const entryDtsPath = multiple ? cleanPath(resolve(outDir, tsToDts(name)), emittedFiles) : typesPath;
        if (existsSync(entryDtsPath)) continue;
        const sourceEntry = normalizePath(
          cleanPath(resolve(outDir, relative(entryRoot, tsToDts(entries[name]))), emittedFiles)
        );
        let fromPath = normalizePath(relative(dirname(entryDtsPath), sourceEntry));
        fromPath = fromPath.replace(dtsRE$1, "");
        fromPath = fullRelativeRE.test(fromPath) ? fromPath : `./${fromPath}`;
        let content = "export {}\n";
        if (emittedFiles.has(sourceEntry)) {
          if (hasNormalExport(emittedFiles.get(sourceEntry))) {
            content = `export * from '${fromPath}'
${content}`;
          }
          if (hasExportDefault(emittedFiles.get(sourceEntry))) {
            content += `import ${libName} from '${fromPath}'
export default ${libName}
${content}`;
          }
        }
        await writeOutput(cleanPath(entryDtsPath, emittedFiles), content, outDir);
      }
      handleDebug("insert index");
      if (bundleTypes) {
        logger.info(green(`${logPrefix} Start bundling declaration files...`));
        if (!getHasExtractor()) {
          logger.error(
            `
${logPrefix} ${red("Failed to load '@microsoft/api-extractor', have you installed it?")}
`
          );
          logger.warn(
            `
${logPrefix} ${yellow("Error occurred, skip bundle declaration files.")}
`
          );
        } else {
          const rollupFiles = /* @__PURE__ */ new Set();
          const compilerOptions = configPath ? getTsConfig(configPath, this.host.readFile).compilerOptions : rawCompilerOptions;
          const rollup = async (path) => {
            const result = await bundleDtsFiles({
              root,
              // api-extractor.json
              configPath: bundleConfigPath,
              // tsconfig.json
              tsconfigPath: configPath,
              compilerOptions,
              outDir,
              entryPath: path,
              fileName: basename(path),
              libFolder: getTsLibFolder(),
              extractorConfig,
              bundledPackages,
              invokeOptions
            });
            emittedFiles.delete(path);
            rollupFiles.add(path);
            if (typeof afterRollup === "function") {
              await unwrapPromise(afterRollup(result));
            }
          };
          if (multiple) {
            await runParallel(cpus().length, entryNames, async (name) => {
              await rollup(cleanPath(resolve(outDir, tsToDts(name)), emittedFiles));
            });
          } else {
            await rollup(typesPath);
          }
          await runParallel(cpus().length, Array.from(emittedFiles.keys()), (f) => unlink(f));
          removeDirIfEmpty(outDir);
          emittedFiles.clear();
          const declared = declareModules.join("\n");
          await runParallel(cpus().length, [...rollupFiles], async (filePath) => {
            await writeOutput(
              filePath,
              await readFile(filePath, "utf-8") + (declared ? `
${declared}` : ""),
              dirname(filePath)
            );
          });
          handleDebug("rollup output");
        }
      }
    }
    if (outDirs.length > 1) {
      const extraOutDirs = outDirs.slice(1);
      await runParallel(cpus().length, Array.from(emittedFiles), async ([wroteFile, content]) => {
        const relativePath = relative(outDir, wroteFile);
        await Promise.all(
          extraOutDirs.map(async (targetOutDir) => {
            const path = resolve(targetOutDir, relativePath);
            if (wroteFile.endsWith(".map")) {
              if (!editSourceMapDir(content, outDir, targetOutDir)) {
                logger.warn(`${logPrefix} ${yellow("Processing source map fail:")} ${path}`);
              }
            }
            await writeOutput(path, content, targetOutDir, false);
          })
        );
      });
    }
    return emittedFiles;
  }
}

const pluginName = "unplugin:dts";
const logPrefix = cyan(`[${pluginName}]`);
const pluginFactory = (options = {}, meta) => {
  const {
    processor = "ts",
    tsconfigPath,
    staticImport = false,
    clearPureImport = true,
    cleanVueFileName = false,
    insertTypesEntry = false,
    bundleTypes = false,
    pathsToAliases = true,
    aliasesExclude = [],
    copyDtsFiles = meta.framework !== "vite",
    declarationOnly = false,
    strictOutput = true,
    afterBootstrap,
    afterDiagnostic,
    beforeWriteFile,
    afterRollup,
    afterBuild,
    include,
    exclude,
    compilerOptions,
    resolvers,
    entryRoot
  } = options;
  let root = ensureAbsolute(options.root ?? "", process.cwd());
  let outDirs;
  let entries;
  let aliases;
  let libName = "_default";
  let indexName = defaultIndex;
  let logger = console;
  let isDev = false;
  let bundled = false;
  let timeRecord = 0;
  let entryPromise;
  let runtime;
  function prepareFromCompiler(compiler) {
    root = ensureAbsolute(options.root ?? "", compiler.context);
    isDev = compiler.options.mode === "development";
    logger = compiler.getInfrastructureLogger(pluginName);
    entryPromise = (async () => {
      if (typeof compiler.options.entry === "function") {
        return await compiler.options.entry();
      }
      return compiler.options.entry;
    })().then((entry) => {
      entries = Object.keys(entry).reduce(
        (prev, current) => {
          const imports = entry[current].import;
          if (imports) {
            prev[current] = imports[0];
          }
          return prev;
        },
        {}
      );
    });
    const aliasOptions = compiler.options.resolve.alias ?? [];
    if (Array.isArray(aliasOptions)) {
      aliases = ensureArray(aliasOptions).filter((alias) => alias.alias && alias.alias.length > 0).map((alias) => ({ find: alias.name, replacement: Array.isArray(alias.alias) ? alias.alias[0] : alias.alias }));
    } else {
      aliases = Object.entries(aliasOptions).filter(([, value]) => value && value.length > 0).map(([key, value]) => {
        return { find: key, replacement: Array.isArray(value) ? value[0] : value };
      });
    }
    if (compiler.options.output.library) {
      const library = compiler.options.output.library;
      let fileName;
      if (typeof library.name === "string") {
        fileName = library.name;
      } else if (Array.isArray(library.name)) {
        fileName = library.name[0];
      } else if (library.name?.root) {
        fileName = ensureArray(library.name.root)[0];
      }
      indexName = `${fileName || "index"}.d.ts`;
    }
    handleDebug("parse webpack(rspack) config");
  }
  const rollupHooks = {
    options(options2) {
      const input = typeof options2.input === "string" ? [options2.input] : options2.input;
      if (Array.isArray(input)) {
        entries = input.reduce(
          (prev, current) => {
            prev[basename(current)] = current;
            return prev;
          },
          {}
        );
      } else {
        entries = { ...input };
      }
      logger = {
        info: this.info,
        warn: this.warn,
        error: this.error
      };
      handleDebug("parse rollup(rolldown) options");
    },
    generateBundle(_, bundle) {
      if (declarationOnly) {
        for (const id of Object.keys(bundle)) {
          delete bundle[id];
        }
      }
    }
  };
  return {
    name: "unplugin-dts",
    enforce: "pre",
    async buildStart() {
      if (isDev || runtime) return;
      handleDebug("begin buildStart");
      timeRecord = 0;
      const startTime = Date.now();
      if (entryPromise) {
        await entryPromise;
      }
      aliases = aliases || [];
      if (aliasesExclude.length > 0) {
        aliases = aliases.filter(
          ({ find }) => !aliasesExclude.some(
            (aliasExclude) => aliasExclude && (isRegExp(find) ? find.toString() === aliasExclude.toString() : isRegExp(aliasExclude) ? find.match(aliasExclude)?.[0] : find === aliasExclude)
          )
        );
      }
      for (const alias of aliases) {
        alias.replacement = resolve(alias.replacement);
      }
      runtime = await Runtime.toInstance({
        processor,
        root,
        outDirs: options.outDirs ?? outDirs,
        entryRoot,
        tsconfigPath,
        compilerOptions,
        pathsToAliases,
        include,
        exclude,
        resolvers,
        entries,
        aliases: options.aliases ?? aliases,
        libName,
        indexName,
        logger
      });
      if (meta.framework !== "esbuild") {
        for (const file of runtime.getRootFiles()) {
          this.addWatchFile(file);
        }
      }
      if (typeof afterBootstrap === "function") {
        await unwrapPromise(afterBootstrap(runtime));
      }
      handleDebug("create ts program");
      timeRecord += Date.now() - startTime;
    },
    transform: {
      filter: {
        id: {
          include: [tjsRE, /\.vue$/, /\.svelte$/, /\.json$/],
          exclude: /[\\/]node_modules[\\/]/
        }
      },
      async handler(code, id) {
        id = normalizePath(id).split("?")[0];
        if (isDev || !runtime) return;
        const startTime = Date.now();
        await runtime.transform(id, code);
        timeRecord += Date.now() - startTime;
      }
    },
    watchChange(id) {
      id = normalizePath(id);
      if (isDev || !runtime || !runtime.filter(id) || !runtime.matchResolver(id) && !tjsRE.test(id)) {
        return;
      }
      id = id.split("?")[0];
      const sourceFile = runtime.getHost().getSourceFile(id, ts.ScriptTarget.ESNext);
      if (sourceFile) {
        for (const file of runtime.getRootFiles()) {
          runtime.addRootFile(file);
        }
        runtime.addRootFile(normalizePath(sourceFile.fileName));
        bundled = false;
        timeRecord = 0;
        runtime.rebuildProgram();
      }
    },
    async writeBundle() {
      runtime.clearTransformedFiles();
      if (isDev || !runtime || bundled) return;
      bundled = true;
      handleDebug("begin writeBundle");
      logger.info(green(`
${logPrefix} Start generate declaration files...`));
      const startTime = Date.now();
      if (typeof afterDiagnostic === "function") {
        await unwrapPromise(afterDiagnostic(runtime.getDiagnostics()));
      }
      const emittedFiles = await runtime.emitOutput({
        strictOutput,
        copyDtsFiles,
        cleanVueFileName,
        staticImport,
        clearPureImport,
        insertTypesEntry,
        bundleTypes,
        logPrefix,
        beforeWriteFile,
        afterRollup
      });
      if (typeof afterBuild === "function") {
        await unwrapPromise(afterBuild(emittedFiles));
      }
      handleDebug("finish");
      logger.info(
        green(`${logPrefix} Declaration files built in ${timeRecord + Date.now() - startTime}ms.
`)
      );
    },
    vite: {
      apply: "build",
      config(config) {
        const aliasOptions = config?.resolve?.alias ?? [];
        if (isNativeObj(aliasOptions)) {
          aliases = Object.entries(aliasOptions).map(([key, value]) => {
            return { find: key, replacement: value };
          });
        } else {
          aliases = ensureArray(aliasOptions).map((alias) => ({ ...alias }));
        }
      },
      async configResolved(config) {
        logger = config.logger;
        root = ensureAbsolute(options.root ?? "", config.root);
        if (config.build.lib) {
          const input = typeof config.build.lib.entry === "string" ? [config.build.lib.entry] : config.build.lib.entry;
          if (Array.isArray(input)) {
            entries = input.reduce(
              (prev, current) => {
                prev[basename(current)] = current;
                return prev;
              },
              {}
            );
          } else {
            entries = { ...input };
          }
          const filename = config.build.lib.fileName ?? defaultIndex;
          const entry = typeof config.build.lib.entry === "string" ? config.build.lib.entry : Object.keys(config.build.lib.entry)[0];
          libName = config.build.lib.name || "_default";
          indexName = typeof filename === "string" ? filename : filename("es", entry);
          if (!dtsRE$1.test(indexName)) {
            indexName = `${indexName.replace(tjsRE, "")}.d.${getJsExtPrefix(indexName)}ts`;
          }
        } else {
          logger.warn(
            `
${logPrefix} ${yellow(
              "You are building a library that may not need to generate declaration files."
            )}
`
          );
          libName = "_default";
          indexName = defaultIndex;
        }
        if (!options.outDirs) {
          outDirs = [ensureAbsolute(config.build.outDir, root)];
        }
        handleDebug("parse vite config");
      },
      generateBundle(_, bundle) {
        if (declarationOnly) {
          for (const id of Object.keys(bundle)) {
            delete bundle[id];
          }
        }
      }
    },
    rollup: rollupHooks,
    rolldown: {
      ...rollupHooks
    },
    webpack(compiler) {
      prepareFromCompiler(compiler);
      compiler.hooks.emit.tap("UnpluginDtsRemoveAssets", (compilation) => {
        if (declarationOnly) {
          compilation.assets = {};
        }
      });
    },
    rspack(compiler) {
      prepareFromCompiler(compiler);
      compiler.hooks.thisCompilation.tap("UnpluginDtsRemoveAssets", (compilation) => {
        compilation.hooks.processAssets.tap(
          {
            name: "UnpluginDtsRemoveAssets",
            stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE
          },
          (assets) => {
            if (declarationOnly) {
              for (const filename of Object.keys(assets)) {
                delete assets[filename];
              }
            }
          }
        );
      });
    },
    esbuild: {
      setup(build) {
        const { entryPoints, outdir, absWorkingDir = process.cwd() } = build.initialOptions;
        root = ensureAbsolute(options.root ?? "", absWorkingDir);
        if (Array.isArray(entryPoints)) {
          entries = entryPoints.reduce(
            (prev, current) => {
              if (typeof current === "string") {
                prev[basename(current)] = current;
              } else {
                prev[basename(current.in)] = current.out;
              }
              return prev;
            },
            {}
          );
        } else {
          entries = { ...entryPoints };
        }
        if (!options.outDirs && outdir) {
          outDirs = [ensureAbsolute(outdir, root)];
        }
        handleDebug("parse esbuild options");
      }
    }
  };
};

export { editSourceMapDir as e, pluginFactory as p, slash as s };
