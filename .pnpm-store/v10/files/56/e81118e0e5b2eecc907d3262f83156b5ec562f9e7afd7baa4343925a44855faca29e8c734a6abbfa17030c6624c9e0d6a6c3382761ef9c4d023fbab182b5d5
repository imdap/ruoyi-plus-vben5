"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _vue = require("vue");
var _comp = require("../../ui/src/comp");
var _ui = require("../../ui");
var _vn = require("../../ui/src/vn");
var _xeUtils = _interopRequireDefault(require("xe-utils"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = (0, _comp.defineVxeComponent)({
  name: 'VxeCollapse',
  props: {
    modelValue: Array,
    options: Array,
    padding: {
      type: Boolean,
      default: () => (0, _ui.getConfig)().collapse.padding
    },
    expandConfig: Object,
    size: {
      type: String,
      default: () => (0, _ui.getConfig)().collapse.size || (0, _ui.getConfig)().size
    }
  },
  emits: ['update:modelValue', 'load', 'change', 'toggle-expand'],
  setup(props, context) {
    const {
      emit,
      slots
    } = context;
    const xID = _xeUtils.default.uniqueId();
    const {
      computeSize
    } = (0, _ui.useSize)(props);
    const refElem = (0, _vue.ref)();
    const reactData = (0, _vue.reactive)({
      staticPanes: [],
      activeNames: [],
      initNames: [],
      cachePaneMaps: {}
    });
    const refMaps = {
      refElem
    };
    const computeItemOptions = (0, _vue.computed)(() => {
      const {
        options
      } = props;
      return (options || []).filter(item => handleFilterItem(item));
    });
    const computeItemStaticOptions = (0, _vue.computed)(() => {
      const {
        staticPanes
      } = reactData;
      return staticPanes.filter(item => handleFilterItem(item));
    });
    const computeExpandOpts = (0, _vue.computed)(() => {
      return Object.assign({}, (0, _ui.getConfig)().collapse.expandConfig, props.expandConfig);
    });
    const computeMaps = {};
    const $xeCollapse = {
      xID,
      props,
      context,
      reactData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps
    };
    const handleFilterItem = item => {
      const {
        permissionCode
      } = item;
      if (permissionCode) {
        if (!_ui.permission.checkVisible(permissionCode)) {
          return false;
        }
      }
      return true;
    };
    const addInitName = name => {
      const {
        initNames
      } = reactData;
      if (name && !initNames.includes(name)) {
        initNames.push(name);
        dispatchEvent('load', {
          name
        }, null);
        return true;
      }
      return false;
    };
    const initDefaultName = list => {
      const {
        activeNames
      } = reactData;
      const nameMaps = {};
      if (list && list.length) {
        list.forEach(item => {
          const {
            name,
            preload
          } = item || {};
          if (name) {
            const isActive = activeNames.includes(name);
            nameMaps[`${name}`] = {
              loading: false
            };
            if (isActive) {
              addInitName(name);
            }
            if (preload) {
              if (!isActive) {
                activeNames.push(name);
              }
            }
          }
        });
      }
      reactData.activeNames = activeNames ? activeNames.slice(0) : [];
      reactData.cachePaneMaps = nameMaps;
    };
    const dispatchEvent = (type, params, evnt) => {
      emit(type, (0, _ui.createEvent)(evnt, {
        $collapse: $xeCollapse
      }, params));
    };
    const collapseMethods = {
      dispatchEvent
    };
    const callSlot = (slotFunc, params) => {
      if (slotFunc) {
        if (_xeUtils.default.isString(slotFunc)) {
          slotFunc = slots[slotFunc] || null;
        }
        if (_xeUtils.default.isFunction(slotFunc)) {
          return (0, _vn.getSlotVNs)(slotFunc(params));
        }
      }
      return [];
    };
    const handleClickEvent = (evnt, item) => {
      const {
        activeNames
      } = reactData;
      const {
        name
      } = item;
      if (name) {
        const aIndex = activeNames.indexOf(name);
        let expanded = false;
        if (aIndex === -1) {
          expanded = true;
          activeNames.push(name);
        } else {
          activeNames.splice(aIndex, 1);
        }
        addInitName(name);
        dispatchEvent('change', {
          value: activeNames,
          name
        }, evnt);
        dispatchEvent('toggle-expand', {
          value: activeNames,
          name,
          expanded
        }, evnt);
      }
    };
    const collapsePrivateMethods = {};
    Object.assign($xeCollapse, collapseMethods, collapsePrivateMethods);
    const renderList = itemList => {
      const {
        activeNames,
        initNames
      } = reactData;
      const expandOpts = computeExpandOpts.value;
      return itemList.map(item => {
        const {
          icon,
          name,
          title,
          slots
        } = item;
        const titleSlot = slots ? slots.title : null;
        const defaultSlot = slots ? slots.default : null;
        const isActive = name && activeNames.includes(name);
        return (0, _vue.h)('div', {
          class: 'vxe-collapse-item'
        }, [(0, _vue.h)('div', {
          class: 'vxe-collapse--item-header',
          onClick(evnt) {
            handleClickEvent(evnt, item);
          }
        }, [expandOpts.showIcon ? (0, _vue.h)('span', {
          class: 'vxe-collapse--item-switch'
        }, [(0, _vue.h)('i', {
          class: isActive ? (0, _ui.getIcon)().COLLAPSE_OPEN : (0, _ui.getIcon)().COLLAPSE_CLOSE
        })]) : (0, _ui.renderEmptyElement)($xeCollapse), icon ? (0, _vue.h)('span', {
          class: 'vxe-collapse--item-icon'
        }, [(0, _vue.h)('i', {
          class: icon
        })]) : (0, _ui.renderEmptyElement)($xeCollapse), (0, _vue.h)('span', {
          class: 'vxe-collapse--item-name'
        }, titleSlot ? callSlot(titleSlot, {
          name,
          title
        }) : `${title}`)]), (0, _vue.h)('div', {
          class: ['vxe-collapse--item-content', {
            'is--visible': isActive
          }]
        }, [name && initNames.includes(name) ? (0, _vue.h)('div', {
          class: 'vxe-collapse--item-inner'
        }, [defaultSlot ? callSlot(defaultSlot, {
          name,
          title
        }) : '']) : (0, _ui.renderEmptyElement)($xeCollapse)])]);
      });
    };
    const renderVN = () => {
      const {
        padding
      } = props;
      const vSize = computeSize.value;
      const itemOptions = computeItemOptions.value;
      const itemStaticOptions = computeItemStaticOptions.value;
      const defaultSlot = slots.default;
      const itemList = defaultSlot ? itemStaticOptions : itemOptions;
      return (0, _vue.h)('div', {
        ref: refElem,
        class: ['vxe-collapse', {
          [`size--${vSize}`]: vSize,
          'is--padding': padding
        }]
      }, [(0, _vue.h)('div', {
        class: 'vxe-collapse-slots'
      }, defaultSlot ? defaultSlot({}) : []), renderList(itemList)]);
    };
    (0, _vue.watch)(() => props.modelValue, val => {
      reactData.activeNames = val || [];
    });
    const optsFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => props.options ? props.options.length : -1, () => {
      optsFlag.value++;
    });
    (0, _vue.watch)(() => props.options, () => {
      optsFlag.value++;
    });
    (0, _vue.watch)(optsFlag, () => {
      initDefaultName(props.options);
    });
    const stFlag = (0, _vue.ref)(0);
    (0, _vue.watch)(() => reactData.staticPanes ? reactData.staticPanes.length : -1, () => {
      stFlag.value++;
    });
    (0, _vue.watch)(() => reactData.staticPanes, () => {
      stFlag.value++;
    });
    (0, _vue.watch)(stFlag, () => {
      initDefaultName(reactData.staticPanes);
    });
    reactData.activeNames = props.modelValue || [];
    initDefaultName(reactData.staticPanes.length ? reactData.staticPanes : props.options);
    (0, _vue.provide)('$xeCollapse', $xeCollapse);
    $xeCollapse.renderVN = renderVN;
    return $xeCollapse;
  },
  render() {
    return this.renderVN();
  }
});