"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _util = require("./util");
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeOptgroup',
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    visible: {
      type: Boolean,
      default: null
    },
    className: [String, Function],
    disabled: Boolean
  },
  emits: [],
  setup(props, {
    slots
  }) {
    const elem = (0, _vue.ref)();
    const $xeSelect = (0, _vue.inject)('$xeSelect', {});
    const optionConfig = (0, _util.createOption)($xeSelect, props);
    const $xeOptgroup = {
      optionConfig
    };
    optionConfig.options = [];
    (0, _vue.provide)('$xeOptgroup', $xeOptgroup);
    (0, _util.watchOption)(props, optionConfig);
    (0, _vue.onMounted)(() => {
      const el = elem.value;
      (0, _util.assembleOption)($xeSelect, el, optionConfig);
    });
    (0, _vue.onUnmounted)(() => {
      (0, _util.destroyOption)($xeSelect, optionConfig);
    });
    return () => {
      const defaultSlot = slots.default;
      return (0, _vue.h)('div', {
        ref: elem
      }, defaultSlot ? defaultSlot({}) : []);
    };
  }
});