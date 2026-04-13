"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clipboard = void 0;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let copyElem;
const clipStore = {
  text: '',
  html: ''
};
function handleText(text) {
  if (!copyElem) {
    copyElem = document.createElement('textarea');
    copyElem.id = '$VxeCopy';
    const styles = copyElem.style;
    styles.width = '48px';
    styles.height = '24px';
    styles.position = 'fixed';
    styles.zIndex = '0';
    styles.left = '-500px';
    styles.top = '-500px';
    document.body.appendChild(copyElem);
  }
  copyElem.value = text;
}
const clipboard = exports.clipboard = {
  getStore() {
    return clipStore;
  },
  setStore(data) {
    Object.assign(clipStore, data || {});
  },
  /**
   * 复制内容到剪贴板
   *
   * @param {String} content Text 内容
   */
  copy(content) {
    let result = false;
    try {
      const text = _xeUtils.default.toValueString(content);
      handleText(text);
      copyElem.select();
      copyElem.setSelectionRange(0, copyElem.value.length);
      result = document.execCommand('copy');
      copyElem.blur();
      clipStore.text = text;
      clipStore.html = '';
    } catch (e) {}
    return result;
  },
  getText() {
    return clipStore.text || '';
  }
};