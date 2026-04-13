'use strict';

const compilerDom = require('@vue/compiler-dom');
const shared = require('@intlify/shared');
const parser = require('@babel/parser');

function evaluateValue(expression) {
  const ret = { status: "ng", value: void 0 };
  try {
    const ast = parser.parse(`const a = ${expression.trim()}`);
    if (ast.program.body.length >= 1 && ast.program.body[0].type === "VariableDeclaration" && ast.program.body[0].declarations.length >= 1) {
      const node = ast.program.body[0].declarations[0].init;
      if (node != null && (node.type === "StringLiteral" || node.type === "ObjectExpression")) {
        const val = new Function(`return ${expression.trim()} `)();
        ret.status = "ok";
        ret.value = val;
      }
    }
  } catch (_e) {
  }
  return ret;
}
function parseVTExpression(expression) {
  const ret = {
    path: "",
    named: {},
    options: {}
  };
  try {
    const ast = parser.parse(`const a = ${expression.trim()}`);
    if (ast.program.body.length >= 1 && ast.program.body[0].type === "VariableDeclaration" && ast.program.body[0].declarations.length >= 1) {
      const node = ast.program.body[0].declarations[0].init;
      if (node != null) {
        if (node.type === "StringLiteral" && node.extra) {
          ret.path = node.extra.raw;
        } else if (node.type === "Identifier") {
          ret.path = node.name;
        } else if (node.type === "MemberExpression") {
          ret.path = getObjectMemberValue(node);
        } else if (node.type === "ObjectExpression") {
          node.properties.forEach((propNode) => {
            if (propNode.type === "ObjectProperty") {
              const propKeyNode = propNode.key;
              if (propKeyNode.type !== "Identifier") {
                return;
              }
              const propValueNode = propNode.value;
              switch (propKeyNode.name) {
                case "path":
                  ret.path = getObjectMemberValue(propValueNode);
                  break;
                case "locale":
                  ret.options.locale = getObjectMemberValue(propValueNode);
                  break;
                case "choice":
                case "plural":
                  ret.options.plural = getObjectMemberValue(propValueNode);
                  break;
                case "args":
                  if (propValueNode.type === "ObjectExpression") {
                    traverseObjectMember(propValueNode, ret.named);
                  }
                  break;
                default:
                  break;
              }
            }
          });
        }
      }
    }
  } catch (_e) {
  }
  return ret;
}
function getObjectMemberValue(node) {
  if ((node.type === "StringLiteral" || node.type === "NumericLiteral") && node.extra) {
    return node.extra.raw;
  } else if (node.type === "Identifier") {
    return node.name;
  } else if (node.type === "MemberExpression") {
    const paths = [];
    collectMemberPath(node, paths);
    paths.reverse();
    return paths.join(".");
  } else {
    return "";
  }
}
function traverseObjectMember(node, target) {
  node.properties.forEach((propNode) => {
    if (propNode.type === "ObjectProperty") {
      const propKeyNode = propNode.key;
      if (propKeyNode.type !== "Identifier") {
        return;
      }
      if (!(propKeyNode.name in target)) {
        target[propKeyNode.name] = {};
      }
      const propValueNode = propNode.value;
      if (propValueNode.type === "ObjectExpression") {
        traverseObjectMember(propValueNode, target[propKeyNode.name]);
      } else {
        target[propKeyNode.name] = getObjectMemberValue(propValueNode);
      }
    }
  });
}
function collectMemberPath(node, paths) {
  if (node.type === "Identifier") {
    paths.push(node.name);
    return;
  } else if (node.type === "MemberExpression" && node.property.type === "Identifier") {
    paths.push(node.property.name);
    return collectMemberPath(node.object, paths);
  }
}

var ReportCodes = /* @__PURE__ */ ((ReportCodes2) => {
  ReportCodes2[ReportCodes2["SUCCESS"] = 0] = "SUCCESS";
  ReportCodes2[ReportCodes2["UNEXPECTED_DIRECTIVE_EXPRESSION"] = 1] = "UNEXPECTED_DIRECTIVE_EXPRESSION";
  ReportCodes2[ReportCodes2["NOT_SUPPORTED"] = 2] = "NOT_SUPPORTED";
  ReportCodes2[ReportCodes2["FAILED_VALUE_EVALUATION"] = 3] = "FAILED_VALUE_EVALUATION";
  ReportCodes2[ReportCodes2["REQUIRED_PARAMETER"] = 4] = "REQUIRED_PARAMETER";
  ReportCodes2[ReportCodes2["INVALID_PARAMETER_TYPE"] = 5] = "INVALID_PARAMETER_TYPE";
  ReportCodes2[ReportCodes2["OVERRIDE_ELEMENT_CHILDREN"] = 6] = "OVERRIDE_ELEMENT_CHILDREN";
  ReportCodes2[ReportCodes2["NOT_RESOLVED_COMPOSER"] = 7] = "NOT_RESOLVED_COMPOSER";
  ReportCodes2[ReportCodes2["UNEXPECTED_ERROR"] = 8] = "UNEXPECTED_ERROR";
  ReportCodes2[ReportCodes2["__EXTEND_POINT__"] = 9] = "__EXTEND_POINT__";
  return ReportCodes2;
})(ReportCodes || {});
const ReportMessages = {
  [1 /* UNEXPECTED_DIRECTIVE_EXPRESSION */]: `Unexpected directive expression: {0}`,
  [2 /* NOT_SUPPORTED */]: `Not supported transform: {0}`,
  [3 /* FAILED_VALUE_EVALUATION */]: `Failed value evaluation: {0}`,
  [4 /* REQUIRED_PARAMETER */]: `Required parameter: {0}`,
  [5 /* INVALID_PARAMETER_TYPE */]: `Required parameter: {0}`,
  [6 /* OVERRIDE_ELEMENT_CHILDREN */]: `v-t will override element children: {0}`,
  [7 /* NOT_RESOLVED_COMPOSER */]: `Not resolved vue-i18n composer: {0}`,
  [8 /* UNEXPECTED_ERROR */]: `Unexpected error: {0}`
};
function getReportMessage(code, ...args) {
  return shared.format(ReportMessages[code], ...args);
}
function createExtensionsError(code, msg, loc) {
  const error = new SyntaxError(msg);
  error.code = code;
  if (loc) {
    error.loc = loc;
  }
  return error;
}
function report(code, options = {}) {
  const mode = options.mode && shared.isString(options.mode) && ["warn", "error"].includes(options.mode) ? options.mode : "warn";
  const msg = getReportMessage(code, options.args);
  if (mode === "warn") {
    console.warn("[vue-i18n-extensions] " + msg);
  } else {
    throw createExtensionsError(code, msg, options.loc);
  }
}

function createContentBuilder(options = {}) {
  let _indentLevel = options.indentLevel != null && shared.isNumber(options.indentLevel) ? options.indentLevel : 0;
  let _content = "";
  function push(content) {
    _content += content;
  }
  function _newline(n) {
    push("\n" + `  `.repeat(n));
  }
  function newline() {
    _newline(_indentLevel);
  }
  function pushline(content) {
    push(content);
    newline();
  }
  function indent(withoutNewLine) {
    if (withoutNewLine) {
      ++_indentLevel;
    } else {
      _newline(++_indentLevel);
    }
  }
  function deindent(withoutNewLine) {
    if (withoutNewLine) {
      --_indentLevel;
    } else {
      _newline(--_indentLevel);
    }
  }
  return {
    get indentLevel() {
      return _indentLevel;
    },
    get content() {
      return String(_content);
    },
    push,
    newline,
    pushline,
    indent,
    deindent
  };
}

const GLOBAL_TRANSLATE_SIGNATURE = "$t";
function transformVTDirective(options = {}) {
  const i18nInstance = options.i18n;
  const mode = shared.isString(options.mode) && ["composition", "legacy"].includes(options.mode) ? options.mode : "composition";
  const translationSignatures = shared.isString(options.translationSignatures) || shared.isFunction(options.translationSignatures) ? [options.translationSignatures] : shared.isArray(options.translationSignatures) ? options.translationSignatures : ["t"];
  translationSignatures.push(GLOBAL_TRANSLATE_SIGNATURE);
  return (dir, node, context) => {
    const { exp, loc } = dir;
    if (!exp) {
      report(ReportCodes.UNEXPECTED_DIRECTIVE_EXPRESSION, {
        mode: "error",
        args: [node.loc.source || ""],
        loc: node.loc
      });
    }
    if (node.children.length > 0) {
      report(ReportCodes.OVERRIDE_ELEMENT_CHILDREN, {
        mode: "error",
        args: [node.loc.source || ""],
        loc: node.loc
      });
      node.children.length = 0;
    }
    if (isSimpleExpressionNode(exp)) {
      if (isConstant(exp) && i18nInstance) {
        const { status, value } = evaluateValue(exp.content);
        if (status === "ng") {
          report(ReportCodes.FAILED_VALUE_EVALUATION, {
            args: [node.loc.source || ""],
            loc: node.loc
          });
          return { props: [] };
        }
        const [parsedValue, parseStatus] = parseValue(value);
        if (parseStatus !== ReportCodes.SUCCESS) {
          report(parseStatus, { args: [node.loc.source || ""], loc: node.loc });
          return { props: [] };
        }
        if (parsedValue == null) {
          report(ReportCodes.UNEXPECTED_ERROR, {
            args: [node.loc.source || ""],
            loc: node.loc
          });
          return { props: [] };
        }
        const global = getComposer(i18nInstance);
        if (global == null) {
          report(ReportCodes.NOT_RESOLVED_COMPOSER, {
            args: [node.loc.source || ""],
            loc: node.loc
          });
          return { props: [] };
        }
        const content = global.t(...makeParams(parsedValue));
        node.children.push({
          type: compilerDom.NodeTypes.TEXT,
          content
        });
        return { props: [] };
      } else {
        const translationParams = parseVTExpression(exp.content);
        const code = generateTranslationCode(
          context,
          mode,
          translationParams,
          translationSignatures
        );
        context.helper(compilerDom.TO_DISPLAY_STRING);
        node.children.push({
          type: compilerDom.NodeTypes.INTERPOLATION,
          content: compilerDom.createCompoundExpression([
            compilerDom.createSimpleExpression(code, false, loc, 0 /* NOT_CONSTANT */)
          ])
        });
        return { props: [] };
      }
    } else if (isCompoundExpressionNode(exp)) {
      const content = exp.children.map(mapNodeContentHandler).join("");
      const code = generateTranslationCode(
        context,
        mode,
        parseVTExpression(content),
        translationSignatures
      );
      context.helper(compilerDom.TO_DISPLAY_STRING);
      node.children.push({
        type: compilerDom.NodeTypes.INTERPOLATION,
        content: compilerDom.createCompoundExpression([
          compilerDom.createSimpleExpression(code, false, loc, 0 /* NOT_CONSTANT */)
        ])
      });
      return { props: [] };
    } else {
      report(ReportCodes.NOT_SUPPORTED, {
        args: [node.loc.source || ""],
        loc: node.loc
      });
      return { props: [] };
    }
  };
}
function getComposer(i18n) {
  return isI18nInstance(i18n) ? getComposerInternal(i18n) : null;
}
function isI18nInstance(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n;
}
function getComposerInternal(i18n) {
  if (i18n.mode === "composition") {
    return isComposer(i18n.global) ? i18n.global : null;
  } else {
    return isVueI18n(i18n.global) ? i18n.global.__composer : null;
  }
}
function isComposer(target) {
  return target != null && !("__composer" in target);
}
function isVueI18n(target) {
  return target != null && "__composer" in target;
}
function isSimpleExpressionNode(node) {
  return node != null && node.type === compilerDom.NodeTypes.SIMPLE_EXPRESSION;
}
function isCompoundExpressionNode(node) {
  return node != null && node.type === compilerDom.NodeTypes.COMPOUND_EXPRESSION;
}
function isConstant(node) {
  if ("isConstant" in node) {
    return node.isConstant;
  } else if ("constType" in node) {
    return node.constType <= 3 /* CAN_STRINGIFY */;
  } else {
    throw Error("unexpected error in Vue SimpleExpressionNode");
  }
}
function mapNodeContentHandler(value) {
  if (shared.isString(value)) {
    return value;
  } else if (shared.isSymbol(value)) {
    return value.description || "";
  } else if (isSimpleExpressionNode(value)) {
    return value.content;
  } else if (isCompoundExpressionNode(value)) {
    return value.children.map(mapNodeContentHandler).join("");
  } else if (compilerDom.isText(value)) {
    if (shared.isString(value.content)) {
      return value.content;
    } else if (isSimpleExpressionNode(value.content)) {
      return value.content.content;
    } else if (isCompoundExpressionNode(value.content)) {
      return value.content.children.map(mapNodeContentHandler).join("");
    } else {
      return "";
    }
  } else {
    return "";
  }
}
function parseValue(value) {
  if (shared.isString(value)) {
    return [{ path: value }, ReportCodes.SUCCESS];
  } else if (shared.isObject(value)) {
    if (!("path" in value)) {
      return [null, ReportCodes.REQUIRED_PARAMETER];
    }
    return [value, ReportCodes.SUCCESS];
  } else {
    return [null, ReportCodes.INVALID_PARAMETER_TYPE];
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (shared.isString(locale)) {
    options.locale = locale;
  }
  if (shared.isNumber(choice)) {
    options.plural = choice;
  }
  if (shared.isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function generateTranslationCode(context, mode, params, translationSignatures) {
  return mode === "composition" ? generateComposableCode(context, params, translationSignatures) : generateLegacyCode(context, params);
}
function generateTranslationCallableSignatures(context, translationSignatures) {
  const baseResolver = (context2, signature) => {
    const { prefixIdentifiers, bindingMetadata, inline } = context2;
    if (inline && signature !== GLOBAL_TRANSLATE_SIGNATURE) {
      return signature;
    }
    const type = shared.hasOwn(bindingMetadata, signature) && bindingMetadata[signature];
    const bindingContext = prefixIdentifiers ? type && type.startsWith("setup") || type === compilerDom.BindingTypes.LITERAL_CONST ? "$setup." : "_ctx." : "";
    return `${bindingContext}${signature}`;
  };
  return translationSignatures.map((signatureOrResolver) => {
    if (shared.isFunction(signatureOrResolver)) {
      return signatureOrResolver(context, baseResolver);
    }
    return baseResolver(context, signatureOrResolver);
  }).filter(Boolean).join(" || ");
}
function generateComposableCode(context, params, translationSignatures) {
  const baseCode = `(${generateTranslationCallableSignatures(context, translationSignatures)})`;
  const builder = createContentBuilder();
  builder.push(`${baseCode}(`);
  builder.push(`${shared.toDisplayString(params.path)}`);
  builder.push(`, { `);
  generateNamedCode(builder, params.named);
  builder.push(` }`);
  builder.push(`, { `);
  if (params.options.locale) {
    builder.push(`locale: ${shared.toDisplayString(params.options.locale)}`);
  }
  if (params.options.plural) {
    if (params.options.locale) {
      builder.push(", ");
    }
    builder.push(`plural: ${shared.toDisplayString(params.options.plural)}`);
  }
  builder.push(` }`);
  builder.push(`)`);
  const content = builder.content;
  return content;
}
function generateNamedCode(builder, named) {
  const keys = Object.keys(named);
  keys.forEach((k) => {
    const v = named[k];
    if (shared.isObject(v)) {
      builder.push(`${k}: { `);
      generateNamedCode(builder, v);
      builder.push(` }`);
    } else {
      builder.push(`${k}: ${shared.toDisplayString(v)}`);
    }
  });
}
function generateLegacyCode(context, params) {
  const mode = !params.options.plural ? "basic" : "plural";
  const baseCode = `${context.prefixIdentifiers ? "_ctx." : ""}${mode === "basic" ? "$t" : "$tc"}`;
  const builder = createContentBuilder();
  builder.push(`${baseCode}(`);
  builder.push(`${shared.toDisplayString(params.path)}`);
  if (mode === "basic") {
    if (shared.isString(params.options.locale)) {
      builder.push(`, ${shared.toDisplayString(params.options.locale)}`);
    }
    builder.push(`, { `);
    generateNamedCode(builder, params.named);
    builder.push(` }`);
  } else {
    builder.push(`, ${shared.toDisplayString(params.options.plural)}`);
    if (shared.isString(params.options.locale)) {
      builder.push(`, ${shared.toDisplayString(params.options.locale)}`);
    } else {
      builder.push(`, { `);
      generateNamedCode(builder, params.named);
      builder.push(` }`);
    }
  }
  builder.push(`)`);
  const content = builder.content;
  return content;
}

exports.transformVTDirective = transformVTDirective;
