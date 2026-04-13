"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridProps = void 0;
var _ui = require("../../ui");
var _props = require("../../table/src/props");
const {
  getConfig
} = _ui.VxeUI;
const gridProps = exports.gridProps = Object.assign(Object.assign({}, _props.tableProps), {
  layouts: Array,
  columns: Array,
  pagerConfig: Object,
  proxyConfig: Object,
  toolbarConfig: Object,
  formConfig: Object,
  zoomConfig: Object,
  size: {
    type: String,
    default: () => getConfig().grid.size || getConfig().size
  }
});