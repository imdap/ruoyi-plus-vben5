"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  lazyImport: true
};
exports.lazyImport = lazyImport;
var _esModuleLexer = require("es-module-lexer");
var _pluginutils = require("@rollup/pluginutils");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _resolvers = require("./resolvers");
Object.keys(_resolvers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _resolvers[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _resolvers[key];
    }
  });
});
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function lazyImport(options) {
  var opts = Object.assign({
    include: ['**/*.vue', '**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx']
    //  exclude :["node_modules/**"]
  }, options);
  var filter = (0, _pluginutils.createFilter)(opts.include, opts.exclude);
  var parseMaps = {};
  function parseResolverImport(code, resOpts) {
    var _parse = (0, _esModuleLexer.parse)(code),
      _parse2 = _slicedToArray(_parse, 1),
      imports = _parse2[0];
    for (var i = 0; i < imports.length; i++) {
      var item = imports[i];
      if (item.n === resOpts.libraryName) {
        return item;
      }
    }
    return null;
  }
  function transformImport(id, exports, resOpts) {
    var importCodes = [];
    exports.forEach(function (item) {
      var importName = item.n;
      var variableCode = item.n;
      var asName = '';
      if (item.ln && item.ln !== item.n) {
        importName = item.ln;
        asName = item.n;
        variableCode = "".concat(importName, " as ").concat(asName);
      }
      var jsPath = '';
      var stylePath = '';
      var parseItem = parseMaps["".concat(id, "_").concat(importName)];
      if (parseItem) {
        jsPath = parseItem.jsPath;
        stylePath = parseItem.stylePath;
      } else {
        var libDir = resOpts.esm ? 'es' : 'lib';
        var extName = resOpts.importStyle === true ? 'css' : resOpts.importStyle || 'css';
        var dirName = _xeUtils["default"].kebabCase(importName);
        jsPath = "import { ".concat(variableCode, " } from \"").concat(resOpts.libraryName, "/").concat(libDir, "/").concat(dirName, "/index.js\"");
        stylePath = "import \"".concat(resOpts.libraryName, "/").concat(libDir, "/").concat(dirName, "/style.").concat(extName, "\"");
        if (resOpts.resolve) {
          var rest = resOpts.resolve({
            dirName: dirName,
            name: importName,
            libraryName: resOpts.libraryName
          });
          var fromRest = rest ? rest.from : null;
          if (fromRest) {
            if (_xeUtils["default"].isString(fromRest)) {
              jsPath = "import { ".concat(variableCode, " } from \"").concat(fromRest, "\"");
            } else {
              if (fromRest.jsPath) {
                jsPath = "import { ".concat(variableCode, " } from \"").concat(fromRest.jsPath, "\"");
              }
              if (fromRest.stylePath) {
                stylePath = "import \"".concat(fromRest.stylePath, "\"");
              }
            }
          }
        }
        parseMaps["".concat(id, "_").concat(importName)] = {
          jsPath: jsPath,
          stylePath: stylePath
        };
      }
      if (resOpts.importStyle) {
        importCodes.push("".concat(jsPath, ";\n").concat(stylePath));
        return;
      }
      importCodes.push("".concat(jsPath));
    });
    return importCodes.join(';\n');
  }
  function toVariableExport(impCode) {
    var rest = impCode.replace(/\n/, ' ').match(/\{[a-zA-Z,_'"\s]+?\}/);
    if (rest) {
      return "export ".concat(rest[0]);
    }
    return '';
  }
  return {
    name: 'vite:lazy-import',
    enforce: 'post',
    transform: function transform(code, id) {
      if (!code || !filter(id) || !Array.isArray(opts.resolvers)) {
        return null;
      }
      var isTransform = false;
      var restCode = code;
      opts.resolvers.forEach(function (resolver) {
        var resOpts = Object.assign({}, resolver);
        if (!resOpts.libraryName) {
          return;
        }
        var syntaxItem = parseResolverImport(restCode, resOpts);
        if (!syntaxItem) {
          return;
        }
        var exportCode = toVariableExport(restCode.slice(syntaxItem.ss, syntaxItem.se));
        var exports = (0, _esModuleLexer.parse)(exportCode)[1];
        if (!exports.length) {
          return;
        }
        var importCode = transformImport(id, exports, resOpts);
        isTransform = true;
        restCode = "".concat(restCode.slice(0, syntaxItem.ss)).concat(importCode).concat(restCode.slice(syntaxItem.se));
      });
      if (isTransform) {
        return {
          code: restCode
        };
      }
      return null;
    }
  };
}