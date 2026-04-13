"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCellView = useCellView;
var _vue = require("vue");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function useCellView(props) {
  const currColumn = (0, _vue.computed)(() => {
    const {
      renderParams
    } = props;
    return renderParams.column;
  });
  const currRow = (0, _vue.computed)(() => {
    const {
      renderParams
    } = props;
    return renderParams.row;
  });
  const cellOptions = (0, _vue.computed)(() => {
    const {
      renderOpts
    } = props;
    return renderOpts.props || {};
  });
  const cellModel = (0, _vue.computed)({
    get() {
      const {
        renderParams
      } = props;
      const {
        row,
        column
      } = renderParams;
      return _xeUtils.default.get(row, column.field);
    },
    set(value) {
      const {
        renderParams
      } = props;
      const {
        row,
        column
      } = renderParams;
      return _xeUtils.default.set(row, column.field, value);
    }
  });
  return {
    currColumn,
    currRow,
    cellModel,
    cellOptions
  };
}