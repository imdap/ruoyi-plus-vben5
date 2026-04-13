"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTheme = getTheme;
exports.setTheme = setTheme;
var _core = require("./core");
var _themeStore = require("./themeStore");
function setTheme(name) {
  const theme = !name || name === 'default' ? 'light' : name;
  _themeStore.themeConfigStore.theme = theme;
  if (typeof document !== 'undefined') {
    const documentElement = document.documentElement;
    if (documentElement) {
      documentElement.setAttribute('data-vxe-ui-theme', theme);
    }
  }
  return _core.VxeCore;
}
function getTheme() {
  return _themeStore.themeConfigStore.theme;
}