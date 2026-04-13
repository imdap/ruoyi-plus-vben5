"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleCheckInfo = handleCheckInfo;
exports.permission = void 0;
var _configStore = require("./configStore");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function handleCheckInfo(permissionCode, permissionMethod) {
  let checkVisible = true;
  let checkDisabled = false;
  const checkMethod = permissionMethod || _configStore.globalConfigStore.permissionMethod;
  if (permissionCode && checkMethod) {
    checkVisible = false;
    checkDisabled = true;
    let vDone = false;
    let dDone = false;
    // 或 使用 | 隔开：任意一个为可视，则可视；任意一个禁用，则禁用
    const codeList = String(permissionCode).split('|');
    for (let i = 0; i < codeList.length; i++) {
      const code = codeList[i];
      let visible = true;
      let disabled = false;
      const rest = checkMethod({
        code
      });
      if (_xeUtils.default.isBoolean(rest)) {
        visible = rest;
      } else if (rest) {
        visible = !!rest.visible;
        disabled = !!rest.disabled;
      }
      if (!disabled && !dDone) {
        dDone = true;
        checkDisabled = disabled;
      }
      if (visible && !vDone) {
        vDone = true;
        checkVisible = visible;
      }
      if (vDone && dDone) {
        break;
      }
    }
  }
  const info = {
    code: permissionCode,
    visible: checkVisible,
    disabled: checkDisabled
  };
  return info;
}
const permission = exports.permission = {
  getCheckInfo(code) {
    return handleCheckInfo(code);
  },
  checkVisible(code) {
    const permissionInfo = handleCheckInfo(code);
    return permissionInfo.visible;
  },
  checkDisable(code) {
    const permissionInfo = handleCheckInfo(code);
    return permissionInfo.disabled;
  }
};