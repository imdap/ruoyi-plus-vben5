"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSvelte;
var _parser = require("@babel/parser");
var _file = require("../utils/file");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
async function parseSvelte(filename) {
  const {
    compile
  } = await Promise.resolve().then(() => _interopRequireWildcard(require('svelte/compiler')));
  const content = await (0, _file.getContent)(filename);
  const {
    js
  } = compile(content);
  return (0, _parser.parse)(js.code, {
    sourceType: 'module'
  });
}
module.exports = exports.default;