"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFns = void 0;
exports.usePermission = usePermission;
exports.useSize = useSize;
var _vue = require("vue");
var _permission = require("./permission");
function useSize(props) {
  // 组件尺寸上下文
  const xeSizeInfo = (0, _vue.inject)('xeSizeInfo', null);
  const computeSize = (0, _vue.computed)(() => {
    return props.size || (xeSizeInfo ? xeSizeInfo.value : null);
  });
  (0, _vue.provide)('xeSizeInfo', computeSize);
  return {
    computeSize
  };
}
function usePermission(props) {
  const computePermissionInfo = (0, _vue.computed)(() => {
    return (0, _permission.handleCheckInfo)(props.permissionCode, props.permissionMethod);
  });
  return {
    computePermissionInfo
  };
}
const useFns = exports.useFns = {
  useSize,
  usePermission
};