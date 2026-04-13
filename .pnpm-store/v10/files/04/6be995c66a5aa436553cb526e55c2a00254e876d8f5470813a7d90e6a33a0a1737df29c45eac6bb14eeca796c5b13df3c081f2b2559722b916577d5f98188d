"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.VxeUIPluginRenderAntd = void 0;
var _table = require("./table");
var _form = require("./form");
var _formDesign = require("./form-design");
var _store = require("./store");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function getEventTarget(evnt) {
  var target = evnt.target;
  if (target && target.shadowRoot && evnt.composed) {
    return evnt.composedPath()[0] || target;
  }
  return target;
}
/**
 * 检查触发源是否属于目标节点
 */
function getEventTargetNode(evnt, container, className) {
  var targetElem;
  var target = getEventTarget(evnt);
  var rootEl = document.documentElement || document.querySelector('html');
  while (target && target.nodeType && target !== rootEl) {
    if (className && target.className && target.className.split && target.className.split(' ').indexOf(className) > -1) {
      targetElem = target;
    } else if (target === container) {
      return {
        flag: className ? !!targetElem : true,
        container: container,
        targetElem: targetElem
      };
    }
    target = target.parentElement;
  }
  return {
    flag: false
  };
}
function toComponentName(name) {
  if (name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  }
  return name;
}
var VxeUIPluginRenderAntd = exports.VxeUIPluginRenderAntd = {
  component: function component(comp) {
    if (comp && comp.name) {
      var kcName = _xeUtils["default"].kebabCase(comp.name);
      var ccName = toComponentName(_xeUtils["default"].camelCase(comp.name));
      _store.componentMaps[kcName] = comp;
      _store.componentMaps[ccName] = comp;
    } else {
      console.error('[@vxe-ui/plugin-render-antd 4.3.1] error component.', comp);
    }
  },
  install: function install(VxeUI, options) {
    var pluginOpts = Object.assign({}, options);
    if (options) {
      Object.assign(_store.globalConfig, options);
    }
    // 检查版本
    if (VxeUI.checkVersion) {
      var pVersion = 4;
      var sVersion = 11;
      if (!VxeUI.checkVersion(VxeUI.tableVersion, pVersion, sVersion)) {
        console.error("[@vxe-ui/plugin-render-antd 4.3.1] ".concat(VxeUI.getI18n('vxe.error.errorVersion', ["vxe-table@".concat(VxeUI.tableVersion || '?'), "vxe-table v".concat(pVersion, ".").concat(sVersion, "+")]), " https://vxeui.com/other4/#/plugin-render-antd/install"));
      }
    } else {
      if (!/^(4)\./.test(VxeUI.uiVersion || VxeUI.tableVersion)) {
        console.error('[@vxe-ui/plugin-render-antd 4.3.1] Requires vxe-table 4.7.0+ version. https://vxeui.com/other4/#/plugin-render-antd/install');
      }
    }
    /**
     * 事件兼容性处理
     */
    var handleClearEvent = function handleClearEvent(params) {
      var $event = params.$event;
      var bodyElem = document.body;
      var prefixCls = "".concat(pluginOpts.prefixCls || 'ant').replace(/-$/, '');
      if (
      // 下拉框
      getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-select-dropdown")).flag ||
      // 级联
      getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-cascader-menus")).flag ||
      // 日期
      getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-picker-dropdown")).flag || getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-calendar-picker-container")).flag ||
      // 时间选择
      getEventTargetNode($event, bodyElem, "".concat(prefixCls, "-time-picker-panel")).flag) {
        return false;
      }
    };
    (0, _table.defineTableRender)(VxeUI);
    (0, _form.defineFormRender)(VxeUI);
    (0, _formDesign.defineFormDesignRender)(VxeUI);
    VxeUI.interceptor.add('event.clearFilter', handleClearEvent);
    VxeUI.interceptor.add('event.clearEdit', handleClearEvent);
    VxeUI.interceptor.add('event.clearAreas', handleClearEvent);
    // 兼容老版本
    VxeUI.interceptor.add('event.clearActived', handleClearEvent);
  }
};
if (typeof window !== 'undefined') {
  if (window.VxeUI && window.VxeUI.use) {
    window.VxeUI.use(VxeUIPluginRenderAntd);
  }
  if (window.antd) {
    _store.globalConfig.Antd = window.antd;
  }
}
var _default = exports["default"] = VxeUIPluginRenderAntd;