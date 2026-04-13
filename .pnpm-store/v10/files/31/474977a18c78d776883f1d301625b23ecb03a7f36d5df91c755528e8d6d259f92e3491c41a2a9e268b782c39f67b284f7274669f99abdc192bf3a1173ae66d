"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  install: true
};
exports.install = install;
var _ui = require("./ui");
Object.keys(_ui).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _ui[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ui[key];
    }
  });
});
var _column = require("./column");
Object.keys(_column).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _column[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _column[key];
    }
  });
});
var _colgroup = require("./colgroup");
Object.keys(_colgroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _colgroup[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _colgroup[key];
    }
  });
});
var _grid = require("./grid");
Object.keys(_grid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _grid[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _grid[key];
    }
  });
});
var _table = require("./table");
Object.keys(_table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _table[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _table[key];
    }
  });
});
var _toolbar = require("./toolbar");
Object.keys(_toolbar).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _toolbar[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _toolbar[key];
    }
  });
});
var _zhCN = _interopRequireDefault(require("./locale/lang/zh-CN"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const components = [_column.VxeColumn, _colgroup.VxeColgroup, _grid.VxeGrid, _table.VxeTable, _toolbar.VxeToolbar];
// 默认安装
function install(app, options) {
  _ui.VxeUI.setConfig(options);
  components.forEach(component => component.install(app));
}
// 保留兼容老版本
if (!_ui.VxeUI.hasLanguage('zh-CN')) {
  const defaultLanguage = 'zh-CN';
  _ui.VxeUI.setI18n(defaultLanguage, _zhCN.default);
  _ui.VxeUI.setLanguage(defaultLanguage);
}
_ui.VxeUI.setTheme('light');

// Components