"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = importCallExpression;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function importCallExpression(node) {
  if (node.type === 'CallExpression' && node.callee && (node.callee.type === 'Identifier' && node.callee.name === 'import' || node.callee.type === 'Import' || node.callee.type === 'MemberExpression' && node.callee.object && node.callee.object.name === 'System' && node.callee.property && node.callee.property.name === 'import') && node.arguments[0]) {
    if (_lodash.default.isString(node.arguments[0].value)) {
      return [node.arguments[0].value];
    }
    if (node.arguments[0].type === 'TemplateLiteral' && node.arguments[0].quasis.length === 1 && _lodash.default.isString(node.arguments[0].quasis[0].value.raw)) {
      return [node.arguments[0].quasis[0].value.raw];
    }
  }
  return [];
}
module.exports = exports.default;