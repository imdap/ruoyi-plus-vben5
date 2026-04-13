import { SourceCode } from 'eslint';
import { VisitorKeys } from 'jsonc-eslint-parser';
import esquery from 'esquery';

function newProxyWithProperties(target, properties) {
  return newProxyWithGet(target, (_target, prop) => {
    if (prop in properties) {
      return properties[prop];
    }
    return Reflect.get(target, prop);
  });
}
function newProxyWithGet(target, get) {
  return new Proxy(
    Object.isFrozen(target) ? { __proto__: target } : target,
    {
      get(t, p, r) {
        return proxyReflectValue(get(t, p, r), t, r);
      }
    }
  );
}
function proxyReflectValue(value, target, receiver) {
  if (typeof value === "function") {
    return function(...args) {
      const self = this;
      return value.apply(self === receiver ? target : self, args);
    };
  }
  return value;
}

const MOMOA_NODES = /* @__PURE__ */ new Set([
  "Array",
  "Boolean",
  "Document",
  "Element",
  "Identifier",
  "Infinity",
  "Member",
  "NaN",
  "Null",
  "Number",
  "Object",
  "String"
]);
function isJSONSourceCode(sourceCode) {
  var _a, _b, _c;
  return ((_a = sourceCode.ast) == null ? void 0 : _a.type) === "Document" && ((_c = (_b = sourceCode.ast.loc) == null ? void 0 : _b.start) == null ? void 0 : _c.column) === 1 && sourceCode.ast.body && isMomoaNode(sourceCode.ast.body) && typeof sourceCode.getParent === "function";
}
function isMomoaNode(node) {
  return MOMOA_NODES.has(node.type);
}

function convertSourceLocationFromJsonToJsonc(loc) {
  return {
    start: convertPositionFromJsonToJsonc(loc.start),
    end: convertPositionFromJsonToJsonc(loc.end)
  };
}
function convertPositionFromJsonToJsonc(position) {
  return {
    line: position.line,
    column: position.column - 1
  };
}
function convertSourceLocationFromJsoncToJson(loc) {
  return {
    start: convertPositionFromJsoncToJson(loc.start),
    end: convertPositionFromJsoncToJson(loc.end)
  };
}
function convertPositionFromJsoncToJson(position) {
  return {
    line: position.line,
    column: position.column + 1
  };
}

const TOKEN_CONVERTERS = /* @__PURE__ */ new WeakMap();
function getTokenConverter(jsonSourceCode) {
  const converter = TOKEN_CONVERTERS.get(jsonSourceCode.ast);
  if (converter) {
    return converter;
  }
  const convertedTokens = /* @__PURE__ */ new Map();
  const tokenConverters = {
    BlockComment(token) {
      return {
        type: "Block",
        get value() {
          return jsonSourceCode.text.slice(
            token.range[0] + 2,
            token.range[1] - 2
          );
        },
        range: token.range,
        loc: convertSourceLocationFromJsonToJsonc(token.loc)
      };
    },
    LineComment(token) {
      return {
        type: "Line",
        get value() {
          return jsonSourceCode.text.slice(
            token.range[0] + 2,
            token.range[1]
          );
        },
        range: token.range,
        loc: convertSourceLocationFromJsonToJsonc(token.loc)
      };
    },
    Boolean(token) {
      return createStandardToken("Keyword", token);
    },
    Null(token) {
      return createStandardToken("Keyword", token);
    },
    Identifier(token) {
      return createStandardToken("Identifier", token);
    },
    Infinity(token) {
      const raw = jsonSourceCode.text.slice(...token.range);
      if (raw.startsWith("-") || raw.startsWith("+")) {
        return [
          createPunctuator(raw[0], {
            range: [token.range[0], token.range[0] + 1],
            loc: {
              start: token.loc.start,
              end: {
                line: token.loc.start.line,
                column: token.loc.start.column + 1
              }
            }
          }),
          createStandardToken("Identifier", {
            range: [token.range[0] + 1, token.range[1]],
            loc: {
              start: {
                line: token.loc.start.line,
                column: token.loc.start.column + 1
              },
              end: token.loc.end
            }
          })
        ];
      }
      return createStandardToken("Identifier", token);
    },
    NaN(token) {
      const raw = jsonSourceCode.text.slice(...token.range);
      if (raw.startsWith("-") || raw.startsWith("+")) {
        return [
          createPunctuator(raw[0], {
            range: [token.range[0], token.range[0] + 1],
            loc: {
              start: token.loc.start,
              end: {
                line: token.loc.start.line,
                column: token.loc.start.column + 1
              }
            }
          }),
          createStandardToken("Identifier", {
            range: [token.range[0] + 1, token.range[1]],
            loc: {
              start: {
                line: token.loc.start.line,
                column: token.loc.start.column + 1
              },
              end: token.loc.end
            }
          })
        ];
      }
      return createStandardToken("Identifier", token);
    },
    Number(token) {
      const raw = jsonSourceCode.text.slice(...token.range);
      if (raw.startsWith("-") || raw.startsWith("+")) {
        return [
          createPunctuator(raw[0], {
            range: [token.range[0], token.range[0] + 1],
            loc: {
              start: token.loc.start,
              end: {
                line: token.loc.start.line,
                column: token.loc.start.column + 1
              }
            }
          }),
          createStandardToken("Numeric", {
            range: [token.range[0] + 1, token.range[1]],
            loc: {
              start: {
                line: token.loc.start.line,
                column: token.loc.start.column + 1
              },
              end: token.loc.end
            }
          })
        ];
      }
      return createStandardToken("Numeric", token);
    },
    String(token) {
      return createStandardToken("String", token);
    },
    Colon(token) {
      return createPunctuator(":", token);
    },
    Comma(token) {
      return createPunctuator(",", token);
    },
    LBracket(token) {
      return createPunctuator("[", token);
    },
    LBrace(token) {
      return createPunctuator("{", token);
    },
    RBracket(token) {
      return createPunctuator("]", token);
    },
    RBrace(token) {
      return createPunctuator("}", token);
    }
  };
  TOKEN_CONVERTERS.set(jsonSourceCode.ast, convertToken);
  return convertToken;
  function createStandardToken(type, token) {
    return {
      type,
      get value() {
        return jsonSourceCode.text.slice(...token.range);
      },
      range: token.range,
      loc: convertSourceLocationFromJsonToJsonc(token.loc)
    };
  }
  function createPunctuator(value, token) {
    return {
      type: "Punctuator",
      value,
      range: token.range,
      loc: convertSourceLocationFromJsonToJsonc(token.loc)
    };
  }
  function convertToken(token) {
    if (convertedTokens.has(token)) {
      return convertedTokens.get(token);
    }
    const newToken = tokenConverters[token.type](token);
    convertedTokens.set(token, newToken);
    return newToken;
  }
}

const NODE_CONVERTERS = /* @__PURE__ */ new WeakMap();
function getNodeConverter(jsonSourceCode) {
  const converter = NODE_CONVERTERS.get(jsonSourceCode.ast);
  if (converter) {
    return converter;
  }
  const tokenConverter = getTokenConverter(jsonSourceCode);
  const convertedNodes = /* @__PURE__ */ new Map();
  const nodeConverters = {
    Array(node) {
      let elements;
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONArrayExpression",
        get elements() {
          return elements != null ? elements : elements = node.elements.map((e) => convertNode(e.value));
        },
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    },
    Boolean(node) {
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONLiteral",
        value: node.value,
        bigint: null,
        regex: null,
        get raw() {
          return jsonSourceCode.text.slice(...node.range);
        },
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    },
    Null(node) {
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONLiteral",
        value: null,
        bigint: null,
        regex: null,
        get raw() {
          return jsonSourceCode.text.slice(...node.range);
        },
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    },
    Number(node) {
      const raw = jsonSourceCode.text.slice(...node.range);
      if (raw.startsWith("-") || raw.startsWith("+")) {
        const argumentRange = [node.range[0] + 1, node.range[1]];
        const rawArgument = jsonSourceCode.text.slice(...argumentRange);
        const literal = {
          get parent() {
            return unaryExpression;
          },
          type: "JSONLiteral",
          value: Math.abs(node.value),
          bigint: null,
          regex: null,
          raw: rawArgument,
          range: argumentRange,
          loc: convertSourceLocationFromJsonToJsonc({
            start: {
              line: node.loc.start.line,
              column: node.loc.start.column + 1
            },
            end: node.loc.end
          })
        };
        const unaryExpression = {
          get parent() {
            return getParent(node);
          },
          type: "JSONUnaryExpression",
          operator: raw[0],
          prefix: true,
          argument: literal,
          range: node.range,
          loc: convertSourceLocationFromJsonToJsonc(node.loc)
        };
        return [unaryExpression, literal];
      }
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONLiteral",
        value: node.value,
        bigint: null,
        regex: null,
        get raw() {
          return jsonSourceCode.text.slice(...node.range);
        },
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    },
    String(node) {
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONLiteral",
        value: node.value,
        bigint: null,
        regex: null,
        get raw() {
          return jsonSourceCode.text.slice(...node.range);
        },
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    },
    Document(node) {
      let expression, tokens, comments;
      const program = {
        get parent() {
          return getParent(node);
        },
        type: "Program",
        get body() {
          return body;
        },
        get comments() {
          return comments != null ? comments : comments = node.tokens.filter(
            (token) => token.type === "LineComment" || token.type === "BlockComment"
          ).flatMap(tokenConverter);
        },
        get tokens() {
          return tokens != null ? tokens : tokens = node.tokens.filter(
            (token) => token.type !== "LineComment" && token.type !== "BlockComment"
          ).flatMap(tokenConverter);
        },
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
      const expr = {
        parent: program,
        type: "JSONExpressionStatement",
        get expression() {
          return expression != null ? expression : expression = convertNode(node.body);
        },
        range: node.body.range,
        loc: convertSourceLocationFromJsonToJsonc(node.body.loc)
      };
      const body = [expr];
      return [program, expr];
    },
    Object(node) {
      let members;
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONObjectExpression",
        get properties() {
          return members != null ? members : members = node.members.map(convertNode);
        },
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    },
    Member(node) {
      let keyNode, value;
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONProperty",
        get key() {
          return keyNode != null ? keyNode : keyNode = convertNode(node.name);
        },
        get value() {
          return value != null ? value : value = convertNode(node.value);
        },
        kind: "init",
        method: false,
        shorthand: false,
        computed: false,
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    },
    Identifier(node) {
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONIdentifier",
        name: node.name,
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    },
    Infinity(node) {
      const raw = jsonSourceCode.text.slice(...node.range);
      if (raw.startsWith("-") || raw.startsWith("+")) {
        const argumentRange = [node.range[0] + 1, node.range[1]];
        const identifier = {
          get parent() {
            return unaryExpression;
          },
          type: "JSONIdentifier",
          name: "Infinity",
          range: argumentRange,
          loc: convertSourceLocationFromJsonToJsonc({
            start: {
              line: node.loc.start.line,
              column: node.loc.start.column + 1
            },
            end: node.loc.end
          })
        };
        const unaryExpression = {
          get parent() {
            return getParent(node);
          },
          type: "JSONUnaryExpression",
          operator: raw[0],
          prefix: true,
          argument: identifier,
          range: node.range,
          loc: convertSourceLocationFromJsonToJsonc(node.loc)
        };
        return [unaryExpression, identifier];
      }
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONIdentifier",
        name: "Infinity",
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    },
    NaN(node) {
      const raw = jsonSourceCode.text.slice(...node.range);
      if (raw.startsWith("-") || raw.startsWith("+")) {
        const argumentRange = [node.range[0] + 1, node.range[1]];
        const identifier = {
          get parent() {
            return unaryExpression;
          },
          type: "JSONIdentifier",
          name: "NaN",
          range: argumentRange,
          loc: convertSourceLocationFromJsonToJsonc({
            start: {
              line: node.loc.start.line,
              column: node.loc.start.column + 1
            },
            end: node.loc.end
          })
        };
        const unaryExpression = {
          get parent() {
            return getParent(node);
          },
          type: "JSONUnaryExpression",
          operator: raw[0],
          prefix: true,
          argument: identifier,
          range: node.range,
          loc: convertSourceLocationFromJsonToJsonc(node.loc)
        };
        return [unaryExpression, identifier];
      }
      return {
        get parent() {
          return getParent(node);
        },
        type: "JSONIdentifier",
        name: "NaN",
        range: node.range,
        loc: convertSourceLocationFromJsonToJsonc(node.loc)
      };
    }
  };
  NODE_CONVERTERS.set(jsonSourceCode.ast, convert);
  return convert;
  function convert(node) {
    if (convertedNodes.has(node)) {
      return convertedNodes.get(node);
    }
    const newNode = nodeConverters[node.type](node);
    let result;
    if (Array.isArray(newNode)) {
      convertedNodes.set(
        node,
        result = {
          node: newNode[0],
          nodes: newNode
        }
      );
    } else {
      convertedNodes.set(node, result = { node: newNode });
    }
    return result;
  }
  function getParent(node) {
    const parent = jsonSourceCode.getParent(node);
    if (!parent) return null;
    const parentNode = parent;
    if (parentNode.type === "Element") {
      return getParent(parentNode);
    }
    const convertedParent = convert(parentNode);
    if (convertedParent.nodes) {
      return convertedParent.nodes[convertedParent.nodes.length - 1];
    }
    return convertedParent.node;
  }
  function convertNode(node) {
    return convert(node).node;
  }
}

function convertJsoncSourceCode(jsonSourceCode) {
  const convert = getNodeConverter(jsonSourceCode);
  const jsSourceCode = new SourceCode({
    text: jsonSourceCode.text,
    ast: convert(jsonSourceCode.ast).nodes[0],
    parserServices: { isJSON: true },
    visitorKeys: VisitorKeys
  });
  const compatSourceCode = newProxyWithGet(
    jsonSourceCode,
    (target, prop, receiver) => {
      const value = proxyReflectValue(
        Reflect.get(jsSourceCode, prop),
        jsSourceCode,
        target
      );
      if (value !== void 0) return value;
      return Reflect.get(jsonSourceCode, prop, receiver);
    }
  );
  return compatSourceCode;
}

const NODE_TYPE_MAP = /* @__PURE__ */ new Map([
  ["Program", ["Document"]],
  ["JSONExpressionStatement", ["Document"]],
  ["JSONLiteral", ["Boolean", "String", "Null", "Number"]],
  ["JSONArrayExpression", ["Array"]],
  ["JSONObjectExpression", ["Object"]],
  ["JSONProperty", ["Member"]],
  ["JSONIdentifier", ["Identifier", "Infinity", "NaN"]],
  ["JSONUnaryExpression", ["Number", "Infinity", "NaN"]]
]);
const reIsSimpleNodeQuery = /^[a-z]+$/iu;
function convertQuery(eslintQuery) {
  const exit = eslintQuery.endsWith(":exit");
  const query = exit ? eslintQuery.slice(0, -5) : eslintQuery;
  const converted = convertRawQuery(query);
  return converted && (exit ? {
    query: `${converted.query}:exit`,
    match: converted.match
  } : converted);
}
function convertRawQuery(query) {
  const queries = query.split(",").map((q) => q.trim());
  if (queries.every((q) => reIsSimpleNodeQuery.test(q))) {
    const convertTargetNodes = new Set(queries);
    const convertedQueries = [];
    for (const node of queries) {
      const converted = NODE_TYPE_MAP.get(node);
      if (converted) {
        convertedQueries.push(...converted);
      } else {
        convertTargetNodes.delete(node);
      }
    }
    return convertedQueries.length ? {
      query: convertedQueries.join(","),
      match: (node) => convertTargetNodes.has(node.type)
    } : null;
  }
  if (query === "*") {
    return {
      query: "*",
      match: () => true
    };
  }
  const selector = esquery.parse(query);
  const match = (node) => {
    let target = node;
    const ancestors = [];
    while (target.parent) {
      ancestors.push(target.parent);
      target = target.parent;
    }
    return esquery.matches(node, selector, ancestors, {
      visitorKeys: VisitorKeys
    });
  };
  return { query: "*", match };
}

function toCompatRuleListener(ruleListener, jsonSourceCode) {
  const convert = getNodeConverter(jsonSourceCode);
  const jsoncNodeVisitors = /* @__PURE__ */ new Map();
  const queries = /* @__PURE__ */ new Set();
  for (const [key, fn] of Object.entries(ruleListener)) {
    if (!fn) continue;
    queries.add(key);
    const convertedQuery = convertQuery(key);
    if (!convertedQuery) continue;
    const { query, match } = convertedQuery;
    queries.add(query);
    let jsoncNodeVisitorList = jsoncNodeVisitors.get(query);
    if (!jsoncNodeVisitorList) {
      jsoncNodeVisitorList = [];
      jsoncNodeVisitors.set(query, jsoncNodeVisitorList);
    }
    jsoncNodeVisitorList.push((node) => {
      if (match(node)) {
        fn(node);
      }
    });
  }
  const result = {};
  for (const query of queries) {
    result[query] = (node) => {
      var _a;
      if (isMomoaNode(node)) {
        if (node.type !== "Element") {
          const jsoncNodeVisitorList = jsoncNodeVisitors.get(query);
          if (!jsoncNodeVisitorList) return;
          const invoke = query.endsWith(":exit") ? invokeWithReverseConvertedNode : invokeWithConvertedNode;
          invoke(node, (n) => {
            jsoncNodeVisitorList.forEach((cb) => cb(n));
          });
        }
      } else {
        (_a = ruleListener[query]) == null ? void 0 : _a.call(ruleListener, node);
      }
    };
  }
  return result;
  function invokeWithConvertedNode(node, cb) {
    const jsonNodeData = convert(node);
    if (jsonNodeData.nodes) {
      for (const n of jsonNodeData.nodes) {
        cb(n);
      }
    } else {
      cb(jsonNodeData.node);
    }
  }
  function invokeWithReverseConvertedNode(node, cb) {
    const jsonNodeData = convert(node);
    if (jsonNodeData.nodes) {
      for (let index = jsonNodeData.nodes.length - 1; index >= 0; index--) {
        const n = jsonNodeData.nodes[index];
        cb(n);
      }
    } else {
      cb(jsonNodeData.node);
    }
  }
}

const CONVERTED$2 = /* @__PURE__ */ new WeakMap();
function toCompatCreate(create) {
  if (CONVERTED$2.has(create)) {
    return CONVERTED$2.get(create);
  }
  const result = (context, ...args) => {
    const originalSourceCode = context.sourceCode;
    if (!originalSourceCode || !isJSONSourceCode(originalSourceCode)) {
      return create(context, ...args);
    }
    let sourceCode;
    const compatContext = newProxyWithProperties(context, {
      get sourceCode() {
        return sourceCode != null ? sourceCode : sourceCode = convertJsoncSourceCode(originalSourceCode);
      },
      report(descriptor) {
        const momoaDescriptor = {
          ...descriptor
        };
        if ("loc" in momoaDescriptor && momoaDescriptor.loc) {
          if ("line" in momoaDescriptor.loc) {
            momoaDescriptor.loc = convertPositionFromJsoncToJson(
              momoaDescriptor.loc
            );
          } else {
            momoaDescriptor.loc = convertSourceLocationFromJsoncToJson(
              momoaDescriptor.loc
            );
          }
        }
        if ("node" in momoaDescriptor && momoaDescriptor.node) {
          momoaDescriptor.node = {
            ...momoaDescriptor.node,
            loc: convertSourceLocationFromJsoncToJson(
              momoaDescriptor.node.loc
            )
          };
        }
        context.report(momoaDescriptor);
      }
    });
    return toCompatRuleListener(
      create(compatContext, ...args),
      originalSourceCode
    );
  };
  CONVERTED$2.set(create, result);
  return result;
}

const CONVERTED$1 = /* @__PURE__ */ new WeakMap();
function toCompatRule(rule) {
  if (CONVERTED$1.has(rule)) {
    return CONVERTED$1.get(rule);
  }
  const result = {
    ...rule,
    create: toCompatCreate(rule.create)
  };
  CONVERTED$1.set(rule, result);
  return result;
}

const CONVERTED = /* @__PURE__ */ new WeakMap();
function toCompatPlugin(plugin) {
  if (!plugin.rules) {
    return plugin;
  }
  if (CONVERTED.has(plugin)) {
    return CONVERTED.get(plugin);
  }
  const rules = newProxyWithGet(plugin.rules, (target, prop) => {
    const rule = Reflect.get(target, prop);
    return rule && toCompatRule(rule);
  });
  const result = newProxyWithProperties(plugin, {
    rules
  });
  CONVERTED.set(plugin, result);
  return result;
}

export { toCompatCreate, toCompatPlugin, toCompatRule };
