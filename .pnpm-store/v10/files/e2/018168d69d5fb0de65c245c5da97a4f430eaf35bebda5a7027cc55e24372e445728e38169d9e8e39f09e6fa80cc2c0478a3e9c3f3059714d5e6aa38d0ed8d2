"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getI18n = getI18n;
exports.getLanguage = getLanguage;
exports.hasLanguage = hasLanguage;
exports.setI18n = setI18n;
exports.setLanguage = setLanguage;
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _core = require("./core");
var _i18nStore = require("./i18nStore");
var _configStore = require("./configStore");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let checkInstall = false;
let cacheMaps = {};
function getI18n(key, args) {
  const {
    langMaps,
    language
  } = _i18nStore.i18nConfigStore;
  const {
    i18n
  } = _configStore.globalConfigStore;
  if (i18n) {
    return `${i18n(key, args) || ''}`;
  }
  if (!checkInstall) {
    if (!langMaps[language]) {
      console.error(`[vxe core] 语言包未安装。Language not installed. https://${_core.VxeCore.uiVersion ? 'vxeui.com' : 'vxetable.cn'}/#/start/i18n`);
    }
    checkInstall = true;
  }
  if (!args && cacheMaps[key]) {
    return cacheMaps[key];
  }
  const i18nLabel = _xeUtils.default.toFormatString(_xeUtils.default.get(langMaps[language], key, key), args);
  if (!args) {
    cacheMaps[key] = i18nLabel;
  }
  return i18nLabel;
}
function setLanguage(locale) {
  const {
    language
  } = _i18nStore.i18nConfigStore;
  const targetlang = locale || 'zh-CN';
  if (language !== targetlang) {
    _i18nStore.i18nConfigStore.language = targetlang;
    cacheMaps = {};
  }
  return _core.VxeCore;
}
function setI18n(locale, data) {
  _i18nStore.i18nConfigStore.langMaps[locale] = Object.assign({}, data);
  return _core.VxeCore;
}
function hasLanguage(language) {
  const {
    langMaps
  } = _i18nStore.i18nConfigStore;
  return !!langMaps[language];
}
function getLanguage() {
  const {
    language
  } = _i18nStore.i18nConfigStore;
  return language;
}