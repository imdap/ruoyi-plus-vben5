"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearContent = clearContent;
exports.getContent = getContent;
exports.setContent = setContent;
var _fs = _interopRequireDefault(require("fs"));
var _util = _interopRequireDefault(require("util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// TODO: this can later be refactored once support for node 10 is dropped
const readFileAsync = _util.default.promisify(_fs.default.readFile);
const promises = new Map();

// eslint-disable-next-line import/prefer-default-export
function getContent(filename) {
  if (!promises.has(filename)) {
    promises.set(filename, readFileAsync(filename, 'utf8'));
  }
  return promises.get(filename);
}
function setContent(filename, content) {
  promises.set(filename, Promise.resolve(content));
}
function clearContent() {
  promises.clear();
}