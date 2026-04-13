import module from 'node:module';
import { isBoolean, format, escapeHtml, friendlyJSONstringify, isString, isNumber } from '@intlify/shared';
import { parse } from 'acorn';
import { generate as generate$4 } from 'escodegen';
import { walk } from 'estree-walker';
import { LOCATION_STUB, detectHtmlTag, baseCompile } from '@intlify/message-compiler';
import { SourceMapGenerator, SourceMapConsumer } from 'source-map-js';
import { parseJSON, getStaticJSONValue, traverseNodes } from 'jsonc-eslint-parser';
import { transform } from 'esbuild';
import { parseYAML, getStaticYAMLValue, traverseNodes as traverseNodes$1 } from 'yaml-eslint-parser';

const _require = module.createRequire(import.meta.url);
function checkInstallPackage(pkg, debug) {
  let installedVueI18n = false;
  try {
    debug(`vue-i18n load path: ${_require.resolve("vue-i18n")}`);
    installedVueI18n = true;
  } catch (e) {
    debug(`cannot find 'vue-i18n'`, e);
  }
  let installedPetiteVueI18n = false;
  try {
    debug(`petite-vue-i18n load path: ${_require.resolve("petite-vue-i18n")}`);
    installedPetiteVueI18n = true;
  } catch (e) {
    debug(`cannot find 'petite-vue-i18n'`, e);
  }
  if (installedVueI18n) {
    return "vue-i18n";
  }
  if (installedPetiteVueI18n) {
    return "petite-vue-i18n";
  }
  throw new Error(
    `${pkg} requires 'vue-i18n' or 'petite-vue-i18n' to be present in the dependency tree.`
  );
}
function getVueI18nVersion(debug, pkg = "vue-i18n") {
  const VueI18n = loadModule(pkg, debug);
  if (VueI18n == null) {
    return "";
  }
  if (VueI18n.VERSION && VueI18n.VERSION.startsWith("9.")) {
    return "9";
  }
  if (VueI18n.VERSION && VueI18n.VERSION.startsWith("10.")) {
    return "10";
  }
  return "unknown";
}
function loadModule(moduleName, debug) {
  try {
    return _require(moduleName);
  } catch (e) {
    debug(`cannot load '${moduleName}'`, e);
    return null;
  }
}

function createCodeGenerator(options = {
  filename: "bundle.json",
  sourceMap: false,
  env: "development",
  forceStringify: false
}) {
  const { sourceMap, source, filename } = options;
  const _context = Object.assign(
    {
      code: "",
      column: 1,
      line: 1,
      offset: 0,
      map: void 0,
      indentLevel: 0
    },
    options
  );
  const context = () => _context;
  function push(code, node, name) {
    _context.code += code;
    if (_context.map && node) {
      if (node.loc && node.loc !== LOCATION_STUB) {
        addMapping(node.loc.start, name);
      }
      advancePositionWithSource(_context, code);
    }
  }
  function _newline(n) {
    push("\n" + `  `.repeat(n));
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  function pushline(code, node, name) {
    push(code, node, name);
    newline();
  }
  function addMapping(loc, name) {
    _context.map.addMapping({
      name,
      source: _context.filename,
      original: {
        line: loc.line,
        column: loc.column - 1
      },
      generated: {
        line: _context.line,
        column: _context.column - 1
      }
    });
  }
  if (sourceMap && source) {
    _context.map = new SourceMapGenerator();
    _context.map.setSourceContent(filename, source);
  }
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    pushline
  };
}
function advancePositionWithSource(pos, source, numberOfCharacters = source.length) {
  if (pos.offset == null) {
    return pos;
  }
  let linesCount = 0;
  let lastNewLinePos = -1;
  for (let i = 0; i < numberOfCharacters; i++) {
    if (source.charCodeAt(i) === 10) {
      linesCount++;
      lastNewLinePos = i;
    }
  }
  pos.offset += numberOfCharacters;
  pos.line += linesCount;
  pos.column = lastNewLinePos === -1 ? pos.column + numberOfCharacters : numberOfCharacters - lastNewLinePos;
  return pos;
}
const DETECT_MESSAGE = `Detected HTML in '{msg}' message.`;
const ON_ERROR_NOOP = () => {
};
function parsePath(path) {
  return path ? path.join(".") : "";
}
function generateMessageFunction(msg, options = {}, path) {
  const env = options.env != null ? options.env : "development";
  const strictMessage = isBoolean(options.strictMessage) ? options.strictMessage : true;
  const escapeHtml$1 = !!options.escapeHtml;
  const onError = options.onError || ON_ERROR_NOOP;
  const errors = [];
  let detecteHtmlInMsg = false;
  if (detectHtmlTag(msg)) {
    detecteHtmlInMsg = true;
    if (strictMessage) {
      const errMsg = format(DETECT_MESSAGE, { msg });
      onError(format(errMsg), {
        source: msg,
        path: parsePath(path)
      });
    }
  }
  const _msg = detecteHtmlInMsg && escapeHtml$1 ? escapeHtml(msg) : msg;
  const newOptions = Object.assign({ mode: "arrow" }, options);
  newOptions.onError = (err) => {
    if (onError) {
      const extra = {
        source: msg,
        path: parsePath(path),
        code: err.code,
        domain: err.domain,
        location: err.location
      };
      onError(err.message, extra);
      errors.push(err);
    }
  };
  const { code, ast, map } = baseCompile(_msg, newOptions);
  const occured = errors.length > 0;
  const genCode = !occured ? env === "development" ? `(()=>{const fn=${code};fn.source=${JSON.stringify(msg)};return fn;})()` : `${code}` : `\`${_msg}\``;
  return { code: genCode, ast, map, errors };
}
function mapLinesColumns(resMap, codeMaps, inSourceMap) {
  if (!resMap) {
    return null;
  }
  const resMapConsumer = new SourceMapConsumer(resMap);
  const inMapConsumer = inSourceMap ? new SourceMapConsumer(inSourceMap) : null;
  const mergedMapGenerator = new SourceMapGenerator();
  let inMapFirstItem = null;
  if (inMapConsumer) {
    inMapConsumer.eachMapping((m) => {
      if (inMapFirstItem) {
        return;
      }
      inMapFirstItem = m;
    });
  }
  resMapConsumer.eachMapping((res) => {
    if (res.originalLine == null) {
      return;
    }
    const map = codeMaps.get(res.name);
    if (!map) {
      return;
    }
    let inMapOrigin = null;
    if (inMapConsumer) {
      inMapOrigin = inMapConsumer.originalPositionFor({
        line: res.originalLine,
        column: res.originalColumn - 1
      });
      if (inMapOrigin.source == null) {
        inMapOrigin = null;
        return;
      }
    }
    const mapConsumer = new SourceMapConsumer(map);
    mapConsumer.eachMapping((m) => {
      mergedMapGenerator.addMapping({
        original: {
          line: inMapFirstItem ? inMapFirstItem.originalLine + res.originalLine - 2 : res.originalLine,
          column: inMapFirstItem ? inMapFirstItem.originalColumn + res.originalColumn : res.originalColumn
        },
        generated: {
          line: inMapFirstItem ? inMapFirstItem.generatedLine + res.originalLine - 2 : res.originalLine,
          // map column with message format compilation code map
          column: inMapFirstItem ? inMapFirstItem.generatedColumn + res.originalColumn + m.generatedColumn : res.originalColumn + m.generatedColumn
        },
        source: inMapOrigin ? inMapOrigin.source : res.source,
        name: m.name
        // message format compilation code
      });
    });
  });
  const generator = mergedMapGenerator;
  const targetConsumer = inMapConsumer || resMapConsumer;
  targetConsumer.sources.forEach((sourceFile) => {
    generator._sources.add(sourceFile);
    const sourceContent = targetConsumer.sourceContentFor(sourceFile);
    if (sourceContent != null) {
      mergedMapGenerator.setSourceContent(sourceFile, sourceContent);
    }
  });
  generator._sourceRoot = inSourceMap ? inSourceMap.sourceRoot : resMap.sourceRoot;
  generator._file = inSourceMap ? inSourceMap.file : resMap.file;
  return generator.toJSON();
}
function generateResourceAst(msg, options = {}, path) {
  const env = options.env != null ? options.env : "development";
  const strictMessage = isBoolean(options.strictMessage) ? options.strictMessage : true;
  const escapeHtml$1 = !!options.escapeHtml;
  const onError = options.onError || ON_ERROR_NOOP;
  const errors = [];
  let detecteHtmlInMsg = false;
  if (detectHtmlTag(msg)) {
    detecteHtmlInMsg = true;
    if (strictMessage) {
      const errMsg = format(DETECT_MESSAGE, { msg });
      onError(format(errMsg), {
        source: msg,
        path: parsePath(path)
      });
    }
  }
  const _msg = detecteHtmlInMsg && escapeHtml$1 ? escapeHtml(msg) : msg;
  const newOptions = Object.assign(
    {
      location: env === "development",
      minify: isBoolean(options.minify) ? options.minify : env === "production"
    },
    options
  );
  if (newOptions.jit != null) {
    newOptions.jit = true;
  }
  newOptions.onError = (err) => {
    if (onError) {
      const extra = {
        source: msg,
        path: parsePath(path),
        code: err.code,
        domain: err.domain,
        location: err.location
      };
      onError(err.message, extra);
      errors.push(err);
    }
  };
  const { ast, map } = baseCompile(_msg, newOptions);
  const occured = errors.length > 0;
  const code = !occured ? `${friendlyJSONstringify(ast)}` : `\`${_msg}\``;
  return { code, ast, map, errors };
}
function excludeLocales({
  messages,
  onlyLocales
}) {
  const _messages = { ...messages };
  Object.keys(_messages).forEach((locale) => {
    if (!onlyLocales.includes(locale)) {
      delete _messages[locale];
    }
  });
  return _messages;
}

class DynamicResourceError extends Error {
}
const DEFAULT_OPTIONS = {
  type: "plain",
  filename: "vue-i18n-loader.js",
  inSourceMap: void 0,
  locale: "",
  isGlobal: false,
  sourceMap: false,
  env: "development",
  forceStringify: false,
  onError: void 0,
  onWarn: void 0,
  strictMessage: true,
  escapeHtml: false,
  allowDynamic: false,
  jit: false
};
function generate$3(targetSource, options) {
  const value = Buffer.isBuffer(targetSource) ? targetSource.toString() : targetSource;
  const _options = Object.assign({}, DEFAULT_OPTIONS, options, {
    source: value
  });
  const generator = createCodeGenerator(_options);
  const ast = parse(value, {
    ecmaVersion: "latest",
    sourceType: "module",
    sourceFile: _options.filename,
    allowImportExportEverywhere: true
  });
  const exportResult = scanAst(ast);
  if (!_options.allowDynamic) {
    if (!exportResult) {
      throw new Error(`You need to define an object as the locale message with 'export default'.`);
    }
    if (exportResult !== "object") {
      throw new DynamicResourceError(
        `You need to define an object as the locale message with 'export default'.`
      );
    }
  } else {
    if (!exportResult) {
      throw new Error(`You need to define 'export default' that will return the locale messages.`);
    }
    if (exportResult !== "object") {
      return {
        ast,
        code: value,
        map: _options.inSourceMap
      };
    }
  }
  const codeMaps = _generate$2(generator, ast, _options);
  const { code, map } = generator.context();
  const newMap = map ? mapLinesColumns(map.toJSON(), codeMaps, _options.inSourceMap) || null : null;
  return {
    ast,
    code,
    map: newMap != null ? newMap : void 0
  };
}
function scanAst(ast) {
  if (ast.type !== "Program") {
    throw new Error("Invalid AST: does not have Program node");
  }
  for (const node of ast.body) {
    if (node.type !== "ExportDefaultDeclaration") continue;
    switch (node.declaration.type) {
      case "ObjectExpression":
        return "object";
      case "FunctionDeclaration":
        return "function";
      case "ArrowFunctionExpression":
        return "arrow-function";
    }
  }
  return false;
}
function _generate$2(generator, node, options = {}) {
  const propsCountStack = [];
  const pathStack = [];
  const itemsCountStack = [];
  const skipStack = [];
  const { forceStringify } = generator.context();
  const codeMaps = /* @__PURE__ */ new Map();
  const { type, sourceMap, isGlobal, locale, jit } = options;
  const _codegenFn = jit ? generateResourceAst : generateMessageFunction;
  function codegenFn(value) {
    const { code, map } = _codegenFn(value, options, pathStack);
    sourceMap && map != null && codeMaps.set(value, map);
    return code;
  }
  const componentNamespace = "_Component";
  const variableDeclarations = [];
  walk(node, {
    /**
     * NOTE:
     *  force cast to Node of `estree-walker@3.x`,
     *  because `estree-walker@3.x` is not dual packages,
     *  so it's support only esm only ...
     */
    // @ts-ignore
    enter(node2, _parent) {
      if (_parent?.type != null) this.skip();
      switch (node2.type) {
        case "ExportDefaultDeclaration":
          this.skip();
          break;
        case "ImportDeclaration":
          generator.push(options.source?.slice(node2.start, node2.end));
          generator.newline();
          break;
        case "VariableDeclaration":
          generator.push(options.source?.slice(node2.start, node2.end));
          generator.newline();
          variableDeclarations.push(
            ...node2.declarations.map((x) => `\`${x.id.name}\``)
          );
          break;
      }
    }
  });
  if (variableDeclarations.length > 0) {
    options?.onWarn?.(
      `
Variable declarations are not optimized - found ${variableDeclarations.join(", ")}`
    );
  }
  walk(node, {
    /**
     * NOTE:
     *  force cast to Node of `estree-walker@3.x`,
     *  because `estree-walker@3.x` is not dual packages,
     *  so it's support only esm only ...
     */
    // @ts-ignore
    enter(node2, parent) {
      if (parent?.type === "Program") {
        switch (node2.type) {
          case "ImportDeclaration":
          case "VariableDeclaration":
          case "VariableDeclarator":
            this.skip();
        }
      } else if (parent?.type === "ArrayExpression") {
        const lastIndex = itemsCountStack.length - 1;
        const currentCount = parent.elements.length - itemsCountStack[lastIndex];
        pathStack.push(currentCount.toString());
        itemsCountStack[lastIndex] = --itemsCountStack[lastIndex];
      } else if (parent?.type === "ObjectExpression") {
        const lastIndex = propsCountStack.length - 1;
        propsCountStack[lastIndex] = --propsCountStack[lastIndex];
      }
      switch (node2.type) {
        case "Program":
          if (type === "plain") {
            generator.push(`const resource = `);
          } else if (type === "sfc") {
            const localeName = JSON.stringify(locale ?? '""');
            const variableName = !isGlobal ? "__i18n" : "__i18nGlobal";
            generator.push(`export default function (Component) {`);
            generator.indent();
            generator.pushline(`const ${componentNamespace} = Component`);
            generator.pushline(
              `${componentNamespace}.${variableName} = ${componentNamespace}.${variableName} || []`
            );
            generator.push(`${componentNamespace}.${variableName}.push({`);
            generator.indent();
            generator.pushline(`"locale": ${localeName},`);
            generator.push(`"resource": `);
          }
          break;
        case "ObjectExpression":
          generator.push("{");
          generator.indent();
          propsCountStack.push(node2.properties.length);
          break;
        case "ArrayExpression":
          generator.push("[");
          generator.indent();
          itemsCountStack.push(node2.elements.length);
          break;
        case "Property":
          if (parent?.type !== "ObjectExpression") break;
          if (node2.key.type !== "Literal" && node2.key.type !== "Identifier") break;
          const name = node2.key.type === "Literal" ? String(node2.key.value) : node2.key.name;
          const strName = JSON.stringify(name);
          if (isJSONablePrimitiveLiteral(node2.value)) {
            generator.push(`${strName}: `);
            pathStack.push(name);
            const value = getValue(node2.value);
            const strValue = JSON.stringify(value);
            if (node2.value.type === "Literal" && isString(node2.value.value) || node2.value.type === "TemplateLiteral") {
              generator.push(codegenFn(value), node2.value, value);
            } else if (forceStringify) {
              generator.push(codegenFn(strValue), node2.value, strValue);
            } else {
              generator.push(strValue);
            }
            skipStack.push(false);
          } else if (node2.value.type === "ArrayExpression" || node2.value.type === "ObjectExpression") {
            generator.push(`${strName}: `);
            pathStack.push(name);
            skipStack.push(false);
          } else if (node2.value.type === "FunctionExpression" || node2.value.type === "ArrowFunctionExpression") {
            generator.push(`${strName}: `);
            pathStack.push(name);
            const code = generate$4(node2.value, {
              format: { compact: true }
            });
            generator.push(code, node2.value, code);
            skipStack.push(false);
          } else {
            const skipProperty = "regex" in node2.value;
            if (!skipProperty && node2.type === "Property") {
              const identifierName = node2.value.type === "Identifier" && String(node2.value.name) || node2.value.type === "Literal" && String(node2.value.value);
              generator.push(`${strName}: ${identifierName || name}`);
              skipStack.push(false);
            } else {
              skipStack.push(true);
            }
          }
          break;
        case "SpreadElement":
          const spreadIdentifier = node2.argument.type === "Identifier" && String(node2.argument.name) || node2.argument.type === "Literal" && String(node2.argument.value);
          generator.push(`...${spreadIdentifier}`);
          break;
        default:
          if (parent?.type === "ArrayExpression") {
            if (isJSONablePrimitiveLiteral(node2)) {
              const value = getValue(node2);
              const strValue = JSON.stringify(value);
              if (node2.type === "Literal" && isString(node2.value) || node2.type === "TemplateLiteral") {
                generator.push(codegenFn(value), node2, value);
              } else if (forceStringify) {
                generator.push(codegenFn(strValue), node2, strValue);
              } else {
                generator.push(strValue);
              }
              skipStack.push(false);
            } else {
              skipStack.push(true);
            }
          }
          break;
      }
    },
    /**
     * NOTE:
     *  force cast to Node of `estree-walker@3.x`,
     *  because `estree-walker@3.x` is not dual packages,
     *  so it's support only esm only ...
     */
    // @ts-ignore
    leave(node2, parent) {
      switch (node2.type) {
        case "Program":
          if (type === "plain") {
            generator.push("\n");
            generator.push("export default resource");
          } else if (type === "sfc") {
            generator.deindent();
            generator.push("})");
            generator.deindent();
            generator.pushline("}");
          }
          break;
        case "ObjectExpression":
          if (propsCountStack[propsCountStack.length - 1] === 0) {
            pathStack.pop();
            propsCountStack.pop();
          }
          generator.deindent();
          generator.push("}");
          break;
        case "ArrayExpression":
          if (itemsCountStack[itemsCountStack.length - 1] === 0) {
            pathStack.pop();
            itemsCountStack.pop();
          }
          generator.deindent();
          generator.push("]");
          break;
      }
      if (parent?.type === "ArrayExpression" || parent?.type === "ObjectExpression") {
        const stackArr = node2.type === "Property" ? propsCountStack : itemsCountStack;
        if (stackArr[stackArr.length - 1] !== 0) {
          pathStack.pop();
          !skipStack.pop() && generator.pushline(",");
        }
      }
    }
  });
  return codeMaps;
}
function isJSONablePrimitiveLiteral(node) {
  return node.type === "Literal" && (isString(node.value) || isNumber(node.value) || isBoolean(node.value) || node.value === null) || node.type === "TemplateLiteral";
}
function getValue(node) {
  return node.type === "Literal" ? node.value : node.type === "TemplateLiteral" ? node.quasis.map((quasi) => quasi.value.cooked).join("") : void 0;
}

function generate$2(targetSource, {
  type = "plain",
  onlyLocales = [],
  filename = "vue-i18n-loader.json",
  inSourceMap = void 0,
  locale = "",
  isGlobal = false,
  sourceMap = false,
  env = "development",
  forceStringify = false,
  onError = void 0,
  strictMessage = true,
  escapeHtml = false,
  jit = false
}) {
  let value = Buffer.isBuffer(targetSource) ? targetSource.toString() : targetSource;
  const options = {
    type,
    source: value,
    sourceMap,
    locale,
    isGlobal,
    inSourceMap,
    env,
    filename,
    forceStringify,
    onError,
    strictMessage,
    escapeHtml,
    jit
  };
  let ast = parseJSON(value, { filePath: filename });
  if (!locale && type === "sfc" && onlyLocales?.length) {
    const messages = getStaticJSONValue(ast);
    value = JSON.stringify(
      excludeLocales({
        messages,
        onlyLocales
      })
    );
    ast = parseJSON(value, { filePath: filename });
  }
  if (locale && onlyLocales?.length && !onlyLocales.includes(locale)) {
    value = JSON.stringify({});
    ast = parseJSON(value, { filePath: filename });
    options.locale = "";
    options.source = void 0;
  }
  const generator = createCodeGenerator(options);
  const codeMaps = _generate$1(generator, ast, options);
  const { code, map } = generator.context();
  const newMap = map && !jit ? mapLinesColumns(map.toJSON(), codeMaps, inSourceMap) || null : null;
  return {
    ast,
    code,
    map: newMap != null ? newMap : void 0
  };
}
function _generate$1(generator, node, options = {}) {
  const propsCountStack = [];
  const pathStack = [];
  const itemsCountStack = [];
  const { forceStringify } = generator.context();
  const codeMaps = /* @__PURE__ */ new Map();
  const { type, sourceMap, isGlobal, locale, jit } = options;
  const _codegenFn = jit ? generateResourceAst : generateMessageFunction;
  function codegenFn(value) {
    const { code, map } = _codegenFn(value, options, pathStack);
    sourceMap && map != null && codeMaps.set(value, map);
    return code;
  }
  const componentNamespace = "_Component";
  traverseNodes(node, {
    enterNode(node2, parent) {
      if (parent?.type === "JSONArrayExpression") {
        const lastIndex = itemsCountStack.length - 1;
        const currentCount = parent.elements.length - itemsCountStack[lastIndex];
        pathStack.push(currentCount.toString());
        itemsCountStack[lastIndex] = --itemsCountStack[lastIndex];
      } else if (parent?.type === "JSONObjectExpression") {
        const lastIndex = propsCountStack.length - 1;
        propsCountStack[lastIndex] = --propsCountStack[lastIndex];
      }
      switch (node2.type) {
        case "Program":
          if (type === "plain") {
            generator.push(`const resource = `);
          } else if (type === "sfc") {
            const variableName = !isGlobal ? "__i18n" : "__i18nGlobal";
            const localeName = JSON.stringify(locale ?? `""`);
            generator.push(`export default function (Component) {`);
            generator.indent();
            generator.pushline(`const ${componentNamespace} = Component`);
            generator.pushline(
              `${componentNamespace}.${variableName} = ${componentNamespace}.${variableName} || []`
            );
            generator.push(`${componentNamespace}.${variableName}.push({`);
            generator.indent();
            generator.pushline(`"locale": ${localeName},`);
            generator.push(`"resource": `);
          }
          break;
        case "JSONObjectExpression":
          generator.push(`{`);
          generator.indent();
          propsCountStack.push(node2.properties.length);
          break;
        case "JSONArrayExpression":
          generator.push(`[`);
          generator.indent();
          itemsCountStack.push(node2.elements.length);
          break;
        case "JSONProperty": {
          const name = node2.key.type === "JSONLiteral" ? node2.key.value : node2.key.name;
          const strName = JSON.stringify(name);
          generator.push(`${strName}: `);
          pathStack.push(name.toString());
          if (node2.value.type === "JSONLiteral") {
            const value2 = node2.value.value;
            const strValue2 = JSON.stringify(value2);
            if (isString(value2)) {
              generator.push(codegenFn(value2), node2.value, value2);
            } else if (forceStringify) {
              generator.push(codegenFn(strValue2), node2.value, strValue2);
            } else {
              generator.push(strValue2);
            }
          }
          break;
        }
        case "JSONLiteral":
          if (parent.type !== "JSONArrayExpression") break;
          const value = node2.value;
          const strValue = JSON.stringify(value);
          if (isString(value)) {
            generator.push(codegenFn(value), node2, value);
          } else if (forceStringify) {
            generator.push(codegenFn(strValue), node2, strValue);
          } else {
            generator.push(strValue);
          }
          break;
      }
    },
    leaveNode(node2, parent) {
      switch (node2.type) {
        case "Program":
          if (type === "sfc") {
            generator.deindent();
            generator.push(`})`);
            generator.deindent();
            generator.pushline(`}`);
          } else if (type === "plain") {
            generator.push(`
`);
            generator.push("export default resource");
          }
          break;
        case "JSONObjectExpression":
          if (propsCountStack[propsCountStack.length - 1] === 0) {
            pathStack.pop();
            propsCountStack.pop();
          }
          generator.deindent();
          generator.push(`}`);
          break;
        case "JSONArrayExpression":
          if (itemsCountStack[itemsCountStack.length - 1] === 0) {
            pathStack.pop();
            itemsCountStack.pop();
          }
          generator.deindent();
          generator.push(`]`);
          break;
      }
      if (parent?.type === "JSONArrayExpression" || parent?.type === "JSONObjectExpression") {
        const stackArr = node2.type === "JSONProperty" ? propsCountStack : itemsCountStack;
        if (stackArr[stackArr.length - 1] !== 0) {
          pathStack.pop();
          generator.pushline(`,`);
        }
      }
    }
  });
  return codeMaps;
}

async function generate$1(targetSource, options) {
  let value = Buffer.isBuffer(targetSource) ? targetSource.toString() : targetSource;
  const _options = Object.assign({}, DEFAULT_OPTIONS, options, {
    source: value
  });
  if (_options.filename && /.[c|m]?ts$/.test(_options.filename)) {
    const transformed = await transform(value, { loader: "ts" });
    if (transformed && transformed.code) {
      value = transformed.code;
      _options.source = transformed.code;
    }
  }
  return generate$3(value, _options);
}

function generate(targetSource, {
  type = "plain",
  onlyLocales = [],
  filename = "vue-i18n-loader.yaml",
  inSourceMap = void 0,
  locale = "",
  isGlobal = false,
  sourceMap = false,
  env = "development",
  forceStringify = false,
  onError = void 0,
  strictMessage = true,
  escapeHtml = false,
  jit = false
}) {
  let value = Buffer.isBuffer(targetSource) ? targetSource.toString() : targetSource;
  const options = {
    type,
    source: value,
    sourceMap,
    locale,
    isGlobal,
    inSourceMap,
    env,
    filename,
    forceStringify,
    onError,
    strictMessage,
    escapeHtml,
    jit
  };
  let ast = parseYAML(value, { filePath: filename });
  if (!locale && type === "sfc" && onlyLocales?.length) {
    const messages = getStaticYAMLValue(ast);
    value = JSON.stringify(
      excludeLocales({
        messages,
        onlyLocales
      })
    );
    ast = parseYAML(value, { filePath: filename });
  }
  if (locale && onlyLocales?.length && !onlyLocales.includes(locale)) {
    value = JSON.stringify({});
    ast = parseYAML(value, { filePath: filename });
    options.locale = "";
    options.source = void 0;
  }
  const generator = createCodeGenerator(options);
  const codeMaps = _generate(generator, ast, options);
  const { code, map } = generator.context();
  const newMap = map ? mapLinesColumns(map.toJSON(), codeMaps, inSourceMap) || null : null;
  return {
    ast,
    code,
    map: newMap != null ? newMap : void 0
  };
}
function _generate(generator, node, options = {}) {
  const propsCountStack = [];
  const pathStack = [];
  const itemsCountStack = [];
  const { forceStringify } = generator.context();
  const codeMaps = /* @__PURE__ */ new Map();
  const { type, sourceMap, isGlobal, locale, jit } = options;
  const _codegenFn = jit ? generateResourceAst : generateMessageFunction;
  function codegenFn(value) {
    const { code, map } = _codegenFn(value, options, pathStack);
    sourceMap && map != null && codeMaps.set(value, map);
    return code;
  }
  const componentNamespace = "_Component";
  traverseNodes$1(node, {
    enterNode(node2, parent) {
      if (parent?.type === "YAMLSequence") {
        const lastIndex = itemsCountStack.length - 1;
        const currentCount = parent.entries.length - itemsCountStack[lastIndex];
        pathStack.push(currentCount.toString());
        itemsCountStack[lastIndex] = --itemsCountStack[lastIndex];
      } else if (parent?.type === "YAMLMapping") {
        const lastIndex = propsCountStack.length - 1;
        propsCountStack[lastIndex] = --propsCountStack[lastIndex];
      }
      switch (node2.type) {
        case "Program":
          if (type === "plain") {
            generator.push(`const resource = `);
          } else if (type === "sfc") {
            const variableName = !isGlobal ? "__i18n" : "__i18nGlobal";
            const localeName = JSON.stringify(locale ?? `""`);
            generator.push(`export default function (Component) {`);
            generator.indent();
            generator.pushline(`const ${componentNamespace} = Component`);
            generator.pushline(
              `${componentNamespace}.${variableName} = ${componentNamespace}.${variableName} || []`
            );
            generator.push(`${componentNamespace}.${variableName}.push({`);
            generator.indent();
            generator.pushline(`"locale": ${localeName},`);
            generator.push(`"resource": `);
          }
          break;
        case "YAMLMapping":
          generator.push(`{`);
          generator.indent();
          propsCountStack.push(node2.pairs.length);
          break;
        case "YAMLSequence":
          generator.push(`[`);
          generator.indent();
          itemsCountStack.push(node2.entries.length);
          break;
        case "YAMLPair":
          if (node2.key?.type !== "YAMLScalar") break;
          if (node2.value?.type === "YAMLScalar") {
            const name = node2.key.value;
            const value = node2.value.value;
            const strName = JSON.stringify(name);
            const strValue = JSON.stringify(value);
            name && pathStack.push(name.toString());
            generator.push(`${strName}: `);
            if (isString(value)) {
              generator.push(codegenFn(value), node2.value, value);
            } else if (forceStringify) {
              generator.push(codegenFn(strValue), node2.value, strValue);
            } else {
              generator.push(strValue);
            }
          } else if (node2.value?.type === "YAMLMapping" || node2.value?.type === "YAMLSequence") {
            const name = node2.key.value;
            name && pathStack.push(name.toString());
            generator.push(`${JSON.stringify(name)}: `);
          }
          break;
        case "YAMLScalar":
          if (parent.type === "YAMLSequence") {
            const value = node2.value;
            const strValue = JSON.stringify(value);
            if (isString(value)) {
              generator.push(codegenFn(value), node2, value);
            } else if (forceStringify) {
              generator.push(codegenFn(strValue), node2, strValue);
            } else {
              generator.push(strValue);
            }
          }
          break;
      }
    },
    leaveNode(node2, parent) {
      switch (node2.type) {
        case "Program":
          if (type === "sfc") {
            generator.deindent();
            generator.push(`})`);
            generator.deindent();
            generator.push(`}`);
          } else if (type === "plain") {
            generator.push(`
`);
            generator.push("export default resource");
          }
          break;
        case "YAMLMapping":
          if (propsCountStack[propsCountStack.length - 1] === 0) {
            pathStack.pop();
            propsCountStack.pop();
          }
          generator.deindent();
          generator.push(`}`);
          break;
        case "YAMLSequence":
          if (itemsCountStack[itemsCountStack.length - 1] === 0) {
            pathStack.pop();
            itemsCountStack.pop();
          }
          generator.deindent();
          generator.push(`]`);
          break;
      }
      const stackArr = node2.type === "YAMLPair" ? propsCountStack : itemsCountStack;
      if (parent?.type === "YAMLSequence" || parent?.type === "YAMLMapping") {
        if (stackArr[stackArr.length - 1] !== 0) {
          pathStack.pop();
          generator.pushline(`,`);
        } else if (node2.type === "YAMLScalar") {
          generator.pushline(`,`);
        }
      }
    }
  });
  return codeMaps;
}

export { checkInstallPackage, generate$2 as generateJSON, generate$3 as generateJavaScript, generate$1 as generateTypescript, generate as generateYAML, getVueI18nVersion };
