"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VxeContextMenu = exports.ContextMenuController = exports.ContextMenu = void 0;
var _core = require("@vxe-ui/core");
var _contextMenu = _interopRequireDefault(require("./src/context-menu"));
var _dynamics = require("../dynamics");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const VxeContextMenu = exports.VxeContextMenu = Object.assign({}, _contextMenu.default, {
  install(app) {
    app.component(_contextMenu.default.name, _contextMenu.default);
  }
});
function openMenu(opts, x, y) {
  _dynamics.dynamicStore.globalContextMenu = {
    modelValue: true,
    options: opts.options,
    className: opts.className,
    size: opts.size,
    zIndex: opts.zIndex,
    x,
    y,
    position: 'fixed',
    destroyOnClose: true,
    transfer: false,
    events: opts.events
  };
  (0, _dynamics.checkDynamic)();
}
const ContextMenuController = exports.ContextMenuController = {
  open(options) {
    const opts = Object.assign({
      x: 0,
      y: 0
    }, options);
    openMenu(opts, opts.x, opts.y);
  },
  openByEvent(evnt, options) {
    evnt.preventDefault();
    evnt.stopPropagation();
    const opts = Object.assign({}, options);
    const x = evnt.clientX + 1;
    const y = evnt.clientY + 1;
    openMenu(opts, x, y);
  },
  close() {
    _dynamics.dynamicStore.globalContextMenu = null;
  }
};
_dynamics.dynamicApp.use(VxeContextMenu);
_core.VxeUI.component(_contextMenu.default);
_core.VxeUI.contextMenu = ContextMenuController;
const ContextMenu = exports.ContextMenu = VxeContextMenu;
var _default = exports.default = VxeContextMenu;