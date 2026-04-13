"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeModal = exports.ModalController = exports.Modal = void 0;
var _core = require("@vxe-ui/core");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
var _modal = _interopRequireWildcard(require("./src/modal"));
var _dynamics = require("../dynamics");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function handleModal(options) {
  // 使用动态组件渲染动态弹框
  (0, _dynamics.checkDynamic)();
  return new Promise(resolve => {
    const opts = Object.assign({}, options);
    if (opts.id && _modal.allActiveModals.some(comp => comp.props.id === opts.id)) {
      resolve('exist');
    } else {
      const _onHide = opts.onHide;
      const modalOpts = Object.assign(opts, {
        key: _xeUtils.default.uniqueId(),
        modelValue: true,
        onHide(params) {
          const modalList = _dynamics.dynamicStore.modals;
          if (_onHide) {
            _onHide(params);
          }
          _dynamics.dynamicStore.modals = modalList.filter(item => item.key !== modalOpts.key);
          resolve(params.type);
        }
      });
      _dynamics.dynamicStore.modals.push(modalOpts);
    }
  });
}
function getModal(id) {
  return _xeUtils.default.find(_modal.allActiveModals, $modal => $modal.props.id === id);
}
/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */
function closeModal(id) {
  const modals = id ? [getModal(id)] : _modal.allActiveModals;
  const restPromises = [];
  modals.forEach($modal => {
    if ($modal) {
      restPromises.push($modal.close());
    }
  });
  return Promise.all(restPromises);
}
function handleOpen(defOpts, content, title, options) {
  let opts;
  if (_xeUtils.default.isObject(content)) {
    opts = content;
  } else {
    opts = {
      content: _xeUtils.default.toValueString(content),
      title
    };
  }
  return handleModal(Object.assign(Object.assign(Object.assign({}, defOpts), options), opts));
}
function openModal(options) {
  return handleOpen({
    type: 'modal'
  }, options);
}
function openAlert(content, title, options) {
  return handleOpen({
    type: 'alert',
    lockScroll: true,
    showHeader: true,
    showFooter: true
  }, content, title, options);
}
function openConfirm(content, title, options) {
  return handleOpen({
    type: 'confirm',
    status: 'question',
    lockScroll: true,
    showHeader: true,
    showFooter: true
  }, content, title, options);
}
function openMessage(content, options) {
  return handleOpen({
    type: 'message',
    mask: false,
    lockView: false,
    lockScroll: false,
    showHeader: false
  }, content, '', options);
}
function openNotification(content, title, options) {
  return handleOpen({
    type: 'notification',
    mask: false,
    lockView: false,
    lockScroll: false,
    showHeader: true,
    draggable: false,
    position: 'top-right',
    width: 320
  }, content, title, options);
}
const ModalController = exports.ModalController = {
  get: getModal,
  close: closeModal,
  open: openModal,
  alert: openAlert,
  confirm: openConfirm,
  message: openMessage,
  notification: openNotification
};
const VxeModal = exports.VxeModal = Object.assign(_modal.default, {
  install: function (app) {
    app.component(_modal.default.name, _modal.default);
  }
});
_core.VxeUI.modal = ModalController;
_dynamics.dynamicApp.use(VxeModal);
_core.VxeUI.component(_modal.default);
const Modal = exports.Modal = VxeModal;
var _default = exports.default = VxeModal;